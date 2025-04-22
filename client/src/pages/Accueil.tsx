import { Handshake, Heart, Leaf, Lightbulb, ShieldCheck } from "lucide-react";
import ValeursAccueil from "../components/accueil/Valeur_accueil";

function Accueil() {
  const tableauValeurs = [
    {
      image: <Handshake size={55} color="#000000" strokeWidth={1.5} />,
      title: "Amitié & Passion",
      description: "Une aventure qui a commencé entre amis.",
    },
    {
      image: <Lightbulb size={55} color="#000000" strokeWidth={1.5} />,
      title: "Créativité artisanale",
      description: "Chaque composition est faite à la main.",
    },
    {
      image: <Leaf size={55} color="#000000" strokeWidth={1.5} />,
      title: "Respect de la nature",
      description: "On aime la planète autant que les pivoines.",
    },
    {
      image: <ShieldCheck size={55} color="#000000" strokeWidth={1.5} />,
      title: "Fraîcheur & qualité",
      description: "Chaque composition est faite à la main.",
    },
    {
      image: <Heart size={55} color="#000000" strokeWidth={1.5} />,
      title: "Proximité & sincérité",
      description: "Votre satisfaction est notre priorité.",
    },
  ];
  return (
    <section className="bg-primary">
      <h2 className="text-secondary text-center text-2xl font-bold pt-7 pb-4 w-70 mx-auto md:w-full xl:pb-0 ">
        Le Jardin Alsacien, comment ça marche ?
      </h2>

      <section className="xl:flex xl:py-10 xl:justify-center gap-x-6">
        <div className="flex justify-center items-center py-5">
          <h3 className=" bg-secondary text-center text-4xl text-white w-[50px] h-[50px] rounded-full pt-1  ">
            1
          </h3>
          <p className="text-sm w-2/3 pl-4 md:w-90 xl:w-60">
            Vous sélectionnez parmis un large choix de bouquets, les
            compositions que vous désirez.
          </p>
        </div>
        <div className="flex justify-center items-center py-5 ">
          <h3 className=" bg-secondary text-center text-4xl text-white w-[50px] h-[50px] rounded-full pt-1  ">
            2
          </h3>
          <p className="text-sm w-2/3 pl-4 md:w-90 xl:w-60">
            La demande de réservation est immédiatement transmise à notre
            préparateur en boutique.
          </p>
        </div>
        <div className="flex justify-center items-center py-5 ">
          <h3 className=" bg-secondary text-center text-4xl text-white w-[50px] h-[50px] rounded-full pt-1  ">
            3
          </h3>
          <p className="text-sm w-2/3 pl-4 md:w-90 xl:w-60">
            Vous venez récupérer directement les bouquets dans notre boutique.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <h2 className="text-secondary text-center text-2xl font-bold pt-7">
          Nos valeurs
        </h2>

        <div className="pb-7 md:pt-2 md:flex flex-wrap md:px-5 md:justify-center">
          {tableauValeurs.map((valeur) => (
            <ValeursAccueil
              key={valeur.title}
              image={valeur.image}
              title={valeur.title}
              description={valeur.description}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Accueil;
