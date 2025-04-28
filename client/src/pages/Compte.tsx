import { useEffect, useState } from "react";
import Accordeon from "../components/compte/Accordeon";
import { getCurrentUserData } from "../components/fonctions";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface Utilisateur {
  mail: string;
  password: string;
  panier: Article[];
}

function Compte() {
  const [curentUser, setCurentUser] = useState<Utilisateur | null>(null);

  // --------------------- TO DO CODE A EXCUTER AU RAFRAICHISSEMENT DE LA PAGE ----------------------
  useEffect(() => {
    const user = getCurrentUserData();
    if (user) {
      setCurentUser(user);
    }
  }, []);

  return (
    <>
      <section className="bg-primary mt-10 md:justify-center md:flex md:flex-col md:items-center xl:justify-start xl:items-start xl:p-5">
        <h2 className="ml-5 pt-5 text-2xl font-bold">
          Bonjour {curentUser?.mail}
        </h2>
        <hr className="ml-5 mt-5 h-px border-t-0 bg-black w-[80%] md:w-[50%]" />
        <Accordeon />
      </section>
    </>
  );
}

export default Compte;
