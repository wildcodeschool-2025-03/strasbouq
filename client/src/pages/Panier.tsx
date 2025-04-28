import { useEffect, useState } from "react";
import ContenuPanier from "../components/panier/Contenue_panier";

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
  panier: Article[] | null; // 🔥 ici maintenant Utilisateur.panier contient des Article !
}

function Panier() {
  const [panier, setPanier] = useState<Article[]>([]); // 🔥 ici on utilise Article[]

  useEffect(() => {
    const listUser = localStorage.getItem("users");
    if (!listUser) {
      alert("Veuillez vous connecter");
      return;
    }

    const users: Utilisateur[] = JSON.parse(listUser);

    const userConnected = sessionStorage.getItem("currentUser");
    if (!userConnected) {
      alert("Veuillez vous connecter");
      return;
    }

    const connected = JSON.parse(userConnected);

    const user = users.find((u) => u.mail === connected.mail);

    if (!user || !user.panier || user.panier.length === 0) {
      alert("Mon panier est vide");
    } else {
      setPanier(user.panier);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Récapitulatif  */}
      <div className="order-1 lg:order-2 w-full lg:w-[350px] bg-primary p-6 rounded-xl shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Récapitulatif
        </h3>
        <div className="flex justify-between mb-2 text-sm">
          <span>Code promo</span>
          <span className="font-mono bg-white px-2 py-1 rounded border border-gray-300">
            WILD20
          </span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>TOTAL</span>
          <span>
            {panier
              .reduce(
                (total, article) =>
                  total + article.flower.prix * article.quantity,
                0,
              )
              .toFixed(2)}{" "}
            €
          </span>
        </div>
        <button
          type="button"
          className="bg-secondary hover:bg-[#b87c5d] text-white w-full py-3 rounded-md transition"
        >
          Paiement
        </button>
      </div>

      {/* Mon panier */}
      <div className="order-2 lg:order-1 flex-1">
        <h2 className="text-2xl font-bold mb-8 text-[#B67152]">Mon panier</h2>
        {panier.length === 0 ? (
          <p className="text-center text-gray-600">Votre panier est vide.</p>
        ) : (
          panier.map((item) => (
            <ContenuPanier key={item.flower.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default Panier;
