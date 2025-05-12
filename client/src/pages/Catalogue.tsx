import { useCallback, useEffect, useState } from "react";
import BurgerMenuFiltre from "../components/catalogue/Burgermenu_filtre";
import Contenu from "../components/catalogue/Contenu_catalogue";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  disponibilite: boolean;
  image_url: string;
  Color: string;
}

function Catalogue() {
  const [items, setItems] = useState<itemsContenu[]>([]);
  const [itemsApi, setItemsApi] = useState<itemsContenu[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const [color, setColor] = useState("");
  const [disponibilite, setDisponibilite] = useState<boolean | null>(null);
  const [order, setOrder] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setItemsApi(data);
      });
  }, []);

  const flowerTri = useCallback(() => {
    let result = itemsApi.filter(
      (flower) =>
        flower.prix >= minPrice &&
        flower.prix <= maxPrice &&
        (disponibilite === null || flower.disponibilite === disponibilite) &&
        (!color ||
          (Array.isArray(flower.Color) &&
            flower.Color.some((c) =>
              c?.toLowerCase().includes(color.toLowerCase()),
            ))),
    );

    if (order) {
      result = result.sort((a, b) => a.prix - b.prix);
    } else {
      result = result.sort((a, b) => b.prix - a.prix);
    }

    setItems(result);
  }, [color, disponibilite, order, minPrice, maxPrice, itemsApi]);

  useEffect(() => {
    flowerTri();
  }, [flowerTri]);

  return (
    <section className="bg-white">
      <BurgerMenuFiltre
        setColor={setColor}
        setDisponibilite={setDisponibilite}
        setOrder={setOrder}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-15 pt-15 pb-15">
        {items?.map((item) => (
          <Contenu item={item} key={item.id} />
        ))}
      </section>
    </section>
  );
}

export default Catalogue;
