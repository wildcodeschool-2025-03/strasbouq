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
  quantity: number;
}

// Fonction
function ContenuPanier({
  item,
  updatePanier,
  panier,
  quantity,
}: ContenuPanierProps) {
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

      // Evenement changement nombre d'items dans le panier
      let numberOfTotalItems = 0;

      for (const article of user.panier) {
        numberOfTotalItems += article.quantity;
      }

      const event = new CustomEvent("panierUpdated", {
        detail: numberOfTotalItems,
      });
      window.dispatchEvent(event);
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

      // Evenement changement nombre d'items dans le panier
      let numberOfTotalItems = 0;

      for (const article of user.panier) {
        numberOfTotalItems += article.quantity;
      }

      const event = new CustomEvent("panierUpdated", {
        detail: numberOfTotalItems,
      });
      window.dispatchEvent(event);
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
          <h4 className="text-lg font-medium min-w-[10rem] md:min-w-[18rem]">
            {item.flower.nom}
          </h4>
        </div>
        <p className="text-[#B67152] font-bold">
          {item.flower.prix.toFixed(2)}€
        </p>
        <p>x {quantity}</p>
      </div>
      <div className="flex flex-col flex-start">
        <button type="button" onClick={add}>
          <i className="bi bi-plus-circle text-2xl" />
        </button>
        <button type="button" onClick={supp}>
          <i className="bi bi-dash-circle text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default ContenuPanier;
