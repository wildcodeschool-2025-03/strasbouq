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
  updatePanier: (newPanier: Article[]) => void;
  panier: Article[];
}

// Fonction
function ContenuPanier({ item, updatePanier, panier }: ContenuPanierProps) {
  const add = () => {
    const listUser = localStorage.getItem("users");
    if (listUser === null) return;

    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (userConnected === null) return;

    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);
    if (!user) return;

    const panierItem = user.panier.find((p) => p.flower.id === item.flower.id);
    if (panierItem) {
      panierItem.quantity += 1;
      localStorage.setItem("users", JSON.stringify(users));

      const newPanier = panier.map((p) =>
        p.flower.id === item.flower.id ? { ...p, quantity: p.quantity + 1 } : p,
      );
      updatePanier(newPanier);
    }
  };

  const supp = () => {
    const listUser = localStorage.getItem("users");
    if (listUser === null) return;

    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (userConnected === null) return;

    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);
    if (!user) return;

    const panierItem = user.panier.find((p) => p.flower.id === item.flower.id);
    if (panierItem) {
      panierItem.quantity -= 1;
      if (panierItem.quantity <= 0) {
        user.panier = user.panier.filter((p) => p.flower.id !== item.flower.id);
      }
      localStorage.setItem("users", JSON.stringify(users));

      const newPanier = panier
        .map((p) =>
          p.flower.id === item.flower.id
            ? { ...p, quantity: p.quantity - 1 }
            : p,
        )
        .filter((p) => p.quantity > 0);

      updatePanier(newPanier);
    }
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
