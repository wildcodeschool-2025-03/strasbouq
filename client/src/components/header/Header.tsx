import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Account_management from "../compte/Account_management";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => setIsModalOpen(false);

  const handleAccountClick = () => {
    const storedData = sessionStorage.getItem("currentUser");
    if (storedData === null) {
      setIsModalOpen(true);
      return;
    }

    const currentUser = JSON.parse(storedData);
    if (currentUser === "admin") {
      navigate("/Administration");
    } else {
      navigate("/Compte");
    }
  };

  const handleCartClick = () => {
    const storedData = sessionStorage.getItem("currentUser");
    if (storedData === null) {
      toast.error("Veuillez vous connecter");
      return;
    }

    const currentUser = JSON.parse(storedData);
    if (currentUser) {
      navigate("/Panier");
    } else {
      toast.error("Veuillez vous connecter");
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#CE9170] text-white text-center py-2 text-base font-semibold"
      >
        Sur tous les bouquets - Code promo :{" "}
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="inline-block text-white"
        >
          wild20
        </motion.span>
      </motion.div>

      <section className="relative">
        <header className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-2 bg-white-100 z-10">
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
                  <Link to="/Catalogue">Catalogue</Link>
                </li>
              </ul>
            </nav>
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
              <Link to="/About">À propos</Link>
            </div>

            <button
              type="button"
              onClick={handleAccountClick}
              className="md:mr-4"
            >
              {sessionStorage.getItem("currentUser") ? (
                <i className="bi bi-person-fill-check text-2xl" />
              ) : (
                <i className="bi bi-person text-2xl" />
              )}
            </button>

            <button type="button" onClick={handleCartClick} className="md:mr-4">
              <i className="bi bi-cart text-2xl" />
            </button>
          </article>
        </header>
      </section>
      <div className="text-contain">
        <hr className="my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-800" />
      </div>

      {isMenuOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Fermer le menu mobile"
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsMenuOpen(false);
            }
          }}
          className="fixed inset-0 z-40 md:hidden cursor-pointer outline-none"
        />
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="origin-top transform bg-primary md:hidden rounded-lg px-6 py-4 m-2 shadow-md text-center z-50 relative"
          >
            <ul className="space-y-4 flex flex-col items-center">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/Catalogue" onClick={() => setIsMenuOpen(false)}>
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/About" onClick={() => setIsMenuOpen(false)}>
                  À propos
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* MODALE COMPTE animée */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()} // évite que le clic sur la boîte ferme la modale
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-primary hover:text-secondary text-2xl"
              >
                &times;
              </button>
              <Account_management onClose={handleCloseModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
