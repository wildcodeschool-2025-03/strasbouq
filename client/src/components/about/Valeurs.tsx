interface ValeursProps {
  title: string;
  description: string;
}

function Valeurs({ title, description }: ValeursProps) {
  return (
    <>
      <h2 className="text-lg ml-8 pt-4 font-semibold text-secondary">
        {title}
      </h2>
      <p className=" ml-8 w-[82%] pb-2 md:w-[90%]">{description}</p>
    </>
  );
}

export default Valeurs;
