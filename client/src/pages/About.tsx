import Valeurs from "../components/about/Valeurs";

function About() {
  const tableauValeurs = [
    {
      title: "1. Amitié & Passion",
      description:
        "Notre aventure a commencé entre amis, autour d’une passion commune pour les fleurs. Chaque bouquet que nous créons est une extension de cette complicité et de cette énergie positive que nous partageons.",
    },
    {
      title: "2. Créativité artisanale",
      description:
        "Chaque composition est faite à la main avec amour, soin et un brin de folie. Pas de bouquets standardisés : on mise sur l’originalité, les couleurs qui claquent et les associations qui racontent une histoire.",
    },
    {
      title: "3. Fraîcheur & qualité",
      description:
        "On sélectionne nos fleurs au quotidien, avec des fournisseurs de confiance, pour garantir des bouquets frais, durables et éclatants.",
    },
    {
      title: "4. Respect de la nature",
      description:
        "Nous privilégions des fleurs de saison et locales dès que possible, et nous limitons les emballages superflus. Parce qu’on aime la planète autant que les pivoines !",
    },
    {
      title: "5. Proximité & sincérité",
      description:
        "Nous sommes proches de nos clients comme nous le sommes entre nous : à l’écoute, bienveillants et transparents. Votre satisfaction est notre priorité, et chaque retour compte.",
    },
  ];

  return (
    <section className="bg-white">
      <section className="bg-primary mt-12 ">
        <h2 className="text-center text-secondary text-2xl font-extrabold pt-7 w-2/3 mx-auto">
          Le Jardin Alsacien
        </h2>
        <h3 className=" text-xl pt-2 text-center font-semibold w-2/3 mx-auto">
          une histoire florissante au cœur de la tradition
        </h3>
        <p className="text-center mx-auto w-[79%] pt-5 pb-6 ">
          Fondé en 1998 près de Strasbourg, Le Jardin Alsacien est une
          entreprise familiale spécialisée dans la vente de bouquets artisanaux.
          Inspirée par les traditions florales alsaciennes, elle propose des
          créations de saison réalisées à partir de fleurs locales, avec un
          souci constant de qualité et de respect de l’environnement. D’abord
          présent sur les marchés régionaux, l’atelier s’est développé avec
          l’ouverture d’une boutique en ligne, permettant la livraison de
          bouquets dans toute la France. Aujourd’hui, Le Jardin Alsacien mêle
          authenticité et modernité, en offrant aussi bien des compositions pour
          événements que des abonnements floraux.
        </p>
        <img src="./public/ImgAbout.png" alt="interieur magasin" />
      </section>

      <section>
        <h2 className=" text-2xl ml-8 font-semibold pt-8">Nos valeurs</h2>
      </section>
      <section className="mb-8">
        {tableauValeurs.map((valeur) => (
          <Valeurs
            key={valeur.title}
            title={valeur.title}
            description={valeur.description}
          />
        ))}
      </section>
    </section>
  );
}

export default About;
