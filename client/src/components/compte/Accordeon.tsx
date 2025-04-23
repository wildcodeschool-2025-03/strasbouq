import AccordeonItem from "./AccordeonItem";

function Accordeon() {
  return (
    <div className="mt-4 w-[80%] ml-5 pb-4 md:w-[50%] xl:w-[33%] xl:pb-1">
      <AccordeonItem title="Mes informations">
        <p>Contenu de la section 1.</p>
      </AccordeonItem>
      <AccordeonItem title="Mes revervations en cours">
        <p>Contenu de la section 2.</p>
      </AccordeonItem>
      <AccordeonItem title="Historique de mes commandes">
        <p>Contenu de la section 3.</p>
      </AccordeonItem>
    </div>
  );
}

export default Accordeon;
