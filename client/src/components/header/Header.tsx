import { Link } from "react-router";

import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className="flex items-center justify-between">
        <article>
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="bi bi-list" />
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
        <article>
          <Link to="/">
            <img
              src="./assets/Logo-jardin-alsacien.png"
              alt="Le Jardin Alsacien"
              className="w-auto h-[100px] object-contain mt-4"
            />
          </Link>
        </article>
        <article>
          <Link to="./Compte">
            <i className="bi bi-person" />
          </Link>
          <Link to="./Panier">
            <i className="bi bi-cart" />
          </Link>
        </article>
      </section>
    </>
  );
}

export default Header;
