import { Link } from "react-router";

import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className="flex items-center justify-between px-4 py-2">
        {/* Menu Burger */}
        <article className="w-1/3">
          <button
            type="button"
            className="pl-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="bi bi-list text-3xl" />
          </button>
          {isMenuOpen && (
            <nav>
              <ul className="list-none">
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

        {/* Logo centré */}
        <article className="w-1/3 flex justify-center">
          <Link to="/">
            <img
              src="./assets/Logo-jardin-alsacien.png"
              alt="Le Jardin Alsacien"
              className="w-auto h-[100px] object-contain mt-4"
            />
          </Link>
        </article>

        {/* Icônes */}
        <article className="w-1/3 pr-4 flex justify-end gap-4 items-center">
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
