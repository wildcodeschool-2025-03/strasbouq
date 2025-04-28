import { useEffect, useState } from "react";
import { getCurrentUserData } from "../components/fonctions";
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

function Panier() {
  const [panier, setPanier] = useState<Article[]>([]);

  useEffect(() => {
    const user = getCurrentUserData();
    if (!user || !user.panier || user.panier.length === 0) {
      alert("Mon panier est vide");
    } else {
      setPanier(user.panier);
    }
  }, []);

  const updatePanier = (newPanier: Article[]) => {
    setPanier(newPanier);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Récapitulatif */}
      <div className="order-1 lg:order-2 w-full lg:w-[350px] bg-[#F5ECE6] p-6 rounded-xl shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4 text-[#B67152]">
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
                (total, item) => total + item.flower.prix * item.quantity,
                0,
              )
              .toFixed(2)}{" "}
            €
          </span>
        </div>
        <button
          type="button"
          className="bg-[#CE9170] hover:bg-[#b87c5d] text-white w-full py-3 rounded-md transition"
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
            <article key={item.flower.id} className="flex gap-8">
              <ContenuPanier
                item={item}
                updatePanier={updatePanier}
                panier={panier}
              />
              <p>x{item.quantity}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Panier;
