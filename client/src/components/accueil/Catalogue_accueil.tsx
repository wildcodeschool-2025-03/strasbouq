import { useEffect, useState } from "react";
import { Link } from "react-router";

// Typage du bouquet pour TypeScript
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
  // État pour gérer le numéro de la slide dans le carrousel
  const [carousel, setCarousel] = useState(1);

  // État pour stocker les bouquets récupérés via l'API
  const [items, setItems] = useState<Bouquet[]>([]);

  // État pour gérer le favori
  const [isFavorite, setIsFavorite] = useState(false);

  // Gère le clic sur l’icône de favori
  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Appel de l'API
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  // Calcul de l’index de départ
  const startIndex = (carousel - 1) * 3;

  // Fonction pour passer à la slide suivante
  function setNextR() {
    setCarousel((prev) => (prev >= 3 ? 1 : prev + 1));
  }

  // Fonction pour revenir à la slide précédente
  function setNextL() {
    setCarousel((prev) => (prev === 1 ? 3 : prev - 1));
  }

  return (
    <>
      {/* Titre */}
      <div className="flex justify-center text-secondary pt-7">
        <h1>Réservez toutes vos fleurs, depuis chez vous.</h1>
      </div>

      {/* Section carrousel */}
      <section className="flex justify-items-center bg-[#EADED5] rounded-md mb-10 mt-10 items-center">
        {/* Bouton gauche */}
        <article>
          <button type="button" onClick={setNextL}>
            <i className="bi bi-caret-left text-4xl p-5" />
          </button>
        </article>

        {/* Affichage du bouquet */}
        {items.slice(startIndex, startIndex + 1).map((item) => (
          <div key={item.id}>
            <img src={item.image_url} alt={item.nom} />
            <h3>{item.nom}</h3>
            <p>{item.description}</p>
            <p>{item.prix} €</p>

            {/* Bouton favori */}
            <button type="button" onClick={handleClick}>
              {!isFavorite ? "🖤" : "❤️"}
            </button>

            {/* Bouton pour commander */}
            <button className="bg-[#CE9170] rounded-md p-1" type="button">
              Commander
            </button>
          </div>
        ))}

        {/* Bouton droit */}
        <article>
          <button type="button" onClick={setNextR}>
            <i className="bi bi-caret-right text-4xl p-5" />
          </button>
        </article>
      </section>

      {/* Lien du catalogue */}
      <div className="flex justify-center mb-10">
        <Link to="./Catalogue">
          <button
            type="button"
            className="bg-[#CE9170] px-4 py-2 rounded-full text-black"
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
