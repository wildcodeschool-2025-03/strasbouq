import { useEffect, useState } from "react";
import Contenu from "../components/catalogue/Contenu_catalogue";

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
}

function Panier() {
  const [panier, setPanier] = useState<itemsContenu[]>([]);

  useEffect(() => {
    const listUser = localStorage.getItem("users");
    if (listUser === null) {
      alert("Veuillez vous connecter");
      return;
    }
    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (userConnected === null) {
      alert("Veuillez vous connecter");
      return;
    }
    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);

    if (!user || !user.panier || user.panier.length === 0) {
      alert("Mon panier est vide");
    } else {
      setPanier(user.panier);
    }
  }, []);

  return (
    <>
      {panier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        panier.map((bouquet) => <Contenu item={bouquet} key={bouquet.id} />)
      )}
    </>
  );
}

export default Panier;
