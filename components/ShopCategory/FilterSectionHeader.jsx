'use client'
import React from "react";
import { IoChevronUp } from "react-icons/io5";

const FilterSectionHeader = ({ title, isOpen, toggleOpen }) => {
  return (
    <div className="mb-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wide uppercase">
          {title}
        </h3>
        <button onClick={toggleOpen}>
          <IoChevronUp
            className={`h-4 w-4 text-gray-700 transform transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Underline */}
      <div className="mt-2 mb-4 relative">
        <div className="absolute top-0 w-full h-0.5 bg-gray-100"></div>
        <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
      </div>
    </div>
  );
};

export default FilterSectionHeader;
