import { useState } from "react";
import { toast } from "react-toastify";

interface itemsContenu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  image_url: string;
}

interface ContenuProps {
  item: itemsContenu;
}

interface Article {
  flower: itemsContenu;
  quantity: number;
}

interface Utilisateur {
  mail: string;
  panier: Article[];
}

function Contenu({ item }: ContenuProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Fonction ajout au panier----------------------------------------
  const panier = () => {
    // Récupère les datas de la personne connectée
    const storedData = localStorage.getItem("users");
    if (storedData === null) {
      toast.error("Aucun compte existant");
      return;
    }

    const users: Utilisateur[] = JSON.parse(storedData);

    const userStoredData = sessionStorage.getItem("currentUser");
    if (userStoredData === null) {
      toast.error("veuillez vous connecter");
      return;
    }
    const userConnected = JSON.parse(userStoredData);
    const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);

    if (!user) {
      toast.error("Utilisateur non trouvé");
      return;
    }

    if (user && !user.panier) {
      user.panier = [];
    }

    // Cherche si l'article est déjà dans le panier
    const article = user.panier.find(
      (article: Article) => article.flower.id === item.id,
    );

    // Incrémente juste la quantité si c'est le cas
    if (article) {
      article.quantity += 1;
      toast.success(
        `Quantité mise à jour : ${article.quantity} exemplaire(s) de "${item.nom}" dans le panier.`,
      );
    }

    // Si l'article n'existe pas, ou si le panier lui-même n'existe pas
    else {
      user.panier.push({ flower: item, quantity: 1 });
      toast.success(
        `Votre premier exemplaire de "${item.nom}" a été ajouté au panier !`,
      );
    }

    // On enregistre le nouveau panier dans la base utilisateur
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
  };

  return (
    <section className="flex flex-col justify-between bg-[#EADED5] w-[300px] lg:w-auto min-h-140 rounded-md relative px-5 pt-70 pb-10 mx-auto overflow-visible shadow-lg">
      <img
        className="absolute top-[-50px] left-[0px] w-full h-auto z-0 rounded-lg transition-all duration-300 hover:scale-110"
        src={item.image_url}
        alt={item.nom}
      />
      <h3 className="font-bold pb-3">{item.nom}</h3>
      <p className="pb-3">{item.description}</p>
      <aside className="pb-3 font-bold">{item.prix} €</aside>
      <section className="flex flex-row justify-between mt-auto">
        <button
          className="cursor-pointer ml-2"
          type="button"
          onClick={handleClick}
        >
          {!isFavorite ? (
            <i className="bi bi-heart-fill text-black text-2xl" />
          ) : (
            <i className="bi bi-heart-fill text-red-500 text-2xl" />
          )}
        </button>
        <button
          className="bg-[#CE9170] rounded-4xl p-2 px-4 font-bold text-white transition-transform transform-gpu active:focus:outline-2 focus:outline-offset-2 focus:outline-[#ce9170] active:bg-[#eaded5] active:text-black cursor-pointer"
          type="button"
          onClick={panier}
        >
          Ajouter <i className="bi bi-cart-plus text-2xl align-[-0.15rem]" />
        </button>
      </section>
    </section>
  );
}

export default Contenu;
