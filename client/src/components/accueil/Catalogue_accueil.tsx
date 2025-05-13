import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Contenu_accueil from "../accueil/Contenu_accueil";

// Typage du bouquet
type Bouquet = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  disponibilite: boolean;
  image_url: string;
  isFavorite: boolean;
};

// Composant principal du carrousel de la page d'accueil
function Catalogue_accueil() {
  const [carousel, setCarousel] = useState(1);
  const [items, setItems] = useState<Bouquet[]>([]);
  const [cardsPerPage, setCardsPerPage] = useState(
    window.innerWidth >= 768 ? 2 : 1,
  );
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth >= 768 ? 2 : 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  const startIndex = (carousel - 1) * cardsPerPage;
  const totalPages = Math.ceil(items.length / cardsPerPage);

  function setNextR() {
    setDirection("right");
    setCarousel((prev) => (prev >= totalPages ? 1 : prev + 1));
  }

  function setNextL() {
    setDirection("left");
    setCarousel((prev) => (prev === 1 ? totalPages : prev - 1));
  }

  return (
    <section>
      {/* Titre */}
      <div className="flex justify-center text-secondary text-center text-[1.4rem] md:text-2xl pt-10 pb-10">
        <h1 className="font-bold">
          Réservez toutes vos fleurs, depuis chez vous.
        </h1>
      </div>

      <section className="flex items-center justify-center gap-1 md:gap-6 my-10">
        {/* Flèche gauche */}
        <button type="button" onClick={setNextL} className="text-4xl">
          <i className="bi bi-chevron-left cursor-pointer" />
        </button>

        {/* Cartes */}
        <div className="flex gap-20">
          {items.slice(startIndex, startIndex + cardsPerPage).map((item) => (
            <motion.div
              key={`${carousel}-${item.id}`}
              className="w-full max-w-[300px]"
              initial={{ opacity: 0, x: direction === "right" ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Contenu_accueil item={item} />
            </motion.div>
          ))}
        </div>

        {/* Flèche droite */}
        <button type="button" onClick={setNextR} className="text-4xl">
          <i className="bi bi-chevron-right cursor-pointer" />
        </button>
      </section>

      {/* Lien du catalogue */}
      <div className="flex justify-center mb-10">
        <Link to="./Catalogue">
          <button
            type="button"
            className="bg-[#CE9170] py-2 px-10 rounded-full text-white font-bold cursor-pointer"
          >
            Retrouvez notre
            <br />
            catalogue complet
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Catalogue_accueil;
