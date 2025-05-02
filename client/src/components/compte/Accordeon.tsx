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
  };

  return (
    <div className=" mt-4 w-[80%] ml-5 pb-4 md:w-[50%] xl:w-[33%] xl:pb-1">
      <AccordeonItem title="Mes informations">
        <p>Mail: {currentUser?.mail}</p>
        <p>Mot de passe: {currentUser?.password}</p>
      </AccordeonItem>
      <AccordeonItem title="Mes réservations en cours">
        {currentUser?.reservation && currentUser.reservation.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {currentUser.reservation.map((article) => (
              <li key={article.flower.id}>
                {article.flower.nom} – Prix : {article.flower.prix}€ – Quantité
                : {article.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <AccordeonItem title="Mes réservations refusées">
        {currentUser?.refused && currentUser.refused.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {currentUser.refused.map((article) => (
              <li key={article.flower.id}>
                {article.flower.nom} – Prix : {article.flower.prix}€ – Quantité
                : {article.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <AccordeonItem title="Historique de mes commandes">
        {currentUser?.validated && currentUser.validated.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {currentUser.validated.map((article) => (
              <li key={article.flower.id}>
                {article.flower.nom} – Prix : {article.flower.prix}€ – Quantité
                : {article.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Pas de réservation en cours</p>
        )}
      </AccordeonItem>

      <button
        type="button"
        className="rounded-3xl w-46 py-2 border-2 border-secondary mt-10"
        onClick={seDeconnecter}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Accordeon;
