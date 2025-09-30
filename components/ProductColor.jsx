'use client'
import React, { useState } from "react";
import FilterSectionHeader from "./ShopCategory/FilterSectionHeader";
import { useFilter } from "../Context/FilterContext";
import useProductAttributesData from "../Hooks/useProductAttributesData";

const ProductColor = () => {
  const { productColour } = useProductAttributesData();
  const { selectedColour, setSelectedColour } = useFilter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full mb-5 bg-white font-sans">
      <FilterSectionHeader title="Colour" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        {productColour.map((c) => (
          <div key={c.id || c.value.colourName} className="mt-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="colour"
                value={c.value.colourName}
                checked={selectedColour === c.value.colourName}
                onChange={(e) => setSelectedColour(e.target.value)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700">{c.value.colourName}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColor;