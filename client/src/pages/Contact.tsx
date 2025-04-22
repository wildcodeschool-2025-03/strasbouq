import { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_f6pnqxa",
        "wildeats",
        form.current,
        "OE9-cl3x3ZPw4LHSZ",
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Votre message a bien été envoyé !");
        },
        (error) => {
          console.log(error.text);
          alert("Une erreur est survenue, veuillez réessayer plus tard.");
        },
      );

    form.current.reset();
  };

  return (
    <>
      <h1 className="text-center text-secondary m-6 text-4xl">Contact</h1>
      <section className="md:flex items-center flex-row-reverse justify-around ">
        <section className="space-y-4 mb-6 text-center ">
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
            <button type="submit" className="bg-secondary p-2 rounded-md">
              Envoyer
            </button>
          </form>
        </section>
      </section>
    </>
  );
}

export default Contact;
