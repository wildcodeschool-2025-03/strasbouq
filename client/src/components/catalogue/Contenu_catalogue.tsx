import { useState } from "react";

interface itemsContenu {
  id: number;
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
    <section className="flex-col justify-items-left bg-[#EADED5] rounded-md relative px-5 pt-70 pb-10 w-[300px] mx-auto overflow-visible">
      <img
        className="absolute top-[-50px] left-[0px]"
        src={item.image_url}
        alt={item.nom}
      />
      <h3 className="font-bold pb-3">{item.nom}</h3>
      <p className="pb-3">{item.description}</p>
      <aside className="pb-3 font-bold">{item.prix} €</aside>
      <section className="flex flex-row justify-between">
        <button type="button" onClick={handleClick}>
          {!isFavorite ? "🖤" : "❤️"}
        </button>
        <button
          className="bg-[#CE9170] rounded-4xl p-2 pr-4 pl-4 font-bold"
          type="button"
        >
          Commander
        </button>
      </section>
    </section>
  );
}

export default Contenu;
