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
  // Accepter une réservation de bouquets
  const acceptBooking = () => {
    // On récupère le compte utilisateur de la BDD correspondant au user passé en props
    const usersData = localStorage.getItem("users");
    if (usersData === null) {
      return;
    }

    const users = JSON.parse(usersData);
    const userCommand = users?.find((u: Utilisateur) => u.mail === user.mail);

    // On passe l'article en question en validation et on l'enlève du panier
    if (!userCommand.validated) {
      userCommand.validated = [];
    }

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
  };

  // Refuser une réservation de bouquets
  const refusedBooking = () => {
    // On récupère le compte utilisateur de la BDD correspondant au user passé en props
    const usersData = localStorage.getItem("users");
    if (usersData === null) {
      return;
    }

    const users = JSON.parse(usersData);
    const userCommand = users?.find((u: Utilisateur) => u.mail === user.mail);

    // On passe l'article en question en validation et on l'enlève du panier
    if (!userCommand.refused) {
      userCommand.refused = [];
    }

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
  };

  return (
    <>
      <section className="flex-col justify-items-left bg-[#EADED5] rounded-md relative px-5 pt-60 pb-10 w-[90%] mx-auto overflow-visible mt-12">
        <article>
          <img
            className="absolute top-[-50px] left-[0px]"
            src={article.flower.image_url}
            alt={article.flower.nom}
          />
          <h3 className="font-bold pb-3">{article.flower.nom}</h3>
          <p className="pb-3">{article.flower.description}</p>
          <p className="">Quantité commandée : {article.quantity}</p>
          <aside className="pb-3 font-bold">{article.flower.prix} €</aside>
          <button
            className="font-bold text-green-500"
            type="button"
            onClick={acceptBooking}
          >
            Valider réservation
          </button>
          <button
            className="font-bold text-red-500"
            type="button"
            onClick={refusedBooking}
          >
            Refuser réservation
          </button>
        </article>
      </section>
    </>
  );
}

export default Contenu_administration;
