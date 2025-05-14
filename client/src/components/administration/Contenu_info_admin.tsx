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

function Contenu_info_admin({ article }: ContenuAdministrationProps) {
  return (
    <>
      <section className="flex-col justify-items-left bg-[#EADED5] rounded-md relative px-5 pb-10 w-[90%] mx-auto overflow-visible mt-12">
        <article>
          <h3 className="font-bold pb-3">{article.flower.nom}</h3>
          <p className="font-light pb-3">{article.flower.description}</p>
          <p className="font-light">Quantité commandée : {article.quantity}</p>
          <aside className="pb-3 font-light">{article.flower.prix} €</aside>
        </article>
      </section>
    </>
  );
}

export default Contenu_info_admin;
