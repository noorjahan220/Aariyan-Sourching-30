'use client'
import React, { useState } from "react";
import FilterSectionHeader from "./FilterSectionHeader";
import { useFilter } from "../../Context/FilterContext";
import useProductAttributesData from "../../Hooks/useProductAttributesData";

const Brand = () => {
  // Brand data আসছে custom hook থেকে
  const { productBrand } = useProductAttributesData();

  // Filter context থেকে brand state
  const { selectedBrand, setSelectedBrand } = useFilter();

  // Collapse/Expand toggle state
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full mb-5 bg-white font-sans">
      {/* Header */}
      <FilterSectionHeader title="Brand" isOpen={isOpen} toggleOpen={toggleOpen} />

      {/* Brand options */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        {productBrand && productBrand.length > 0 ? (
          productBrand.map((brand, index) => (
            <div key={brand.id || index} className="mt-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  value={brand.value}
                  checked={selectedBrand === brand.value}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="ml-3 text-sm text-gray-700 uppercase">
                  {brand.label || brand.value}
                </span>
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic mt-2 ml-1">No brands available</p>
        )}
      </div>
    </div>
  );
};

export default Brand;
