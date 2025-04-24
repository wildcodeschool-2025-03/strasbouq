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
// Fonction
function ContenuPanier({ item }: ContenuProps) {
  return (
    <section className="flex gap-6 mb-6 items-start">
      <img
        src={item.image_url}
        alt={item.nom}
        className="w-28 h-28 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-medium">{item.nom}</h4>
        </div>
        <p className="text-[#B67152] font-bold">{item.prix.toFixed(2)}€</p>
      </div>
    </section>
  );
}

export default ContenuPanier;
