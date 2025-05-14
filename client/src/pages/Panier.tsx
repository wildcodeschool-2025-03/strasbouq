import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Paiement from "../components/compte/Paiement";
import { getCurrentUserData } from "../components/fonctions";
import ContenuPanier from "../components/panier/Contenue_panier";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface Utilisateur {
  mail: string;
  panier: Article[];
  reservation: Article[];
}

// Ajout au panier
function Panier() {
  const CODE_PROMO = import.meta.env.VITE_CODE_PROMO;
  const [panier, setPanier] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [total, setTotal] = useState(0);
  const [sousTotal, setSousTotal] = useState(0);
  const [remise, setRemise] = useState(0);

  useEffect(() => {
    const user = getCurrentUserData();
    if (!user || !user.panier || user.panier.length === 0) {
    } else {
      setPanier(user.panier);
    }
  }, []);

  useEffect(() => {
    // Calcul du total du panier
    setSousTotal(
      panier.reduce(
        (total, item) => total + item.flower.prix * item.quantity,
        0,
      ),
    );

    if (code === CODE_PROMO) {
      setTotal(
        panier.reduce(
          (total, item) => total + item.flower.prix * item.quantity,
          0,
        ) * 0.8,
      );
      setRemise(
        panier.reduce(
          (total, item) => total + item.flower.prix * item.quantity,
          0,
        ) * 0.2,
      );
    } else {
      setTotal(
        panier.reduce(
          (total, item) => total + item.flower.prix * item.quantity,
          0,
        ),
      );

      setRemise(0);
    }
  }, [panier, code]);

  // Fonction fermeture de la modale (pour passer à l'enfant)
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const updatePanier = (newPanier: Article[]) => {
    setPanier(newPanier);
  };

  // Passage de commande
  const payCart = () => {
    handleCloseModal();

    // Récupère les datas de la personne connectée
    const storedData = localStorage.getItem("users");
    if (storedData === null) {
      toast.error("Aucun compte existant");
      return;
    }

    const users: Utilisateur[] = JSON.parse(storedData);

    const userStoredData = sessionStorage.getItem("currentUser");
    if (userStoredData === null) {
      toast.error("Veuillez vous connecter");
      return;
    }
    const userConnected = JSON.parse(userStoredData);
    const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);

    if (!user) {
      toast.error("Utilisateur non trouvé");
      return;
    }

    // Si panier vide
    if (!user || !user.panier || user.panier.length === 0) {
      toast.info("Votre panier est vide, rien à payer !");
      return;
    }

    // Si il n'y avait pas déja une résa en cours
    if (!user.reservation) {
      user.reservation = [];
      user.reservation = user.panier;
    }

    // Si il y a déja une réservation
    else {
      for (const article of user.panier) {
        user.reservation.push(article);
      }
    }

    // Vider le panier
    user.panier = [];
    setPanier(user.panier);

    // Enregistrer la réservation
    localStorage.setItem("users", JSON.stringify(users));

    // Evenement changement nombre d'items dans le panier
    let numberOfTotalItems = 0;

    for (const article of user.panier) {
      numberOfTotalItems += article.quantity;
    }

    const event = new CustomEvent("panierUpdated", {
      detail: numberOfTotalItems,
    });
    window.dispatchEvent(event);

    // Confirmation visuelle
    toast.success("Votre commande a été enregistrée 🎉");

    // Redirection vers /merci
    setTimeout(() => {
      navigate("/merci");
    }, 1000);
  };

  const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 min-h-lvh bg-white">
      {/* Récapitulatif */}
      <div className="order-1 lg:order-2 w-full lg:w-[350px] bg-[#F5ECE6] p-6 rounded-xl shadow-md h-fit">
        <h3 className="text-2xl font-semibold mb-4 text-[#B67152] text-center">
          Récapitulatif
        </h3>
        <div className="flex justify-center mb-2 text-sm">
          <input
            className="font-mono bg-white py-1 rounded border border-gray-300 w-40 text-center"
            type="text"
            value={code}
            onChange={handleCode}
            placeholder="CODE PROMO"
          />
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Sous total</span>
          <span>{sousTotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Remise</span>
          <span>-{remise.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <button
          type="button"
          className="bg-[#CE9170] hover:bg-[#b87c5d] text-white w-full py-3 rounded-md transition"
          onClick={handleOpenModal}
        >
          Procéder au paiement
        </button>
      </div>

      {/* Modale de paiement */}
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

              {/* Contenu de la modale */}
              <Paiement payCartChild={payCart} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mon panier */}
      <div className="order-2 lg:order-1 flex-1">
        <h2 className="text-2xl font-bold mb-8 text-[#B67152] text-center md:pt-6">
          Mon panier
        </h2>

        {panier.length === 0 ? (
          <p className="text-center text-gray-600">Votre panier est vide.</p>
        ) : (
          panier.map((item) => (
            <article key={item.flower.id} className="flex gap-8">
              <ContenuPanier
                item={item}
                updatePanier={updatePanier}
                panier={panier}
                quantity={item.quantity}
              />
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Panier;
