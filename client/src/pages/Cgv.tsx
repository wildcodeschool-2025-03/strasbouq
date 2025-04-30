import { motion } from "framer-motion";

function Cgv() {
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
        Conditions générales de vente
      </motion.h1>

      <div className="space-y-6 text-gray-800 text-justify leading-relaxed">
        {[
          {
            title: "1. Objet et champ d'application",
            content: (
              <>
                <p>
                  Les CGV visent à définir les relations contractuelles et
                  modalités de vente entre Le Jardin Alsacien et tout Client
                  souhaitant procéder à un achat sur le site internet Le Jardin
                  Alsacien, ou en appelant le Centre relation clients.
                </p>
                <p>
                  Le service de transmission florale permet au Client
                  d'effectuer une commande pour faire livrer, à distance, par un
                  fleuriste du réseau ou par colis-fleurs via les transporteurs,
                  un produit floral ou une plante, accompagné ou non d'un
                  message ou d’un article complémentaire (chocolat, bougie, vin,
                  peluche, etc.), à une adresse, une date et un créneau horaire
                  précisés.
                </p>
                <p>
                  Toute commande passée via un des Canaux de Vente implique
                  l’adhésion pleine et entière du Client aux présentes CGV,
                  consultables sur le Site Le Jardin Alsacien.
                </p>
              </>
            ),
          },
          {
            title: "2. Le Jardin Alsacien France",
            content: (
              <>
                <p>
                  Le réseau Le Jardin Alsacien regroupe de nombreux fleuristes
                  indépendants affiliés sur l'ensemble du territoire français,
                  garantissant une couverture de proximité.
                </p>
                <p>
                  Dans le cadre du service de transmission florale, Le Jardin
                  Alsacien s’engage sur la qualité de ses fleuristes
                  partenaires, agréés pour l’usage de la marque. Le respect des
                  engagements contractuels et des normes de qualité est
                  strictement suivi pour garantir les droits du consommateur.
                </p>
              </>
            ),
          },
          {
            title: "3. Caractéristiques des Produits – Prix",
            content: (
              <>
                <p>
                  Seuls les Produits visibles sur le Site au moment de la
                  commande sont proposés à la vente, sous réserve de
                  disponibilité. Le stock est mis à jour régulièrement, sauf en
                  cas de problème technique.
                </p>
                <p>
                  En cas d’indisponibilité, le Client est informé dans les
                  meilleurs délais. Le Client reconnaît avoir pris connaissance
                  des caractéristiques essentielles des Produits décrites sur le
                  Site.
                </p>
                <p>
                  Chaque création florale est unique. Le fleuriste peut, selon
                  la saison ou son stock, remplacer certaines fleurs secondaires
                  (non déterminantes dans le choix du bouquet) tout en
                  respectant l’esprit initial de la commande.
                </p>
                <p>
                  Le style créatif ou le savoir-faire du fleuriste peut
                  également entraîner de légères variations par rapport au
                  visuel présenté.
                </p>
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
            <div className="space-y-2">{section.content}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Cgv;
