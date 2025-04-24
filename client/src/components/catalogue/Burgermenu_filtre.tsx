import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import type React from "react";
import { useState } from "react";

const BurgerMenufiltre: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  const sections = [
    {
      title: "Prix",
      content: (
        <>
          <label className="block">
            <input type="checkbox" className="mr-2" /> ≤ à 45€
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> ≥ à 50€
          </label>
        </>
      ),
    },
    {
      title: "Tri",
      content: (
        <>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Ordre croissant
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Ordre décroissant
          </label>
        </>
      ),
    },
    {
      title: "Disponibilité",
      content: (
        <>
          <label className="block">
            <input type="radio" name="favorites" className="mr-2" /> Disponible
          </label>
          <label className="block">
            <input type="radio" name="favorites" className="mr-2" /> Non
            disponible
          </label>
        </>
      ),
    },
    {
      title: "Couleurs",
      content: (
        <>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Rouge
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Bleu
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Jaune
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Orange
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Blanche
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Violet
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Bleu
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Rose
          </label>
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
        </aside>
      )}
    </div>
  );
};

export default BurgerMenufiltre;
