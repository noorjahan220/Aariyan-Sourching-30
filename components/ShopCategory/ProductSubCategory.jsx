'use client'
import React, { useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import useProductAttributesData from "../../Hooks/useProductAttributesData";


const ProductSubCategory = () => {
  const {

    productSubCategory,
    refetch,
    isLoading,
  } = useProductAttributesData();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("all");

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  return (
    <div className="w-full mb-5 bg-white font-sans">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide uppercase">
            Sub Category
          </h3>
          <button onClick={toggleOpen}>
            <IoChevronUp
              className={`h-4 w-4 text-gray-700 transform transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
        <div className="mt-2 mb-4 relative">
          <div className="absolute top-0 w-full h-0.5 bg-gray-100"></div>
          <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        {productSubCategory.map((option) => (
          <div key={option.id} className="mb-3 mt-1">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="product-type"
                value={option.value}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700">
                {option.value}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSubCategory;