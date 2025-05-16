import type React from "react";

interface ValeursAccueilProps {
  image: React.ReactNode;
  title: string;
  description: string;
}

function ValeursAccueil({ image, title, description }: ValeursAccueilProps) {
  return (
    <section className=" flex justify-center pt-6 md:flex-">
      <section className="flex flex-col items-center justify-center px-10">
        <div className="pt-4 md:pt-6">{image}</div>
        <h2 className="font-bold text-md pt-1 pb-2">{title}</h2>
        <p className="text-sm text-center w-38">{description}</p>
      </section>
    </section>
  );
}

export default ValeursAccueil;
