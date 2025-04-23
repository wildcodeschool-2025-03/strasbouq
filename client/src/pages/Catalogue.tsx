import { useEffect, useState } from "react";
import Contenu from "../components/catalogue/Contenu_catalogue";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

function Catalogue() {
  const [items, setItems] = useState<itemsContenu[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [order, setOrder] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [color, setColor] = useState("");

  const flowerTri = () => {
    const finalTable: itemsContenu[] = [];
    const tableau: itemsContenu[] = items;

    for (const flower of tableau) {
      if (flower.prix < maxPrice && flower.prix > minPrice) {
        finalTable.push(flower);
      }
    }

    setItems(finalTable);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-20 pt-20 pb-20">
      {items?.map((item) => (
        <Contenu item={item} key={item.id} />
      ))}
    </section>
  );
}

export default Catalogue;
