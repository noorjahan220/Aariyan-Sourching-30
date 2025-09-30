"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  FaSearchPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";


const ProductImageGallery = ({ mainImage, galleryImages = [], img_api }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const images = useMemo(() => {
  
    const uniqueImageUrls = [
      ...new Set([mainImage, ...galleryImages].filter(Boolean)),
    ];


    return uniqueImageUrls.map((url) => ({
      original: `${img_api}${url}`,
      thumbnail: `${img_api}${url}`,
    }));
  }, [mainImage, galleryImages, img_api]);


  const renderLeftNav = (onClick, disabled) => (
    <button
      type="button"
      className="image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <FaChevronLeft size={20} />
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      type="button"
      className="image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Next Slide"
    >
      <FaChevronRight size={20} />
    </button>
  );

  // Custom zoom button
  const renderCustomFullscreenButton = () => (
    <button
      type="button"
      onClick={() => setIsZoomOpen(true)}
      className="absolute top-2 right-2 sm:right-12 bg-black/70 text-white p-2 rounded-md z-10"
      aria-label="Open zoom view"
    >
      <FaSearchPlus size={18} />
    </button>
  );

  // Render nothing if there are no images to prevent errors
  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
        No Images Available
      </div>
    );
  }

  return (
    <div className="image_gallery relative">
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        renderFullscreenButton={renderCustomFullscreenButton}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        // CHANGED: Hardcoded to "left" to keep thumbnails on the side always.
        thumbnailPosition="left"
        onSlide={(index) => setCurrentIndex(index)}
      />

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <Image
            src={images[currentIndex].original}
            alt="zoomed product image"
            width={600}
            height={600}
            className="object-contain w-[300px] sm:w-[600px] h-[300px] sm:h-[600px]"
            priority
          />
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            aria-label="Close zoom view"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;