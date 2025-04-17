import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function Legales() {
  return (
    <>
      <Header />
      <h1 className="text-center text-primary m-6"> Mentions légales</h1>

      <p>
        Éditeur du site Nom du responsable / entreprise : Les Jardin Alsacien
        <br />
        Forme juridique : SARL
        <br />
        Adresse du siège social : 7 rue des Tonneliers 67000 Strasbourg
        <br />
        Téléphone : 09 748 885
        <br />
        Adresse e-mail : contact@lejardinalscien.com
        <br />
        Numéro SIRET : 46546876454871W
        <br />
        RCS / RM : Strasbourg
        <br />
        Numéro de TVA intracommunautaire : not applicable
        <br />
        Directeur de la publication
        <br />
        Mme Rose Pampa
        <br />
        Hébergement du site
        <br />
        Hébergeur : Mr Wild Will
        <br />
        Adresse : 8 rue du fleuriste 67000 Strasbourg
        <br />
        Téléphone : 09 545 665
        <br />
        Site web : WildWill.com
        <br />
        Propriété intellectuelle
        <br />
        L’ensemble du contenu présent sur ce site (textes, images, logos,
        graphismes, etc.) est la propriété de Le Jardin Alsacien sauf mention
        contraire. Toute reproduction, représentation, diffusion ou
        exploitation, même partielle, est interdite sans autorisation préalable.
        Protection des données personnelles
        <br />
        Conformément à la loi « Informatique et Libertés » et au RGPD, vous
        disposez d’un droit d’accès, de rectification et de suppression des
        données personnelles vous concernant. Pour exercer ce droit, vous pouvez
        contacter : contact@lejardinalsacien.com.
        <br />
        Cookies
        <br />
        Ce site peut utiliser des cookies pour améliorer l’expérience
        utilisateur. En naviguant sur ce site, vous acceptez l’utilisation de
        cookies. Vous pouvez à tout moment modifier vos préférences dans les
        paramètres de votre navigateur.
      </p>

      <Footer />
    </>
  );
}

export default Legales;
