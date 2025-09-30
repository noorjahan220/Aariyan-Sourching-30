// Components/Gender.js

import React, { useState, useMemo } from "react";
import { IoChevronUp } from "react-icons/io5";
import { useFilter } from "../Context/FilterContext";
import useAllProducts from "../Hooks/useAllProducts";

const ChevronIcon = ({ isOpen }) => (
  <IoChevronUp
    className={`h-4 w-4 text-gray-700 transform transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
);

const Gender = () => {
  const [allProducts] = useAllProducts();
  const [openGender, setOpenGender] = useState(null);
  const { selectedSize, setSelectedSize, selectedGender, setSelectedGender } =
    useFilter();

  const staticGenders = ["Male", "Female", "Unisex"];

  const dynamicGenderData = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return staticGenders.map((gender) => ({ gender, sizes: [] }));
    }

    const sizeMap = {
      Male: new Set(),
      Female: new Set(),
      Unisex: new Set(),
    };

    allProducts.forEach((product) => {
      if (product.genderSizing && Array.isArray(product.genderSizing)) {
        product.genderSizing.forEach((sizingInfo) => {
          if (sizeMap[sizingInfo.gender] && Array.isArray(sizingInfo.sizes)) {
            sizingInfo.sizes.forEach((size) =>
              sizeMap[sizingInfo.gender].add(size)
            );
          }
        });
      }
    });

    return staticGenders.map((gender) => ({
      gender: gender,
      sizes: Array.from(sizeMap[gender]).sort(),
    }));
  }, [allProducts]);

  const handleGenderToggle = (genderName) => {
    setOpenGender(openGender === genderName ? null : genderName);
  };

  const handleSizeSelect = (size, gender) => {
    if (selectedSize === size && selectedGender === gender) {
      setSelectedSize(null);
      setSelectedGender(null);
    } else {
      setSelectedSize(size);
      setSelectedGender(gender);
    }
  };

  return (
    <div className="w-full bg-white mb-10 font-sans text-gray-800">
      <h3 className="text-sm font-bold tracking-wide uppercase">
        Size by Gender
      </h3>
      <div className="my-2 relative">
        <div className="absolute top-0 w-full h-0.5 bg-gray-100"></div>
        <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
      </div>

      <div>
        {dynamicGenderData.map((item) => {
          const isOpen = openGender === item.gender;
          if (item.sizes.length === 0) {
            return null;
          }
          return (
            <div key={item.gender}>
              <button
                onClick={() => handleGenderToggle(item.gender)}
                className="flex justify-between items-center w-full py-3 text-left font-semibold hover:text-yellow-600 transition-colors text-sm text-gray-700"
              >
                <span className="uppercase">{item.gender}</span>
                <ChevronIcon isOpen={isOpen} />
              </button>

              <div
                className={`transition-all duration-500 ease-in-out`}
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  overflow: "hidden",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <ul className="py-2 space-y-2 border-l ml-2">
                  {item.sizes.map((size) => (
                    <li
                      key={size}
                      onClick={() => handleSizeSelect(size, item.gender)}
                      className={`cursor-pointer relative pl-4 text-gray-600 hover:text-[#ffbb42] transition-colors uppercase ${
                        selectedSize === size && selectedGender === item.gender
                          ? "text-yellow-600 font-semibold"
                          : ""
                      }`}
                    >
                      <div className="absolute left-0 top-1/2 w-2 h-px bg-gray-400 transform -translate-y-1/2"></div>
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gender;
