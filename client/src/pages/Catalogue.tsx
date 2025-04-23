import { useEffect, useState } from "react";
import BurgerMenuFiltre from "../components/catalogue/Burgermenu_filtre";
import Contenu from "../components/catalogue/Contenu_catalogue";

function Catalogue() {
  const [items, setItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
        <Contenu item={item} key={item} />
      ))}
    </section>
    </>
  );
}

export default Catalogue;
