import { useState } from "react";

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
      alert("Aucun compte existant");
      return;
    }

    const users: Utilisateur[] = JSON.parse(storedData);

    const userStoredData = sessionStorage.getItem("currentUser");
    if (userStoredData === null) {
      alert("veuillez vous connecter");
      return;
    }
    const userConnected = JSON.parse(userStoredData);
    const user = users.find((u: Utilisateur) => u.mail === userConnected.mail);

    if (!user) {
      alert("Utilisateur non trouvé");
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
      alert(
        `Quantité mise à jour : ${article.quantity} exemplaire(s) de "${item.nom}" dans le panier.`,
      );
    }

    // Si l'article n'existe pas, ou si le panier lui-même n'existe pas
    else {
      user.panier.push({ flower: item, quantity: 1 });
      alert(
        `Votre premier exemplaire de "${item.nom}" a été ajouté au panier !`,
      );
    }

    // On enregistre le nouveau panier dans la base utilisateur
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <section className="flex-col justify-items-left bg-[#EADED5] rounded-md relative px-5 pt-70 pb-10 w-[300px] mx-auto overflow-visible">
      <img
        className="absolute top-[-50px] left-[0px]"
        src={item.image_url}
        alt={item.nom}
      />
      <h3 className="font-bold pb-3">{item.nom}</h3>
      <p className="pb-3">{item.description}</p>
      <aside className="pb-3 font-bold">{item.prix} €</aside>
      <section className="flex flex-row justify-between">
        <button type="button" onClick={handleClick}>
          {!isFavorite ? "🖤" : "❤️"}
        </button>
        <button
          className="bg-[#CE9170] rounded-4xl p-2 pr-4 pl-4 font-bold"
          type="button"
          onClick={panier}
        >
          Ajouter au panier
        </button>
      </section>
    </section>
  );
}

export default Contenu;
