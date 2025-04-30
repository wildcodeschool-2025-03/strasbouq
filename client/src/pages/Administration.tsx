import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Contenu_administration from "../components/administration/Contenu_administration";
import Contenu_info_admin from "../components/administration/Contenu_info_admin";
import AccordeonItem from "../components/compte/AccordeonItem";

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

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

function Administration() {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Utilisateur[]>([]);

  // Mets à jour l'affichage dès qu'une commande a été refusée ou validée
  const updateClient = (updatedUser: Utilisateur) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.mail === updatedUser.mail ? updatedUser : client,
      ),
    );
  };

  useEffect(() => {
    const clientAvecCommande: Utilisateur[] = [];

    const storedData = localStorage.getItem("users");

    if (!storedData) {
      alert("Aucun client enregistré");
      return;
    }

    const users: Utilisateur[] = JSON.parse(storedData);

    for (const user of users) {
      if (user.reservation && user.reservation.length >= 1) {
        clientAvecCommande.push(user);
      }
    }

    setClients(clientAvecCommande);
  }, []);

  //  Fonction bien placée en dehors de useEffect
  const seDeconnecter = () => {
    const deconnecter = sessionStorage.getItem("currentUser");
    if (deconnecter === null) {
      alert("Veuillez vous connecter");
      return;
    }
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div>
      <AccordeonItem title="Mes informations">
        <div>
          <h1>Liste des réservations en cours :</h1>

          {/* Liste des clients avec réservation */}
          {clients.some(
            (user) => user.reservation && user.reservation.length > 0,
          ) ? (
            <section>
              {clients.map((user) =>
                user.reservation && user.reservation.length > 0 ? (
                  <article key={user.mail}>
                    <p>{user.mail}</p>

                    {/* Liste des articles réservés */}
                    {user.reservation.map((article) => (
                      <Contenu_administration
                        article={article}
                        user={user}
                        updateClient={updateClient}
                        key={article.flower.id}
                      />
                    ))}
                  </article>
                ) : null,
              )}{" "}
            </section>
          ) : (
            <p>Pas de réservation en attente</p>
          )}
        </div>
      </AccordeonItem>

      <AccordeonItem title="2">
        <div>
          <h1>Liste des réservations acceptées :</h1>
          {/* Liste des clients avec réservation acceptée */}

          {clients.some(
            (user) => user.validated && user.validated.length > 0,
          ) ? (
            <section>
              {clients.map((user) =>
                user.validated && user.validated.length > 0 ? (
                  <article key={user.mail}>
                    <p>{user.mail}</p>

                    {/* Liste des articles réservés */}
                    {user.validated?.map((article) => (
                      <Contenu_info_admin
                        article={article}
                        key={article.flower.id}
                      />
                    ))}
                  </article>
                ) : null,
              )}{" "}
            </section>
          ) : (
            <p>Pas de réservation acceptée</p>
          )}
        </div>
      </AccordeonItem>

      <AccordeonItem title="2">
        <div>
          <h1>Liste des réservations refusées :</h1>
          {/* Liste des clients avec réservation refusée */}

          {clients.some((user) => user.refused && user.refused.length > 0) ? (
            <section>
              {clients.map((user) =>
                user.refused && user.refused.length > 0 ? (
                  <article key={user.mail}>
                    <p>{user.mail}</p>

                    {/* Liste des articles réservés */}
                    {user.refused?.map((article) => (
                      <Contenu_info_admin
                        article={article}
                        key={article.flower.id}
                      />
                    ))}
                  </article>
                ) : null,
              )}{" "}
            </section>
          ) : (
            <p>Pas de réservation refusée</p>
          )}
        </div>
      </AccordeonItem>

      {/* Le bouton Se Déconnecter est placé UNE SEULE FOIS */}
      <div className="text-center mt-10">
        <button
          type="button"
          className="rounded-3xl w-46 py-2 border-2 border-secondary"
          onClick={seDeconnecter}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Administration;
