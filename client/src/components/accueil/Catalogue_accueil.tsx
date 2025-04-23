import { useEffect, useState } from "react";
import { Link } from "react-router";

// Typage

type Bouquet = {
  id: number;
  nom: string;
  description: string;
  prix: number;
  disponibilite: boolean;
  image_url: string;
  isFavorite: boolean;
};

// Carousel version mobile

function Catalogue_accueil() {
  const [carousel, setCarousel] = useState(1);
  const [items, setItems] = useState<Bouquet[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite); // Correction de la fermeture de la fonction
  };

  // Appel de l'API

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // Calcul de l'index de départ

  const startIndex = (carousel - 1) * 3;

  // Fonction bouton de droite

  function setNextR() {
    setCarousel((prev) => (prev >= 3 ? 1 : prev + 1));
  }

  // Fonction bouton de gauche

  function setNextL() {
    setCarousel((prev) => (prev === 1 ? 3 : prev - 1));
  }

  return (
    <>
      <div className="flex justify-center text-secondary pt-7">
        <h1>Réservez toutes vos fleurs, depuis chez vous.</h1>
      </div>
      <section className="flex justify-items-center bg-[#EADED5] rounded-md mb-10 mt-10 items-center">
        <article>
          <button type="button" onClick={setNextL}>
            <i className="bi bi-caret-left text-4xl p-5" />
          </button>
        </article>
        {items.slice(startIndex, startIndex + 1).map((item) => (
          <div key={item.id}>
            <img src={item.image_url} alt={item.nom} />
            <h3>{item.nom}</h3>
            <p>{item.description}</p>
            <p>{item.prix} €</p>
            <button type="button" onClick={handleClick}>
              {!isFavorite ? "🖤" : "❤️"}
            </button>
            <button className="bg-[#CE9170] rounded-md p-1" type="button">
              Commander
            </button>
          </div>
        ))}
        <article>
          <button type="button" onClick={setNextR}>
            <i className="bi bi-caret-right text-4xl p-5" />
          </button>
        </article>
      </section>
      <div className="flex justify-center mb-10">
        <Link to="./Catalogue">
          <button
            type="button"
            className="bg-[#CE9170] px-4 py-2 rounded-full text-white"
          >
            Retrouvez notre
            <br />
            catalogue complet
          </button>
        </Link>
      </div>
    </>
  );
}

export default Catalogue_accueil;
