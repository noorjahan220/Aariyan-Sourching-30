import React, { useState } from "react";
import FilterSectionHeader from "./ShopCategory/FilterSectionHeader";
import { useFilter } from "../Context/FilterContext";

const sustainabilityOptions = [
  { id: "eco-friendly", label: "eco friendly" },
  { id: "recycled", label: "recycled" },
  { id: "standard", label: "standard" },
];

const ProductSustainability = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedSustainability, setSelectedSustainability } = useFilter(); 

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionChange = (event) => {
    setSelectedSustainability(event.target.value); 
  };

  return (
    <div className="w-full mb-5 bg-white font-sans">
      <FilterSectionHeader title="Sustainability" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-48 mt-4" : "max-h-0"}`}>
        {sustainabilityOptions.map((option) => (
          <div key={option.id} className="mt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"               
                name="sustainability"      
                value={option.id}        
                checked={selectedSustainability === option.id}
                onChange={handleOptionChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 uppercase">{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSustainability;