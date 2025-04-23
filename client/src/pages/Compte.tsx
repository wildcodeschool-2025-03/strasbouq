import Accordeon from "../components/compte/Accordeon";

function Compte() {
  return (
    <>
      <section className="bg-primary mt-10">
        <h2 className="ml-5 pt-5 text-2xl font-bold">Bonjour Nom Prenom</h2>
        <hr className="ml-5 mt-5 h-px border-t-0 bg-black w-[80%]" />
        <Accordeon />
      </section>
    </>
  );
}

export default Compte;
