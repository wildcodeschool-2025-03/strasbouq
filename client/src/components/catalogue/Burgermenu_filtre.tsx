import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface Props {
  setColor: (value: string) => void;
  setDisponibilite: (value: boolean | null) => void;
  setOrder: (value: boolean) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

const BurgerMenufiltre = ({
  setColor,
  setDisponibilite,
  setOrder,
  setMinPrice,
  setMaxPrice,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  const handlePriceCategoryChange = (event: string) => {
    if (event === "low") {
      setMinPrice(0);
      setMaxPrice(45);
    } else if (event === "high") {
      setMinPrice(46);
      setMaxPrice(100);
    } else {
      setMinPrice(0);
      setMaxPrice(100);
    }
  };

  const handleResetFilters = () => {
    setColor("");
    setDisponibilite(null);
    setOrder(false);
    setMinPrice(0);
    setMaxPrice(100);
  };

  const sections = [
    { 
      title: "Prix",
      content: (
        <>
        <label className="block">
  <input
    type="radio"
    name="price"
    className="mr-2"
    onChange={(e) => handlePriceCategoryChange(e.target.value)}
  />
  Tout afficher
</label>
          <label className="block">
            <input 
              type="radio" 
              name="price" 
              className="mr-2"
              value="low"
              onChange={(e) => handlePriceCategoryChange(e.target.value)} 
            /> 
            ≤ 45€
          </label>
          <label className="block">
            <input 
              type="radio" 
              name="price" 
              className="mr-2"
              value="high"
              onChange={(e) => handlePriceCategoryChange(e.target.value)}
            /> 
            ≥ 50€
          </label>
        </>
      ),
    },
    {
      title: "Tri",
      content: (
        <>
          <label className="block">
            <input
              type="radio"
              name="order"
              className="mr-2"
              onChange={() => setOrder(true)}
            />
            Ordre croissant
          </label>
          <label className="block">
            <input
              type="radio"
              name="order"
              className="mr-2"
              onChange={() => setOrder(false)}
            />
            Ordre décroissant
          </label>
        </>
      ),
    },
    {
      title: "Disponibilité",
      content: (
        <>
        <label className="block">
  <input
    type="radio"
    name="dispo"
    className="mr-2"
    onChange={() => setDisponibilite(null)} 
  />
  Tout afficher
</label>
          <label className="block">
  <input
    type="radio"
    name="dispo"
    className="mr-2"
    onChange={() => setDisponibilite(true)}
  />
  Disponible
</label>
<label className="block">
  <input
    type="radio"
    name="dispo"
    className="mr-2"
    onChange={() => setDisponibilite(false)}
  />
  Non disponible
</label>
        </>
      ),
    },
    {
      title: "Couleurs",
      content: (
        <>
          {["Rouge", "Bleu", "Jaune", "Orange", "Blanc", "Violet", "Rose"].map((color) => (
               <label key={color} className="block capitalize">
               <input
                 type="checkbox"
                 name="color"
                 className="mr-2"
                 onChange={(e) => {
                   if (e.target.checked) {
                     setColor(color.toLowerCase());
                   } else {
                     setColor("");
                   }
                 }}
               />
               {color}
             </label>
            
          ))}
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2  rounded-md flex items-center gap-2 "
      >
        <h2 className="text-lg font-bold mb-4 ml-7 mt-2 flex items-center gap-x-3">
          Filtrer <SlidersHorizontal color="#000000" strokeWidth={1.5} />
        </h2>
      </button>

      {isMenuOpen && (
        <aside className="absolute top-12 left-0 z-50 w-72 p-4 bg-white rounded-xl shadow-lg">
          {sections.map(({ title, content }) => (
            <div key={title} className="py-2 w-full">
              <button
                type="button"
                onClick={() => toggleSection(title)}
                className="w-full flex items-center justify-between text-left font-medium text-gray-800 hover:text-black"
              >
                {title}
                {openSection === title ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openSection === title && (
                <div className="mt-2 ml-2 space-y-1">{content}</div>
              )}
            </div>
          ))}
          <button
  type="button"
  onClick={() => handleResetFilters()}
  className="w-full text-center py-2 mt-4 bg-secondary rounded-4xl font-semibold"
>
  Réinitialiser tous les filtres
</button>
        </aside>
      )}
    </div>
  );
};

export default BurgerMenufiltre;
