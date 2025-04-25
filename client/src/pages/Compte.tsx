import { useEffect, useState } from "react";
import Accordeon from "../components/compte/Accordeon";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface Utilisateur {
  mail: string;
  panier: itemsContenu[] | null;
  password: string;
}

function Compte() {
  const [curentUser, setCurentUser] = useState<Utilisateur | null>(null);
  // --------------------- TO DO CODE A EXCUTER AU RAFRAICHISSEMENT DE LA PAGE ----------------------
  useEffect(() => {
    const usersData = localStorage.getItem("users");

    if (usersData === null) {
      alert("message test 1");
      return;
    }
    const users = JSON.parse(usersData);

    const userConnectedData = sessionStorage.getItem("currentUser");
    if (userConnectedData === null) {
      alert("message test 2");
      return;
    }

    const userConnected = JSON.parse(userConnectedData);
    const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);
    setCurentUser(user);
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
