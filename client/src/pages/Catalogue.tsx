import React, { useEffect, useState } from "react";
import Contenu from "../components/catalogue/Contenu_catalogue";

function Catalogue() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api-strasbouq.vercel.app/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [items]);

  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-15">
      {items?.map((item) => (
        <Contenu item={item} key={item.id}/>
      ))}
    </section>
  );
}

export default Catalogue;
