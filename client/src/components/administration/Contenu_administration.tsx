import { useState } from "react";

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

interface ContenuAdministrationProps {
  article: Article;
  user: Utilisateur;
  updateClient: (updatedUser: Utilisateur) => void;
}

interface Utilisateur {
  mail: string;
  reservation: Article[];
  validated: Article[];
  refused: Article[];
}

function Contenu_administration({
  article,
  user,
  updateClient,
}: ContenuAdministrationProps) {
  const [isFading, setIsFading] = useState(false);

  const acceptBooking = () => {
    setIsFading(true);

    setTimeout(() => {
      const usersData = localStorage.getItem("users");
      if (usersData === null) return;

      const users = JSON.parse(usersData);
      const userCommand = users.find((u: Utilisateur) => u.mail === user.mail);

      if (!userCommand?.validated) userCommand.validated = [];

      if (
        userCommand.reservation.some(
          (p: Article) => p.flower.id === article.flower.id,
        )
      ) {
        userCommand.validated.push(article);
      }

      userCommand.reservation = userCommand.reservation.filter(
        (p: Article) => p.flower.id !== article.flower.id,
      );

      localStorage.setItem("users", JSON.stringify(users));
      updateClient(userCommand);
    }, 500);
  };

  const refusedBooking = () => {
    setIsFading(true);

    setTimeout(() => {
      const usersData = localStorage.getItem("users");
      if (usersData === null) return;

      const users = JSON.parse(usersData);
      const userCommand = users.find((u: Utilisateur) => u.mail === user.mail);

      if (!userCommand?.refused) userCommand.refused = [];

      if (
        userCommand.reservation.some(
          (p: Article) => p.flower.id === article.flower.id,
        )
      ) {
        userCommand.refused.push(article);
      }

      userCommand.reservation = userCommand.reservation.filter(
        (p: Article) => p.flower.id !== article.flower.id,
      );

      localStorage.setItem("users", JSON.stringify(users));
      updateClient(userCommand);
    }, 500);
  };

  return (
    <section
      className={`${
        isFading ? "opacity-0" : "opacity-100"
      } transition-opacity duration-500 flex-col justify-items-left bg-primary rounded-md relative px-8 w-[90%] mx-auto overflow-visible mt-8`}
    >
      <article className="bg-primary">
        <h3 className="font-bold pb-3">{article.flower.nom}</h3>
        <p className="">Quantité commandée : {article.quantity}</p>
        <aside className="pb-3 font-bold">{article.flower.prix} €</aside>
        <button
          className="font-bold mr-4 cursor-pointer"
          type="button"
          onClick={acceptBooking}
        >
          Valider réservation{" "}
          <i className="bi bi-check-circle text-green-500 " />
        </button>
        <button
          className="font-bold cursor-pointer"
          type="button"
          onClick={refusedBooking}
        >
          Refuser réservation <i className="bi bi-x-circle text-red-500" />
        </button>
      </article>
    </section>
  );
}

export default Contenu_administration;
