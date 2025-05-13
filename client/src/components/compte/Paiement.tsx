import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCcMastercard,
  FaCcVisa,
  FaCheckCircle,
  FaCreditCard,
  FaExclamationTriangle,
  FaLock,
  FaTimesCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  nom: string;
  numero: string;
  date: string;
  crypto: string;
}

function Paiement({ payCartChild }: { payCartChild: () => void }) {
  // State pour gérer les inputs de manière robuste
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    numero: "",
    date: "",
    crypto: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    const { nom, numero, date, crypto } = formData;
    // Si les champs ne sont pas rempli
    if (!nom || !numero || !date || !crypto) {
      toast.error("Veuillez remplir tous les champs.", {
        icon: <FaExclamationTriangle />,
        style: { background: "#fff4e6", color: "#7c3d0e" },
      });
      return;
    }
    // Sécurité pour nom
    const nomRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
    if (!nomRegex.test(nom)) {
      toast.error("Nom invalide. Lettres uniquement.", {
        icon: <FaTimesCircle />,
      });
      return;
    }
    // Sécurité pour Numéro de carte
    const numeroRegex = /^\d{16}$/;
    if (!numeroRegex.test(numero)) {
      toast.error("Numéro de carte invalide (16 chiffres).", {
        icon: <FaCreditCard />,
      });
      return;
    }
    // Sécurité pour date carte
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!dateRegex.test(date)) {
      toast.error("Date invalide. Format attendu : MM/AA", {
        icon: <FaCalendarAlt />,
      });
      return;
    }
    // Sécurité pour Crypto
    const cryptoRegex = /^\d{3}$/;
    if (!cryptoRegex.test(crypto)) {
      toast.error("Cryptogramme invalide (3 chiffres).", {
        icon: <FaLock />,
      });
      return;
    }
    // Confirmation visuelle
    toast.success("Paiement effectué avec succès !", {
      icon: <FaCheckCircle />,
    });

    setTimeout(() => {
      payCartChild();
      setFormData({ nom: "", numero: "", date: "", crypto: "" });
    }, 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md relative"
    >
      <h2 className="text-2xl font-bold text-secondary text-center mb-6">
        Procédez au paiement
      </h2>

      <section className="flex justify-center gap-4 text-4xl text-amber-800 mb-6">
        <FaCcVisa />
        <FaCcMastercard />
      </section>

      <motion.section
        className="flex flex-col gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          { label: "Nom du titulaire", name: "nom" },
          { label: "Numéro de carte", name: "numero" },
          { label: "Date d'expiration (MM/AA)", name: "date" },
          { label: "Cryptogramme", name: "crypto" },
        ].map(({ label, name }) => (
          <motion.section
            key={name}
            className="flex justify-between items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <p className="w-1/2">{label}</p>
            <input
              name={name}
              type="text"
              value={formData[name as keyof FormData]}
              onChange={handleChange}
              className="w-1/2 border-2 border-amber-950 p-2 rounded-md"
              placeholder={
                name === "date"
                  ? "MM/AA"
                  : name === "numero"
                    ? "•••• •••• •••• ••••"
                    : ""
              }
            />
          </motion.section>
        ))}
      </motion.section>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="bg-[#CE9170] hover:bg-[#b87c5d] text-white w-full py-3 rounded-md transition"
        onClick={handleClick}
      >
        Paiement
      </motion.button>
    </motion.section>
  );
}

export default Paiement;
