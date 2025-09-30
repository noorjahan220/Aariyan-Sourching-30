// ProductDetailsModal.jsx

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// --- React Tabs Imports ---
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


// --- Icon Imports (Optional, for better UI) ---
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- Rich Text Renderer ---
import RichTextRenderer from './RichTextRenderer'; 
import CustomStarRating from '../../components/CustomStarRating';
import ProductDetailsTabs from '../Shop/ProductDetailsTabs';

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductDetailsModal = ({ isOpen, product, onClose }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
   
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen || !product) {
    return null;
  }


  const galleryImages = [product.mainImage, ...(product.galleryImages || [])];
  


  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl rounded-lg shadow-xl p-6 md:p-8 relative transition-transform duration-300 ease-out max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-black hover:text-gray-800 text-4xl font-light z-20"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* --- LEFT COLUMN: IMAGE GALLERY with SWIPER --- */}
          <div className="flex flex-col gap-3">
            <Swiper
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              loop={true}
              className="relative w-full aspect-square bg-gray-100 rounded-lg group"
            >
              {galleryImages.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={`${img_api}${imgSrc}`}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev-custom absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <FaChevronLeft className="text-gray-700" />
              </div>
              <div className="swiper-button-next-custom absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <FaChevronRight className="text-gray-700" />
              </div>
            </Swiper>
            
            {/* Thumbnail Slider */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              watchSlidesProgress
              slidesPerView={4}
              spaceBetween={10}
              className="w-full h-24"
            >
              {galleryImages.map((imgSrc, index) => (
                <SwiperSlide key={index} className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent hover:border-yellow-400">
                  <div className="relative w-full h-full bg-gray-100">
                    <Image
                      src={`${img_api}${imgSrc}`}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>


{/* Product Details */}
<div className="product_details p-6 space-y-5 bg-white rounded-xl shadow-sm border border-gray-100">
  {/* Title + Code */}
  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      {product?.title}
    </h1>
    <p className="text-sm text-gray-500">Code: {product?.productCode}</p>
  </div>

  {/* Category */}
  <div className="flex items-center gap-2">
    <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
      {product?.productCategory}
    </span>
    <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
      {product?.productSubCategory}
    </span>
  </div>

  {/* Rating */}
  <div className="flex items-center gap-2">
    <CustomStarRating rating={5} />
    <span className="text-gray-500 text-sm">
      (200 customer reviews)
    </span>
  </div>

  {/* Price */}
  <div className="flex items-baseline gap-3">
    <p
      className={`${
        product?.disCountPrice
          ? "line-through text-gray-400"
          : "text-2xl font-semibold text-gray-900"
      }`}
    >
      ${product?.price}
    </p>
    {product?.disCountPrice && (
      <p className="text-2xl font-bold text-black">
        ${product?.price - product?.disCountPrice}
      </p>
    )}
  </div>



  {/* Attributes */}
  <div className="flex flex-wrap gap-3 pt-3">
    <span className="px-4 py-1 text-sm font-medium border border-gray-200 rounded-lg">
 {product?.productSize}
    </span>
        <span className="px-4 py-1 text-sm font-medium border border-gray-200 rounded-lg">
 {product?.GSM_Code}
    </span>
    
    <span className="px-4 py-1 text-sm font-medium border border-gray-200 rounded-lg">
{product?.fit}
    </span>

    <span className="px-4 py-1 text-sm font-medium border border-gray-200 rounded-lg">
 {product?.Sustainability}
    </span>
  </div>

  {/* Colors */}
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-2">
      Available Colors
    </h3>
    <div className="flex items-center gap-2">
      {product?.colors?.map((color, index) => (
        <span
          key={index}
          className="w-6 h-6 rounded-sm border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
          style={{ backgroundColor: color.code }}
        ></span>
      ))}
    </div>
  </div>

  {/* Size Guide */}
  <button className="text-sm font-medium text-orange-600 underline hover:text-orange-700 transition">
    Size Guide
  </button>

  {/* Brand Logo */}
  {Array.isArray(product?.brandLogo) && (
    <div>
      {/* <h3 className="text-sm font-semibold text-gray-700 mb-2">
        Brand Partners
      </h3> */}
      <div className="flex items-center flex-wrap gap-2">
        {product.brandLogo.map((logo, index) => (
          <div key={index} className="relative w-14 h-14">
            <Image
              src={`${img_api}${logo}`}
              alt={`brand-logo-${index}`}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-md border border-gray-100"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )}
</div>

        </div>
        
       
    <div className='mt-10 mb-4'>
         <ProductDetailsTabs productId={product._id}  />
    </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;