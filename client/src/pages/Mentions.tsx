import { motion } from "framer-motion";

function Legales() {
  return (
    <motion.section
      className="bg-white py-10 px-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-2xl font-bold text-secondary text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Mentions légales
      </motion.h1>

      <div className="space-y-6 text-gray-800 text-justify leading-relaxed">
        {[
          {
            title: "Éditeur du site",
            content: (
              <>
                <strong>Responsable :</strong> Les Jardin Alsacien
                <br />
                <strong>Forme juridique :</strong> SARL
                <br />
                <strong>Adresse :</strong> 7 rue des Tonneliers, 67000
                Strasbourg
                <br />
                <strong>Téléphone :</strong> 09 748 885
                <br />
                <strong>Email :</strong> contact@lejardinalsacien.com
                <br />
                <strong>SIRET :</strong> 46546876454871W
                <br />
                <strong>RCS :</strong> Strasbourg
                <br />
                <strong>TVA :</strong> non applicable
              </>
            ),
          },
          {
            title: "Directeur de la publication",
            content: <>Madame Rose Pampa</>,
          },
          {
            title: "Hébergement du site",
            content: (
              <>
                <strong>Hébergeur :</strong> Mr Wild Will
                <br />
                <strong>Adresse :</strong> 8 rue du Fleuriste, 67000 Strasbourg
                <br />
                <strong>Téléphone :</strong> 09 545 665
                <br />
                <strong>Site web :</strong> WildWill.com
              </>
            ),
          },
          {
            title: "Propriété intellectuelle",
            content: (
              <>
                L’ensemble du contenu présent sur ce site (textes, images,
                logos, graphismes, etc.) est la propriété de Le Jardin Alsacien
                sauf mention contraire. Toute reproduction ou exploitation, même
                partielle, est interdite sans autorisation préalable.
              </>
            ),
          },
          {
            title: "Protection des données personnelles",
            content: (
              <>
                Conformément à la loi « Informatique et Libertés » et au RGPD,
                vous disposez d’un droit d’accès, de rectification et de
                suppression de vos données personnelles. Pour exercer ce droit,
                contactez-nous à :{" "}
                <a
                  href="mailto:contact@lejardinalsacien.com"
                  className="underline"
                >
                  contact@lejardinalsacien.com
                </a>
                .
              </>
            ),
          },
          {
            title: "Cookies",
            content: (
              <>
                Ce site utilise des cookies pour améliorer votre expérience
                utilisateur. En poursuivant votre navigation, vous acceptez leur
                utilisation. Vous pouvez modifier vos préférences dans les
                paramètres de votre navigateur.
              </>
            ),
          },
        ].map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-secondary">
              {section.title}
            </h2>
            <p>{section.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Legales;
