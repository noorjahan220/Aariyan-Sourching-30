"use client";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const ProductCarousel = ({ allProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(4);

  const products = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return [];
    }
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  }, [allProducts]);

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

  const nextSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const startIndex = currentSlide * productsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      <div className="flex justify-end space-x-3 text-gray-800 mb-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
          disabled={products.length === 0}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
          disabled={products.length === 0}
        >
          <FiArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {selectedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;