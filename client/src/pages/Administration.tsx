import { useEffect, useState } from "react";
import Contenu_administration from "../components/administration/Contenu_administration";

interface Utilisateur {
  mail: string;
  reservation: Article[];
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

function Administration() {
  // State qui stock la liste des gens qui ont commandé qqch
  const [clients, setClients] = useState<Utilisateur[]>([]);

  //Useffect => chargé de regarder qui a une réservation
  useEffect(() => {
    // 1)Crée un tableau vide qui contiendra les comptes utilisateurs qui ont une commande en cours
    const clientAvecCommande = [];

    // 2)Il récupère la base de donnée user (et la converti en version lisible)

    const storedData = localStorage.getItem("users");

    // Vérifie s'il y a des comptes dans la BDD
    if (storedData === null) {
      alert("Aucun client enregistré");
      return;
    }

    const users = JSON.parse(storedData);

    // 3)Il parcourt la base et récupère les comptes user dont user.reservation existe et contient quelque chose
    for (const user of users) {
      if (user.reservation && user.reservation.length >= 1) {
        clientAvecCommande.push(user);
      }
    } // 4)Il stock ces comptes dans le state command
    setClients(clientAvecCommande);
  }, []);

  return (
    <>
      <h1>Liste des réservations en cours :</h1>
      {/* On affiche un texte pour chaque compte qui a une réservation en cours */}
      {clients.map((user) => (
        <article key={user.mail}>
          <p>{user.mail}</p>

          {user.reservation.map((article) => (
            <Contenu_administration article={article} key={article.flower.id} />
          ))}
        </article>
      ))}
    </>
  );
}

export default Administration;
