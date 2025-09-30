'use client'
import React, { useState } from "react";

import FilterSectionHeader from "./ShopCategory/FilterSectionHeader";
import { useFilter } from "../Context/FilterContext";
import useProductAttributesData from "../Hooks/useProductAttributesData";

const ProductFit = () => {
  const { productFit } = useProductAttributesData();
  const { selectedFit, setSelectedFit } = useFilter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full mb-5 bg-white font-sans">
      <FilterSectionHeader title="Fit" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        {productFit.map((f) => (
          <div key={f.id || f.value} className="mt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="fit"
                value={f.value}
                checked={selectedFit === f.value}
                onChange={(e) => setSelectedFit(e.target.value)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700 uppercase">{f.value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFit;