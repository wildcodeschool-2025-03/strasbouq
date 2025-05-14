import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

function Merci() {
  return (
    <motion.section
      className="flex min-h-[35rem] md:pb-130 md:pt-20 flex-col items-center justify-center bg-white text-secondary text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.section
        className="bg-primary p-8 rounded-xl shadow-lg flex flex-col items-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <FaCheckCircle className="text-green-600 text-6xl mb-4" />

        <h1 className="text-3xl font-bold mb-2">Merci pour votre commande !</h1>
        <p className="text-center text-lg text-black w-full md:w-[70%] mt-4 pb-4">
          Votre paiement a été confirmé.
          <br /> Nous préparons votre commande avec soin et celle-ci pourra être
          récupérée en boutique sous 48h 🌸
        </p>
      </motion.section>
    </motion.section>
  );
}

export default Merci;
