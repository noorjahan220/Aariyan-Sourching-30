'use client';

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// Import required modules
import { Autoplay } from 'swiper/modules';

// --- Arrow Icon Component ---
const ChevronIcon = ({ direction = 'left', ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2} 
    {...props}
  >
    {direction === 'left' 
      ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      : <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    }
  </svg>
);

// --- Brands Data ---
// Replace these with your actual brand logos
const brands = [
  { id: 1, src: 'https://aaryansourcing.com/assets/images/brand3.png', alt: 'Natural Logo' },
  { id: 2, src: 'https://aaryansourcing.com/assets/images/brand4.png', alt: 'Triangle Logo' },
  { id: 3, src: 'https://aaryansourcing.com/assets/images/brand5.png', alt: 'Bicycle Shop Logo' },
  { id: 4, src: 'https://aaryansourcing.com/assets/images/brand2.png', alt: 'Shine Tagline Logo' },
  { id: 5, src: 'https://aaryansourcing.com/assets/images/brand1.png', alt: 'Design Logo' },
  // Add more logos for a better sliding effect
  { id: 6, src: 'https://aaryansourcing.com/assets/images/brand4.png', alt: 'Natural Logo' },
  { id: 7, src: 'https://aaryansourcing.com/assets/images/brand5.png', alt: 'Triangle Logo' },
];

const BrandsSlider = () => {
  // State to hold the Swiper instance
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  return (
    <div className="bg-[#f9f9f9] py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Title Section */}
          <div className="text-center md:text-left md:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Brands
            </h2>
          </div>

          {/* Slider Section */}
          <div className="w-full md:w-3/4 flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="p-2 text-gray-400 hover:text-gray-800 transition-colors duration-200 focus:outline-none"
              aria-label="Previous brand"
            >
              <ChevronIcon direction="left" />
            </button>

            {/* Swiper Component */}
            <div className="flex-1 overflow-hidden">
              <Swiper
                onSwiper={setSwiperInstance}
                spaceBetween={60}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 3,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 4,
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {brands.map((brand) => (
                  <SwiperSlide key={brand.id} className="flex items-center justify-center h-20">
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className="max-h-12 w-auto object-contai opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="p-2 text-gray-400 hover:text-gray-800 transition-colors duration-200 focus:outline-none"
              aria-label="Next brand"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsSlider;