"use client";
import { useState } from "react";

import { FaBoxOpen } from "react-icons/fa";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../LoadingSpinner";
import useFilterdProducts from "../../Hooks/useFilterdProducts";
import AllProductsPagination from "../AllProductsPagination";

const ProductList = ({ viewType }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [allFilterdProducts, refetch, isLoading] =
    useFilterdProducts(currentPage);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!allFilterdProducts?.data || allFilterdProducts.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <FaBoxOpen className="text-6xl mb-4 text-[#ffbb42]" />
        <p className="text-lg font-semibold">No products available right now</p>
      </div>
    );
  }

  const pageSize = 12;

  return (
    <div className=" py-6">
      {/* Product Grid/List */}
      <div
        className={` product_list grid gap-10 lg:gap-4 ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {allFilterdProducts?.data?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewType={viewType}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center items-center">
        {allFilterdProducts?.total > pageSize && (
          <AllProductsPagination
            currentPage={currentPage}
            totalCount={allFilterdProducts?.total || 0}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
