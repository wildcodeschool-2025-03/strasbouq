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
      <section className="bg-primary">
        <h2 className="text-center text-2xl font-semibold pt-4">
          Histoire de l'entreprise
        </h2>
        <p className="text-center mx-auto w-[80%] pt-3 pb-5 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, natus
          quibusdam. Reprehenderit, deleniti quia? Excepturi eum tempore alias
          pariatur delectus repudiandae impedit repellat earum, ad, dignissimos
          velit possimus facere quam maxime minima, voluptates vel deserunt
          distinctio cum quod illum laudantium eligendi iste odio. Quo optio
          adipisci eum et quae fuga fugiat mollitia architecto odio ab. Ex
          nostrum magnam perferendis magni!
        </p>
        <img src="./public/ImgAbout.png" alt="interieur magasin" />
      </section>

      <section>
        <h2 className=" text-2xl ml-8 font-semibold pt-8">Nos valeurs</h2>
      </section>
      <section>
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
