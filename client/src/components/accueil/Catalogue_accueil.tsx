import { useState } from "react";

function Catalogue_accueil() {
  const [carousel, setCarousel] = useState(1);

  function setNextR() {
    setCarousel((prev) => (prev >= 3 ? 1 : prev + 1));
  }

  function setNextL() {
    setCarousel((prev) => (prev === 1 ? 3 : prev - 1));
  }

  return (
    <>
      <p className="">Réservez toutes vos fleurs, depuis chez vous.</p>
      <div>
        {carousel === 1 && <p>1</p>}
        {carousel === 2 && <p>2</p>}
        {carousel === 3 && <p>3</p>}
        <button type="button" onClick={setNextL}>
          <i className="bi bi-caret-left" />
        </button>
        <button type="button" onClick={setNextR}>
          <i className="bi bi-caret-right" />
        </button>
      </div>
    </>
  );
}

export default Catalogue_accueil;
