import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
    <section className="bg-white">
      <h1 className="text-center text-secondary m-4 text-3xl p-5">Contact</h1>
      <section className="md:flex items-center flex-row-reverse justify-around ">
        <section className="space-y-7 p-5 m-5 md:w-1/2 md:space-y-20 md:none-text-center md:flex flex-col md:algn-items-center">
          <p>
            <i className="text-4xl mr-2 bi bi-telephone-fill" />
            09 748 885
          </p>
          <p>
            <i className="text-4xl mr-2 bi bi-geo-fill" />7 Rue des Tonneliers
            67000 Strasbourg
          </p>
          <p>
            <i className="text-4xl mr-2 bi bi-envelope-fill" />
            contact@lejardinalsacien.com
          </p>
          <p>
            <a href="https://www.instagram.com/">
              <i className="text-4xl mr-2 bi bi-instagram" />
            </a>
            @LeJardienAlsacien
          </p>
        </section>

        <section className="p-5 m-7 bg-primary rounded-md md:w-1/2 ">
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-2">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2"
            />
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2"
            />
            <label htmlFor="telephone">Téléphone :</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2"
            />
            <label htmlFor="objet">Objet :</label>
            <input
              type="text"
              id="objet"
              name="objet"
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2"
            />
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              rows={7}
              className="bg-[#f8f8f8] border-2 border-secondary rounded-md p-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary p-2 rounded-md hover:opacity-90 "
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </section>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}

export default Contact;
