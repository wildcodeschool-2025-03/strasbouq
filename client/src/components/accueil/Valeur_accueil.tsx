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
        <div>{image}</div>
        <h2 className="font-bold text-md">{title}</h2>
        <p className="text-sm text-center w-38">{description}</p>
      </section>
    </section>
  );
}

export default ValeursAccueil;
