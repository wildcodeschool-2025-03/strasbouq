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
}

interface ContenuPanierProps {
  item: Article;
}

// Fonction
function ContenuPanier({ item }: ContenuPanierProps) {
  // Fonction ajouter quantité au panier
  const add = () => {
    // On récupère le panier de l'utilisateur actuel
    const listUser = localStorage.getItem("users");
    if (listUser === null) return;

    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (userConnected === null) return;

    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);
    if (!user) {
      return;
    }

    // On recherche la fleur de la BDD corresponde à celle sur laquelle on clic
    const panierItem = user.panier.find((p) => p.flower.id === item.flower.id);
    if (panierItem) {
      panierItem.quantity += 1;

      const index = users.findIndex(
        (u: Utilisateur) => u.mail === connected.mail,
      );
      if (index !== -1) {
        users[index] = user;
      }
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  // Fonction supprimer quantité au panier
  const supp = () => {
    // On récupère le panier de l'utilisateur actuel
    const listUser = localStorage.getItem("users");
    if (listUser === null) return;

    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (userConnected === null) return;

    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);
    if (!user) {
      return;
    }

    // On recherche la fleur de la BDD corresponde à celle sur laquelle on clic
    const panierItem = user.panier.find((p) => p.flower.id === item.flower.id);
    if (panierItem) {
      panierItem.quantity -= 1;

      if (panierItem.quantity <= 0) {
        user.panier = user.panier.filter((p) => p.flower.id !== item.flower.id);
      }
    }

    const index = users.findIndex(
      (u: Utilisateur) => u.mail === connected.mail,
    );
    if (index !== -1) {
      users[index] = user;
    }
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <section className="flex gap-6 mb-6 items-start">
      <img
        src={item.flower.image_url}
        alt={item.flower.nom}
        className="w-28 h-28 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-medium">{item.flower.nom}</h4>
        </div>
        <p className="text-[#B67152] font-bold">
          {item.flower.prix.toFixed(2)}€
        </p>
      </div>
      <div>
        <button type="button" onClick={add}>
          Ajouter
        </button>
        <button type="button" onClick={supp}>
          Supprimer
        </button>
      </div>
    </section>
  );
}

export default ContenuPanier;
