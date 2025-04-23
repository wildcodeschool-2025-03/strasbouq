import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import Account_management from "../compte/Account_management";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fonction pour pouvoir appeler la fermeture de la modale depuis les enfants
  const handleCloseModal = () => setIsModalOpen(false);

  // Fonctionnalité du clic sur l'icone mon compte
  const handleAccountClick = () => {
    const storedData = localStorage.getItem("currentUser");

    // Si pas connecté : ouvre la modale
    if (storedData === null) {
      setIsModalOpen(true);
      return;
    }

    const currentUser = JSON.parse(storedData);

    // Si compte admin
    if (currentUser === "admin") {
      navigate("/Administration");
    }

    // Si un autre utilisateur
    else {
      navigate("/Compte");
    }
  };

  return (
    <>
      <section className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-2">
        <article className="justify-self-start">
          <button
            type="button"
            className="pl-2 block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bi bi-list text-3xl" />
          </button>

          <nav className="pl-10 hidden md:block">
            <ul className="flex gap-16">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="./Catalogue">Catalogue</Link>
              </li>
            </ul>
          </nav>

          {isMenuOpen && (
            <nav className="md:hidden">
              <ul className="list-none space-y-2">
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                <li>
                  <Link to="./Catalogue">Catalogue</Link>
                </li>
                <li>
                  <Link to="./About">A propos</Link>
                </li>
              </ul>
            </nav>
          )}
        </article>

        <article className="justify-self-center">
          <Link to="/">
            <img
              src="./assets/Logo-jardin-alsacien.png"
              alt="Le Jardin Alsacien"
              className="w-auto h-[115px] object-contain mt-4"
            />
          </Link>
        </article>

        <article className="flex flex-col md:flex-row justify-self-end items-center md:pr-10">
          <div className="hidden md:block md:mr-16">
            <Link to="./About">À propos</Link>
          </div>

          {/* Ouverture de la modale ou passage à la page "mon compte" selon que l'on soit connecté ou non*/}
          <button type="button" onClick={handleAccountClick} className="mr-4">
            {/* Affiche une icone différente pour dire si l'on est connecté ou non  ---- A COMPLETER pour 100% des cas*/}
            {localStorage.getItem("currentUser") ? (
              <i className="bi bi-person-fill-check text-2xl" />
            ) : (
              <i className="bi bi-person text-2xl" />
            )}
          </button>

          <Link to="./Panier">
            <i className="bi bi-cart text-2xl" />
          </Link>
        </article>
      </section>

      <div className="text-container">
        <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-800" />
      </div>

      {/* -----------------------------------MODALE------------------------------------ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl relative w-full max-w-md">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-primary hover:text-secondary text-2xl"
            >
              &times;
            </button>

            {/* Contenu de la modale */}
            <Account_management onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
