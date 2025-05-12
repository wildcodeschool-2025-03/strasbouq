interface ValeursProps {
  title: string;
  description: string;
}

function Valeurs({ title, description }: ValeursProps) {
  return (
    <>
      <h2 className="text-lg ml-8 max-lg:ml-0 pt-4 font-semibold text-secondary max-lg:text-center mb-4">
        {title}
      </h2>
      <p className=" ml-8 w-[82%] pb-2 md:w-[90%] mb-4 max-lg:text-justify">
        {description}
      </p>
    </>
  );
}

export default Valeurs;
