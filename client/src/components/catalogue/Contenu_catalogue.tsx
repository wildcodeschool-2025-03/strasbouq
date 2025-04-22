import React, { useState } from "react";
import Catalogue from "../../pages/Catalogue";

interface itemsContenu {
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface ContenuProps {
  item: itemsContenu;
}

function Contenu({ item }: ContenuProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <section className="flex-col justify-items-center bg-[#EADED5] rounded-md">
      <img src={item.image_url} alt={item.nom} />
      <h3>{item.nom}</h3>
      <p>{item.description}</p>
      <aside>{item.prix} €</aside>
      <button type="button" onClick={handleClick}>
        {!isFavorite ? "🖤" : "❤️"}
      </button>
      <button className="bg-[#CE9170] rounded-md" type="button">Commander</button>
    </section>
  );
}

export default Contenu;
