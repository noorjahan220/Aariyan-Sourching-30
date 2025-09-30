"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import CustomStarRating from "../../components/CustomStarRating";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const LeftArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 12H4M10 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 12h16m-6 6l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProductCard = ({ product, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const handleWishlistDelete = (id) => {
    console.log(id);

    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Delete</p>
              <p className="text-sm text-gray-600">
                This action cannot be undone.
              </p>
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
              onClick={async () => {
                try {
                  const res = await axiosSecure.delete(
                    `/delete-wishlist/${id}`
                  );

                  if (res.data?.deletedCount > 0) {
                    toast.success("Wishlist item deleted successfully.", {
                      duration: 2000,
                    });
                    refetch();
                  } else {
                    toast.error("Failed to delete item!");
                  }
                } catch (error) {
                  console.error(error);
                  toast.error(
                    error?.response?.data?.error ||
                      error.message ||
                      "Delete failed"
                  );
                } finally {
                  toast.dismiss(t.id);
                }
              }}
              className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };

  const imageUrl = product?.image
    ? `${img_api}${product.image}`
    : "/placeholder.jpg";
  return (
    <div className="group relative w-full bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-2">
      <button
        onClick={() => handleWishlistDelete(product?._id)}
        className="absolute  top-4 right-4 z-10      hover:scale-110 transition-all duration-300 text-gray-700 text-2xl cursor-pointer "
      >
        <MdCancel className=" " />
      </button>

      <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imageUrl}
          alt={product?.title || "Product Image"}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>

      <div className="px-4 py-2 flex flex-col ">
        <h3 className="text-gray-900 mt-2 mb-4 font-bold text-lg leading-tight group-hover:text-[#ffbb42] transition-colors duration-300 capitalize">
          {product?.title?.slice(0, 20)}
        </h3>

        <div className="flex flex-wrap gap-1 mb-2">
          {product?.colors?.slice(0, 8).map((color, index) => (
            <div key={index} className="relative group/color">
              <span
                className="w-4.5 h-4.5 rounded-md border-2 border-gray-200 block cursor-pointer transition-transform group-hover/color:scale-110"
                style={{ backgroundColor: color?.code }}
              ></span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-2 my-2 ">
          <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
            {product?.category}
          </span>
          <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            {product?.subCategory?.slice(0, 10)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Size :
            </span>
            <span className="font-bold text-gray-900 text-lg">
              {product?.size}
            </span>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <CustomStarRating numberOfStars={2} />
            <span className="text-sm text-gray-500 font-medium">(30)</span>
          </div>
        </div>

        <Link
          href={`/shop/${product?.productId}`}
          className="overflow-hidden rounded-xl w-full"
        >
          <span className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffbb42] to-yellow-400 hover:from-yellow-400 hover:to-[#ffbb42] text-black font-bold px-6 py-3 shadow-lg text-sm uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out w-full">
            Shop Now
          </span>
        </Link>
      </div>
    </div>
  );
};

const WishlistData = ({ myWishlists, refetch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setProductsPerPage(4);
      else if (window.innerWidth >= 640) setProductsPerPage(2);
      else setProductsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setCurrentSlide(0), [productsPerPage]);

  const totalSlides = Math.ceil(myWishlists?.length / productsPerPage);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const startIndex = currentSlide * productsPerPage;
  const selectedProducts = myWishlists?.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <section className="bg-white py-16 px-4">
      <div className="container max-w-6xl mx-auto">

        <div className="mb-1">
          <div className="flex justify-end space-x-3 text-gray-800">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <LeftArrowIcon />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <RightArrowIcon />
            </button>
          </div>
        </div>


        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedProducts?.map((product, index) => (
            <ProductCard key={index} product={product} refetch={refetch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistData;
