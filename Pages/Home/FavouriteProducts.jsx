"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart, FaBoxOpen } from "react-icons/fa";
import CustomStarRating from "../../components/CustomStarRating";
import useAuth from "../../Hooks/useAuth";

const DiamondIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-gray-700"
    aria-hidden="true"
  >
    <path
      d="M12 2L2 12L12 22L22 12L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductCard = ({ product }) => {
  if (!product) return null;

  const imageUrl = product?.mainImage
    ? `${img_api}${product.mainImage}`
    : "/placeholder.jpg";

  return (
    <Link
      href={`/shop/${product?._id}`}
      className="group relative w-full bg-white  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-2"
    >
      <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
        <FaRegHeart className="text-gray-700 text-lg" />
      </button>

      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>

      <div className="px-3 py-2 flex flex-col flex-grow space-y-2">
        <h3 className=" mt-4 text-gray-900 font-bold text-lg leading-tight line-clamp-2 group-hover:text-[#ffbb42] transition-colors duration-300 capitalize">
          {product.title}
        </h3>
        <div className="flex flex-wrap gap-1 ">
          {product?.colors?.slice(0, 8).map((color, index) => (
            <span
              key={index}
              className="w-4.5 h-4.5 rounded-md border-2 border-gray-200 block cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: color?.code }}
            ></span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-2">
          <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
            {product.productCategory}
          </span>
          <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            {product.productSubCategory}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Size
            </span>
            <span className="font-bold text-gray-900 text-lg">
              {product.productSize}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CustomStarRating numberOfStars={4} />
            <span className="text-sm text-gray-500 font-medium">
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl w-full">
          <span className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffbb42] to-yellow-400 hover:from-yellow-400 hover:to-[#ffbb42] text-black font-bold px-6 py-3 shadow-lg text-sm uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out w-full">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
};

const FavouriteProducts = () => {
  const { data } = useAuth();
  const allProducts = data || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const products = allProducts.slice(0, 8);

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

  const totalSlides = Math.ceil(products.length / productsPerPage);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const startIndex = currentSlide * productsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const renderLayout = (content) => (
    <section className="bg-white py-16 px-4 mb-10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Our Highlight Products
          </h2>
          <div className="flex justify-center items-center my-6 space-x-4">
            <div className="w-16 h-px bg-gray-300"></div> <DiamondIcon />{" "}
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
        </div>
        <div className="mb-1">
          <div className="text-center w-full max-w-lg mx-auto">
            <p className="text-gray-500">
              Discover our premium T-shirts, polo shirts, and hoodies, crafted
              for global apparel markets.
            </p>
          </div>
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
        {content}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="bg-gray-800 text-white px-10 py-3 hover:bg-gray-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );

  if (!products || products.length === 0) {
    return renderLayout(
      <div className="text-center py-12 text-gray-500">
        <FaBoxOpen className="text-5xl mx-auto mb-4" />
        <p>No new arrivals at the moment. Check back soon!</p>
      </div>
    );
  }

  return renderLayout(
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {selectedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FavouriteProducts;