"use client";

import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import CustomStarRating from "../../components/CustomStarRating";


const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ProductSkeleton = () => (
  <div className="w-full bg-white border border-gray-200 shadow-md animate-pulse">
    <div className="w-full h-72 bg-gray-200"></div>
    <div className="p-3 space-y-3">
      <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
      <div className="flex gap-2">
        <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
        <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/4 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-1/3 h-4 bg-gray-200 rounded-full"></div>
      </div>
      <div className="w-full h-10 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
);


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
          {product.colors?.slice(0, 8).map((color, index) => (
            <span
              key={index}
              className="w-4.5 h-4.5 rounded-md border-2 border-gray-200 block cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: color?.code }}
            ></span>
          ))}
        </div>

        {/* Category & Sub-Category Tags */}
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

        <div className="overflow-hidden rounded-xl w-full mt-auto">
          <span className="flex justify-center items-center gap-2 bg-gradient-to-r from-[#ffbb42] to-yellow-400 hover:from-yellow-400 hover:to-[#ffbb42] text-black font-bold px-6 py-3 shadow-lg text-sm uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out w-full">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;