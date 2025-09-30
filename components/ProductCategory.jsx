import React, { useState, useMemo } from "react";
import { IoChevronUp } from "react-icons/io5";
import useProductAttributesData from "../Hooks/useProductAttributesData";
import useAllProducts from "../Hooks/useAllProducts";
import { useFilter } from "../Context/FilterContext";



const ChevronIcon = ({ isOpen }) => (
  <IoChevronUp
    className={`h-4 w-4 text-gray-700 transform transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
);

const ProductCategory = ({ onSelect }) => {
  const { productCategory, isLoading: catLoading } =
    useProductAttributesData();
  const [allProducts] = useAllProducts();
    const { setSelectedCategory, setSelectedSubCategory } = useFilter();

  const [openCategory, setOpenCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState(null);

  const handleToggle = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const handleSubSelect = (cat, sub) => {
    setSelectedCategory(cat); 
    setSelectedSubCategory(sub); 

    if (onSelect) {
      onSelect({ category: cat, subCategory: sub });
    }
  };

const categoryWithSubs = useMemo(() => {
  if (!productCategory || !allProducts) return [];


  const uniqueCategories = [
    ...new Map(productCategory.map((cat) => [cat.value, cat])).values(),
  ];

  return uniqueCategories.map((cat) => {
    const filtered = allProducts?.filter(
      (p) => p.productCategory === cat.value
    );

    const subs = [...new Set(filtered?.map((p) => p.productSubCategory))];

    return {
      ...cat,
      subcategories: subs,
    };
  });
}, [productCategory, allProducts]);



  return (
    <div className="w-full bg-white mb-10 font-sans text-gray-800">
      {/* Title */}
      <h3 className="text-sm font-bold tracking-wide uppercase">
        Filters by Categories
      </h3>
      <div className="my-2 relative">
        <div className="absolute top-0 w-full h-0.5 bg-gray-100"></div>
        <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
      </div>

      <div>
        {categoryWithSubs?.map((category) => {
          const isOpen = openCategory === category.value;
          return (
            <div key={category.id} className="">

              <button
                onClick={() => handleToggle(category.value)}
                className="flex justify-between items-center w-full py-3 text-left font-semibold hover:text-yellow-600 transition-colors text-sm text-gray-700"
              >
                <span className="uppercase">{category.value}</span>
                <ChevronIcon   isOpen={isOpen} />
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
  {category.subcategories.length > 0 ? (
    category.subcategories.map((sub) => (
      <li
        key={sub}
          onClick={() => handleSubSelect(category.value, sub)}
        className={`cursor-pointer relative pl-4 text-gray-600 hover:text-[#ffbb42] transition-colors ${
          subcategory === sub ? "text-yellow-600 font-semibold" : ""
        }`}

      >
        <div className="absolute left-0 top-1/2 w-2 h-px bg-black transform -translate-y-1/2 capitalize"></div>
        {sub}
      </li>
    ))
  ) : (
    <li className="pl-4 text-gray-400 italic border-none">No Subcategories Available</li>
  )}
</ul>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategory;