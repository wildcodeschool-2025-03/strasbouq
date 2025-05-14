import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AccordeonItem from "./AccordeonItem";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface Utilisateur {
  mail: string;
  reservation: Article[];
  validated: Article[];
  refused: Article[];
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface Utilisateur {
  mail: string;
  panier: Article[];
  reservation: Article[];
  password: string;
}

function Accordeon() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<Utilisateur | null>(null);

  useEffect(() => {
    const usersData = localStorage.getItem("users");
    if (usersData === null) {
      alert("veuillez vous connecter");
      return;
    }

    const users = JSON.parse(usersData);

    const userConnectedData = sessionStorage.getItem("currentUser");
    if (userConnectedData === null) {
      alert("veuillez vous connecter");
      return;
    }

    const userConnected = JSON.parse(userConnectedData);

    const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);
    setCurrentUser(user ?? null);
  }, []);

  const seDeconnecter = () => {
    const deconnecter = sessionStorage.getItem("currentUser");
    if (deconnecter === null) {
      alert("veuillez vous connecter");
      return;
    }
    sessionStorage.removeItem("currentUser");
    navigate("/");

    // Evenement changement nombre d'items dans le panier
    const event = new CustomEvent("panierUpdated", {
      detail: 0,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className=" mt-4 pb-4 xl:pb-1 md:w-full w-[90%]">
      <AccordeonItem title="Mes informations">
        <p className="pl-4">Mail: {currentUser?.mail}</p>
        <p className="pl-4">Mot de passe: {currentUser?.password}</p>
      </AccordeonItem>
      <AccordeonItem title="Mes réservations en cours">
        {currentUser?.reservation && currentUser.reservation.length > 0 ? (
          <ul className="list-inside space-y-6 list-none pl-4 mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold">
            {currentUser.reservation.map((article) => (
              <li key={article.flower.id}>
                <p className="font-bold">{article.flower.nom} </p>
                <p>
                  Prix : {article.flower.prix}€ - Quantité : {article.quantity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pl-3">Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <AccordeonItem title="Mes réservations refusées">
        {currentUser?.refused && currentUser.refused.length > 0 ? (
          <ul className="list-inside space-y-6 list-none pl-4 mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold">
            {currentUser.refused.map((article) => (
              <li key={article.flower.id}>
                <p className="font-bold">{article.flower.nom} </p>
                <p>
                  Prix : {article.flower.prix}€ - Quantité : {article.quantity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pl-3">Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <AccordeonItem title="Historique de mes commandes">
        {currentUser?.validated && currentUser.validated.length > 0 ? (
          <ul className="list-inside space-y-6 list-none pl-4 mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold">
            {currentUser.validated.map((article) => (
              <li key={article.flower.id}>
                <p className="font-bold">{article.flower.nom} </p>
                <p>
                  Prix : {article.flower.prix}€ - Quantité : {article.quantity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pl-3">Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <button
        type="button"
        className="rounded-3xl w-46 py-2 border-2 border-secondary mt-10 cursor-pointer"
        onClick={seDeconnecter}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Accordeon;
