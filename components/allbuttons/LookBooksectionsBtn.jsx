"use client";
import { useState } from "react";
import LookBookCard from "../LookBookCard";
const LeftArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
export default function LookBooksectionsBtn({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 2;
  const totalSlides = Math.ceil(products.length / productsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const startIndex = currentIndex * productsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;
  return (
    <div>
      <div className="text-right my-6">
        <button
          onClick={prevSlide}
          disabled={isFirstSlide}
          className={`p-1 mr-2 ${
            isFirstSlide ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
          }`}
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={nextSlide}
          disabled={isLastSlide}
          className={`p-1 ${
            isLastSlide ? "text-gray-300 cursor-not-allowed" : "text-gray-800"
          }`}
        >
          <RightArrowIcon />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {visibleProducts.map((product) => (
          <LookBookCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
