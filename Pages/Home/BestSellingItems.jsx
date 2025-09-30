'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { GiDiamondTrophy } from 'react-icons/gi';

// --- Static Products Data ---
const products = [
  { 
    id: 1, title: 'Women floral dress', price: 399, reviews: 212, 
    mainImage: 'https://plus.unsplash.com/premium_photo-1709993971389-2ffe68115dd4?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    colors: ['#D9F99D','#FBCFE8'], 
    productCategory: 'Dress', productSubCategory: 'Floral', productSize: 'M', disCountPrice: 50
  },
  { 
    id: 2, title: 'Women denim jacket', price: 499, reviews: 85, 
    mainImage: 'https://images.unsplash.com/photo-1692220438327-fd668e8a7bbb?w=500&auto=format&fit=crop&q=60', 
    colors: ['#5EEAD4','#94A3B8','#3B82F6'], 
    productCategory: 'Jacket', productSubCategory: 'Denim', productSize: 'L'
  },
  { 
    id: 3, title: 'Elegant evening gown', price: 549, reviews: 88, 
    mainImage: 'https://plus.unsplash.com/premium_photo-1661337376780-1ec70bcce8db?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    colors: ['#EF4444','#000000'], 
    productCategory: 'Gown', productSubCategory: 'Evening', productSize: 'S', disCountPrice: 100
  },
  { 
    id: 4, title: 'Casual summer shirt', price: 129, reviews: 150, 
    mainImage: 'https://images.unsplash.com/photo-1746002312068-ab5d604966cc?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    colors: ['#FFFFFF','#38BDF8'], 
    productCategory: 'Shirt', productSubCategory: 'Summer', productSize: 'M'
  },
];

// --- Product Card Component ---
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
        <FaRegHeart className="text-gray-700 text-lg" />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
      </div>

      {/* Product Details */}
      <div className="px-3 py-2 flex flex-col flex-grow space-y-2">
        {/* Colors */}
        <div className="flex flex-wrap gap-1">
          {product.colors.map((color, idx) => (
            <span
              key={idx}
              className="w-4.5 h-4.5 rounded-md border-2 border-gray-200 block cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-gray-900 font-bold text-lg leading-tight line-clamp-2 group-hover:text-[#ffbb42] transition-colors duration-300 capitalize"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-x-2">
          <span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
            {product.productCategory}
          </span>
          <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            {product.productSubCategory}
          </span>
        </div>

        {/* Size & Rating */}
        <div className="flex items-center justify-between border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Size</span>
            <span className="font-bold text-gray-900 text-lg">{product.productSize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className="text-yellow-400 w-4 h-4" />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">({product.reviews})</span>
          </div>
        </div>

        {/* Price & Shop Now */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className={`${product.disCountPrice ? 'line-through text-sm text-[#777777]' : 'text-lg font-bold text-gray-900'}`}>
              ${product.price}
            </p>
            {product.disCountPrice && (
              <p className="text-lg font-bold text-gray-900">${product.price - product.disCountPrice}</p>
            )}
          </div>

          <div className="overflow-hidden rounded-xl">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffbb42] to-yellow-400 hover:from-yellow-400 hover:to-[#ffbb42] text-black font-bold px-6 py-3 shadow-lg text-sm uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              Shop Now
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- Main Best Selling Items Component ---
const BestSellingItems = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setProductsPerPage(4);
      else if (window.innerWidth >= 640) setProductsPerPage(2);
      else setProductsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(products.length / productsPerPage);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const startIndex = currentSlide * productsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="bg-white py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Best Selling Items</h2>
          <div className="flex justify-center items-center my-6 space-x-4">
            <div className="w-16 h-px bg-gray-300"></div>
            <GiDiamondTrophy className="w-6 h-6 text-gray-700" />
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
        </div>

        <div className="mb-1 flex justify-end space-x-3">
          <button onClick={prevSlide} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Previous slide">
            <RiArrowLeftSLine size={24} />
          </button>
          <button onClick={nextSlide} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Next slide">
            <RiArrowRightSLine size={24} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gray-800 text-white px-10 py-3 hover:bg-gray-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellingItems;