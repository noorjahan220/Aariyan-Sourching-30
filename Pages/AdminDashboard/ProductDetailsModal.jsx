// ProductDetailsModal.jsx

'use client';
import React, { useState, useEffect } from 'react';




import ProductDetailsTabs from '../Shop/ProductDetailsTabs';
import ProductDetailsClient from '../../components/ProductDetailsClient';




const ProductDetailsModal = ({ isOpen, product, onClose }) => {


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

          <ProductDetailsClient
          myProductData={product}
          ></ProductDetailsClient>
        
       
    <div className='mt-10 mb-4'>
         <ProductDetailsTabs productId={product._id}  />
    </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;