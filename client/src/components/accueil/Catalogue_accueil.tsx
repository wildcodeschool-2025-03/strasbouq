import { useEffect, useState } from "react";
import { Link } from "react-router";
import Contenu from "../catalogue/Contenu_catalogue";

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
    setCarousel((prev) => (prev >= totalPages ? 1 : prev + 1));
  }

  function setNextL() {
    setCarousel((prev) => (prev === 1 ? totalPages : prev - 1));
  }

  return (
    <section>
      {/* Titre */}
      <div className="flex justify-center text-secondary pt-10 pb-10">
        <h1 className="font-bold">
          Réservez toutes vos fleurs, depuis chez vous.
        </h1>
      </div>

      <section className="flex items-center justify-center gap-4 my-10">
        {/* Flèche gauche */}
        <button type="button" onClick={setNextL} className="text-4xl">
          <i className="bi bi-caret-left cursor-pointer" />
        </button>

        {/* Cartes */}
        <div className="flex gap-6">
          {items.slice(startIndex, startIndex + cardsPerPage).map((item) => (
            <div key={item.id} className="w-full max-w-[300px]">
              <Contenu item={item} />
            </div>
          ))}
        </div>

        {/* Flèche droite */}
        <button type="button" onClick={setNextR} className="text-4xl">
          <i className="bi bi-caret-right cursor-pointer" />
        </button>
      </section>

      {/* Lien du catalogue */}
      <div className="flex justify-center mb-10">
        <Link to="./Catalogue">
          <button
            type="button"
            className="bg-[#CE9170] px-4 py-2 rounded-full text-black font-bold cursor-pointer"
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
