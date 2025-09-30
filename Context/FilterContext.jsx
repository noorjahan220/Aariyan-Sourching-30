// Context/FilterContext.js

"use client";
import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedFit, setSelectedFit] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSustainability, setSelectedSustainability] = useState(null);
  const [selectedBrand,setSelectedBrand] = useState(null);

  const [selectedSearchQuery, setSelectedSearchQuery] = useState(null);


  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedSize(null);
    setSelectedColour(null);
    setSelectedFit(null);
    setSelectedGender(null);
    setSelectedSustainability(null);
    setSelectedSearchQuery(null);
    setSelectedBrand(null);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedSize,
        setSelectedSize,
        selectedColour,
        setSelectedColour,
        selectedFit,
        setSelectedFit,
        selectedGender,
        setSelectedGender,
        selectedSustainability,
        setSelectedSustainability,
        selectedSearchQuery,
        setSelectedSearchQuery,
        setSelectedBrand,
        selectedBrand,
        resetFilters,
 
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
