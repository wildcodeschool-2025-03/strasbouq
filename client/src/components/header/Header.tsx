import { Link } from "react-router";

import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-2">
        {/* Menu Burger */}
        <article className="justify-self-start">
          <button
            type="button"
            className="pl-2 block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bi bi-list text-3xl" />
          </button>
          {/* Liste menu grand écran responsive */}

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
          {/* Menu Burger */}
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

        {/* Logo */}
        <article className="justify-self-center">
          <Link to="/">
            <img
              src="./assets/Logo-jardin-alsacien.png"
              alt="Le Jardin Alsacien"
              className="w-auto h-[115px] object-contain mt-4"
            />
          </Link>
        </article>

        {/* Icônes */}
        <article className="flex flex-col md:flex-row justify-self-end items-center md:pr-10">
          <div className="hidden md:block md:mr-16">
            <Link to="./About">À propos</Link>
          </div>
          <Link to="./Compte">
            <i className="bi bi-person text-2xl" />
          </Link>
          <Link to="./Panier">
            <i className="bi bi-cart text-2xl" />
          </Link>
        </article>
      </section>

      <div className="text-container">
        <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-800" />
      </div>
    </>
  );
}

export default Header;
