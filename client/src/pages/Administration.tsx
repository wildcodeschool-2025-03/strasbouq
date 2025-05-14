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
    const storedData = localStorage.getItem("users");

    if (!storedData) {
      alert("Aucun client enregistré");
      return;
    }

    const users: Utilisateur[] = JSON.parse(storedData);

    const clientAvecCommande = users.filter(
      (user) =>
        (user.reservation && user.reservation.length > 0) ||
        (user.validated && user.validated.length > 0) ||
        (user.refused && user.refused.length > 0),
    );

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
    <section className="bg-white pt-10 pb-10 md:pb-80">
      <div className=" bg-primary md:justify-center md:flex md:flex-col md:items-center xl:justify-start xl:items-start xl:p-5">
        <div className="pt-5 ml-5 mr-5 pb-2 md:w-[90%] xl:pb-1">
          <AccordeonItem title="Réservation à valider">
            <div>
              {/* Liste des clients avec réservation */}
              {clients.some(
                (user) => user.reservation && user.reservation.length > 0,
              ) ? (
                <section className="pt-1 ">
                  {clients.map((user) =>
                    user.reservation && user.reservation.length > 0 ? (
                      <article
                        className="mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold"
                        key={user.mail}
                      >
                        <p className="text-center">{user.mail}</p>

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
                <p className="ml-4">Pas de réservation en attente</p>
              )}
            </div>
          </AccordeonItem>
        </div>

        <div className="pt-5 ml-5 mr-5 pb-2 md:w-[90%] xl:pb-1">
          <AccordeonItem title="Réservations acceptées">
            <div>
              {/* Liste des clients avec réservation acceptée */}

              {clients.some(
                (user) => user.validated && user.validated.length > 0,
              ) ? (
                <section className="pt-1">
                  {clients.map((user) =>
                    user.validated && user.validated.length > 0 ? (
                      <article
                        className="mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold"
                        key={user.mail}
                      >
                        <p className="text-center">{user.mail}</p>

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
                <p className="ml-4">Pas de réservation acceptée</p>
              )}
            </div>
          </AccordeonItem>
        </div>

        <div className="pt-5 ml-5 mr-5 pb-2 md:w-[90%] xl:pb-1">
          <AccordeonItem title="Réservations refusées">
            <div>
              {/* Liste des clients avec réservation refusée */}

              {clients.some(
                (user) => user.refused && user.refused.length > 0,
              ) ? (
                <section className="pt-1">
                  {clients.map((user) =>
                    user.refused && user.refused.length > 0 ? (
                      <article
                        className="mt-5 pb-4 pt-4 border-secondary border-1 rounded-md font-bold"
                        key={user.mail}
                      >
                        <p className="text-center">{user.mail}</p>

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
        </div>

        {/* Le bouton Se Déconnecter est placé UNE SEULE FOIS */}
        <div className="text-center mt-10">
          <button
            type="button"
            className="rounded-3xl w-46 py-2 border-2 mb-5 border-secondary cursor-pointer"
            onClick={seDeconnecter}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </section>
  );
}

export default Administration;
