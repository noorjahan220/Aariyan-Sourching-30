"use client";
import React, { useState, useMemo, useEffect } from "react";
import { FaBoxOpen, FaSearch } from "react-icons/fa";
import AllProductsList from "../Pages/AdminDashboard/AllProductsList";
import LoadingSpinner from "./LoadingSpinner";
import useProductAttributesData from "../Hooks/useProductAttributesData";
import { useFilter } from "../Context/FilterContext";
import useFilterdProducts from "../Hooks/useFilterdProducts";
import AllProductsPagination from "./AllProductsPagination";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { productCategory } = useProductAttributesData();
  const { selectedCategory, setSelectedCategory, resetFilters } = useFilter();


  const [allFilterdProducts, refetch, isLoading] = useFilterdProducts(currentPage);

  const searchedProducts = useMemo(() => {
    if (!allFilterdProducts?.data) return [];
    return allFilterdProducts.data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allFilterdProducts?.data, searchTerm]);






  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleReset = () => {
    resetFilters();
    setSearchTerm("");
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <main className="max-w-6xl my-7">

     

      <section className=" flex flex-col sm:flex-row justify-between gap-4 mb-10 lg:mb-5">
        {/* search */}
        <div className="flex items-center w-full sm:w-1/2 md:w-[60%] lg:w-[70%] border border-gray-300 rounded-lg px-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products on this page..."
            className="w-full py-2 outline-none text-gray-700"
          />
        </div>

        {/* filter */}
        <div className="flex items-center w-full sm:w-1/2 md:w-[40%] lg:w-[30%] gap-2">
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); 
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full outline-none uppercase"
          >
            <option value="">Filter By Category</option>
            {productCategory?.map((c) => (
              <option key={c.id} value={c.value}>
                {c.value}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="bg-[#ffbb42] px-3 py-2 rounded-lg hover:bg-amber-500 transition whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="all_product_list  grid grid-cols-1 gap-1 ">
   
        {searchedProducts.length > 0 ? (
          searchedProducts.map((product) => (
            <AllProductsList
              key={product._id}
              product={product}
              refetch={refetch}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 col-span-full">
            <FaBoxOpen className="text-6xl mb-4 text-[#ffbb42]" />
            <p className="text-lg font-semibold">No products found</p>
          </div>
        )}
      </section>

     <section className="mt-8 pb-8">

        {(allFilterdProducts?.total > 12) && (
          <AllProductsPagination
            currentPage={currentPage}
            totalCount={allFilterdProducts?.total || 0}
            pageSize={10} 
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </section>
    </main>
  );
};

export default AllProducts;