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
}

function Contenu_administration({ article }: ContenuAdministrationProps) {
  return (
    <section className="flex-col justify-items-left bg-[#EADED5] rounded-md relative px-5 pt-[70px] pb-10 w-[300px] mx-auto overflow-visible">
      <img
        className="absolute top-[-50px] left-[0px]"
        src={article.flower.image_url}
        alt={article.flower.nom}
      />
      <h3 className="font-bold pb-3">{article.flower.nom}</h3>
      <p className="pb-3">{article.flower.description}</p>
      <p>Quantité commandée : {article.quantity}</p>
      <aside className="pb-3 font-bold">{article.flower.prix} €</aside>
    </section>
  );
}

export default Contenu_administration;
