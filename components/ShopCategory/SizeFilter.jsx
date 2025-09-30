'use client'
import React, { useState } from "react";
import FilterSectionHeader from "./FilterSectionHeader";
import { useFilter } from "../../Context/FilterContext";
import useProductAttributesData from "../../Hooks/useProductAttributesData";

const SizeFilter = () => {
  const { productSize } = useProductAttributesData();
  const { selectedSize, setSelectedSize } = useFilter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full mb-5 bg-white font-sans">
      <FilterSectionHeader title="Size" isOpen={isOpen} toggleOpen={toggleOpen} />
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        {productSize.map((size) => (
          <div key={size.id || size.value} className="mt-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="size"
                value={size.value}
                checked={selectedSize === size.value}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700 uppercase">{size.value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;