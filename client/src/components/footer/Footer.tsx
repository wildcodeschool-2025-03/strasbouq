import { Link } from "react-router";
import { setDarkMode } from "../../contextes/ThemeContext";

function Footer() {
  const switchDarkMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const { theme, setTheme } = setDarkMode();

  return (
    <section className="bg-secondary pb-5">
      <section className="flex flex-row justify-center gap-5 p-5">
        <p>
          <a href="https://www.facebook.com/">
            <i className="text-4xl bi bi-facebook" />
          </a>
        </p>
        <p>
          <a href="https://www.instagram.com/">
            <i className="text-4xl bi bi-instagram" />
          </a>
        </p>
        <p>
          <a href="https://fr.pinterest.com/">
            {" "}
            <i className="text-4xl bi bi-pinterest" />
          </a>
        </p>
      </section>
      <section className="flex flex-col items-center gap-1">
        <Link to="/contact">Contact</Link>
        <Link to="/mentions">Mentions légales</Link>
        <Link to="/CGV">CGV</Link>

        <p className="font-semibold">
          <i className="text-xl bi bi-c-circle" /> Le Jardin Alsacien
        </p>
      </section>
      <article>
        <button type="button" onClick={switchDarkMode}>
          Taille du texte
        </button>
      </article>
    </section>
  );
}

export default Footer;
