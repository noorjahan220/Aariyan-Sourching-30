"use client";
import React, { useState } from "react";
import { FaTrashAlt, FaEye, FaEdit, FaExclamationTriangle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ProductEditModal from "./ProductEditModal";
import Image from "next/image";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ProductDetailsModal from "./ProductDetailsModal";

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const AllProductsList = ({ product, refetch }) => {
  // CHANGED: Added a guard clause. This is the main fix.
  // If the product prop is not passed, render nothing and prevent the crash.
  if (!product) {
    return null;
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const axiosSecure = useAxiosSecure();

  // CHANGED: Use a safe variable for the image URL with a fallback
  const imageUrl = product?.mainImage ? `${img_api}${product.mainImage}` : '/placeholder.jpg';

  const handleEditClick = () => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedData) => {
    console.log("Updated Product:", updatedData);
  };

   // --- NEW: This function handles the async deletion and its toast states ---
  const performDeletion = (id, title) => {
    const deletePromise = axiosSecure.delete(`/products/${id}`);

    toast.promise(deletePromise, {
      loading: `Deleting ${title}...`,
      success: () => {
        if (refetch) refetch();
        return `${title} deleted successfully!`;
      },
      error: (err) => {
        console.error("Deletion failed:", err);
        return `Failed to delete ${title}. Please try again.`;
      },
    });
  };

  // --- MODIFIED: This function now only shows the custom confirmation toast ---
  const handleDelete = (id, title) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Delete "{title}"?</p>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDeletion(id, title);
            }}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000, // The toast will disappear after 6 seconds if not acted upon
    });
  };
  const handleViewDetails = () => {
    setCurrentProduct(product);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
<div
  className="p-4 my-3 bg-gray-50 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out 
  flex flex-col sm:flex-row sm:items-center sm:justify-between"
>
  {/* ===== Mobile (sm:hidden) Layout ===== */}
  <div className="flex flex-col sm:hidden">
    {/* Title */}
    <h3 className="text-lg font-bold text-gray-800 mb-1">
      {product?.title}
    </h3>

    {/* Category */}
    <div className="flex items-center space-x-2 mb-3">
      <p className="text-sm font-semibold text-gray-600">
        Category:{" "}
        <span className="text-gray-500 capitalize font-light">
          {product?.productCategory}
        </span>
      </p>
      {product?.category && (
        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
          {product.category}
        </span>
      )}
    </div>

    {/* Image + Actions একসাথে */}
    <div className="flex  justify-between gap-3">
      {/* Image */}
      <div className="relative w-14 h-14 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={ "Product Image"}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
          sizes="100vw"
          priority
        />
      </div>

      {/* Actions */}
      <div className="flex  space-x-2">
        <button
          className="p-2 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
          onClick={handleViewDetails}
          title="View Details"
        >
          <FaEye className="text-xl" />
        </button>

        <button
          className="p-2 text-gray-500 rounded-full hover:bg-green-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
          onClick={handleEditClick}
          title="Edit"
        >
          <FaEdit className="text-xl" />
        </button>

        <button
          className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
          onClick={() => handleDelete(product?._id, product?.title)}
          title="Delete"
        >
          <FaTrashAlt className="text-lg" />
        </button>
      </div>
    </div>
  </div>

  {/* ===== Desktop (hidden below sm) Layout ===== */}
  <div className="hidden sm:flex items-center justify-between w-full">
    {/* Left: Image & Info */}
    <div className="flex items-center space-x-4">
      <div className="relative flex-shrink-0 w-16 h-16">
        <Image
          src={imageUrl}
          alt={"Product Image"}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">
          {product?.title}
        </h3>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold text-gray-600">
            Category:{" "}
            <span className="text-gray-500 capitalize font-light">
              {product?.productCategory}
            </span>
          </p>
          {product?.category && (
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center space-x-2">
      <button
        className="p-2 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
        onClick={handleViewDetails}
        title="View Details"
      >
        <FaEye className="text-xl" />
      </button>

      <button
        className="p-2 text-gray-500 rounded-full hover:bg-green-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
        onClick={handleEditClick}
        title="Edit"
      >
        <FaEdit className="text-xl" />
      </button>

      <button
        className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
        onClick={() => handleDelete(product?._id, product?.title)}
        title="Delete"
      >
        <FaTrashAlt className="text-lg" />
      </button>
    </div>
  </div>
</div>



      {/* Edit Modal */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={currentProduct}
        onUpdate={handleUpdate}
        refetch={refetch}
      />

      {/* Details Modal */}
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        product={product}
      />
    </>
  );
};

export default AllProductsList;