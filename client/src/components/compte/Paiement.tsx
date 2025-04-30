function Paiement({ payCartChild }: { payCartChild: () => void }) {
  // State pour gérer les inputs de manière robuste

  return (
    <>
      <h2 className="text-2xl font-bold text-secondary text-center mb-8">
        Procédez au paiement
      </h2>

      <section className="flex flex-col mb-8">
        <section className="flex justify-between">
          <p>Nom du titulaire</p>
          <input type="text" className="border-2 border-amber-950" />
        </section>

        <section className="flex flex-col mb-8">
          <section className="flex justify-between">
            <p>Numéro de carte</p>
            <input type="text" className="border-2 border-amber-950" />
          </section>

          <section className="flex justify-between">
            <p>Date d'expiration</p>
            <input type="text" className="border-2 border-amber-950" />
          </section>
        </section>

        <section className="flex justify-between">
          <p>Cryptogramme (3 derniers chiffres)</p>
          <input type="text" className="border-2 border-amber-950" />
        </section>
      </section>

      <button
        type="button"
        className="bg-[#CE9170] hover:bg-[#b87c5d] text-white w-full py-3 rounded-md transition"
        onClick={payCartChild}
      >
        Paiement
      </button>
    </>
  );
}

export default Paiement;
