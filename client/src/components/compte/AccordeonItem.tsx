import { useState } from "react";

interface AccordeonItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordeonItem = ({ title, children }: AccordeonItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" py-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center w-full text-left font-medium text-lg"
      >
        <span className="font-semibold pl-4 text-secondary">{title}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-9999 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 text-sm">{children}</div>
      </div>
    </div>
  );
};

export default AccordeonItem;
