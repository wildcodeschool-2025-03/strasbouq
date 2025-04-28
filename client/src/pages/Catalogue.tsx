import { useEffect, useState } from "react";
import BurgerMenuFiltre from "../components/catalogue/Burgermenu_filtre";
import Contenu from "../components/catalogue/Contenu_catalogue";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  disponible: string;
  image_url: string;
  color: string;
}

function Catalogue() {
  const [items, setItems] = useState<itemsContenu[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const [color, setColor] = useState("");
  const [disponible, setDisponible] = useState(null);
  const [order, setOrder] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const flowerTri = () => {
    let finalTable: itemsContenu[] = [];
    const tableau: itemsContenu[] = items;

    for (const flower of tableau) {
      if (flower.prix < maxPrice && flower.prix > minPrice) {
        finalTable.push(flower);
      }

      if (disponible === null || flower.disponible === disponible) {
        finalTable.push(flower);
      }

      if (!color || flower.color === color) {
        finalTable.push(flower);
      }
    }
      if (order) {
        finalTable = finalTable.sort((a, b) => a.prix - b.prix);
      }

      setItems(finalTable);
    
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
      <BurgerMenuFiltre />
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-20 pt-20 pb-20">
        {items?.map((item) => (
          <Contenu item={item} key={item.id} />
        ))}
      </section>
    </>
  );
}

export default Catalogue;
