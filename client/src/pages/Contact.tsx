import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setLoading(true);

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Votre message a bien été envoyé !");
          form.current?.reset();
        },
        (error) => {
          console.log(error.text);
          toast.error("Une erreur est survenue, veuillez réessayer plus tard.");
        },
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-white py-10 px-5">
      <motion.h1
        className="text-2xl font-bold text-secondary text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Contact
      </motion.h1>

      <section className="md:flex flex-row-reverse justify-around gap-8">
        {/* Infos de contact */}
        <motion.section
          className="space-y-7 p-5 pt-0 m-5 mt-0 md:w-1/2 text-black"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="flex items-center hover:scale-105 transition-transform duration-300">
            <i className="text-3xl mr-6 bi bi-telephone-fill" />
            0900 748 885
          </p>
          <p className="flex items-center hover:scale-105 transition-transform duration-300">
            <i className="text-3xl mr-6 bi bi-geo-fill" />7 Rue des Tonneliers,
            67000 Strasbourg
          </p>
          <p className="flex items-center hover:scale-105 transition-transform duration-300">
            <i className="text-3xl mr-6 bi bi-envelope-fill" />
            contact@lejardinalsacien.fr
          </p>
          <p className="flex items-center hover:scale-105 transition-transform duration-300">
            <a href="https://www.instagram.com/">
              <i className="text-3xl mr-6 bi bi-instagram" />
            </a>
            @LeJardinAlsacien
          </p>
        </motion.section>

        {/* Formulaire */}
        <motion.section
          className="bg-primary p-8 pb-6 rounded-lg shadow-lg md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="name">
              Nom :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-[#f8f8f8] border-2 border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder="Votre nom"
            />
            <label className="font-bold" htmlFor="email">
              Email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder="Votre email"
            />
            <label className="font-bold" htmlFor="telephone">
              Téléphone :
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              placeholder="Votre téléphone"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary transition"
            />
            <label className="font-bold" htmlFor="objet">
              Objet :
            </label>
            <input
              type="text"
              id="objet"
              name="objet"
              placeholder="Objet du message"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary transition"
            />
            <label className="font-bold" htmlFor="message">
              Message :
            </label>
            <textarea
              id="message"
              name="message"
              rows={7}
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder="Votre message"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white p-3 mt-4 rounded-md font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </motion.section>
      </section>
    </section>
  );
}

export default Contact;
