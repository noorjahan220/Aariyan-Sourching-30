"use client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomStarRating from "../CustomStarRating";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import CustomTooltip from "../CustomTooltip";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useWishList from "../../Hooks/useWishList";
const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductCard = ({ product, viewType }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlists, refetch, isLoading] = useWishList();

  const isWishListAxist = wishlists?.find(
    (wishlist) =>
      wishlist?.productId === product?._id && wishlist?.email === user?.email
  );

  const handleWishlist = async (product) => {
    const data = {
      productId: product?._id,
      email: user?.email,
      image: product?.mainImage,
      title: product?.title,
      colors: product?.productColors,
      category: product?.productCategory,
      subCategory: product?.productSubCategory,
      size: product?.productSize,
    };
    try {
      const res = await axiosSecure.post("/add-wishlist", data);
      const result = res.data;

      if (result.acknowledged === true && result.insertedId) {
        refetch();
        toast.success("Product added to wishlist", {
          duration: 2000,
        });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add review");
    }
  };

  const imageUrl = product?.mainImage
    ? `${img_api}${product.mainImage}`
    : "/placeholder.jpg";

  if (viewType === "list") {
    return (
      <Link
        href={`/shop/${product?._id}`}
        className="group w-full h-auto bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row border border-gray-200"
      >
        <div className="md:w-1/3 w-full flex-shrink-0 relative flex items-center justify-center bg-gray-100 ">
          <div className="relative w-full h-68 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={product?.title || "Product Image"}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow px-5 py-3">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#ffbb42] transition-colors duration-300 mb-3 line-clamp-2 capitalize">
            {product?.title}
          </h3>

          <div className="flex space-x-2 mb-3 flex-wrap">
            {product?.colors?.map((color, index) => (
              <div key={index} className="relative group/color">
                <span
                  className="w-6 h-6 rounded-md border-2 border-gray-200 block cursor-pointer transition-transform group-hover/color:scale-110"
                  style={{ backgroundColor: color?.code }}
                ></span>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/color:opacity-100 transition-opacity">
                  {color?.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              {product?.productCategory}
            </span>
            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
              {product?.productSubCategory}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3 text-sm mb-3">
            <div className="flex items-center">
              <CustomStarRating numberOfStars={4} />
              <span className="ml-2 text-gray-500">
                ({product?.reviews || 45} reviews)
              </span>
            </div>
            {product?.productCode && (
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                Code: {product.productCode}
              </span>
            )}
            {product?.GSM_Code && (
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                GSM: {product.GSM_Code}
              </span>
            )}
          </div>

          <div>
            <p className="text-base text-gray-500">
              Size:{" "}
              <span className="font-bold text-gray-800 text-lg">
                {product?.productSize}
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleWishlist(product)}
                disabled={isWishListAxist}
                aria-label="Add to Wishlist"
                className="p-1 rounded-full bg-gray-100 border border-gray-200  hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center"
              >
                <CustomTooltip
                  id={`${product?._id}`}
                  content={
                    isWishListAxist ? "Already in wishlist" : "Add to  wishlist"
                  }
                >
                  {isWishListAxist ? (
                    <FaHeart className=" " />
                  ) : (
                    <FaRegHeart className=" " />
                  )}
                </CustomTooltip>
              </button>
              <button className="bg-[#ffbb42] hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg text-sm uppercase transition-all duration-300 hover:shadow-md">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/shop/${product?._id}`}
      className="group relative w-full bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-2"
    >
      {/* Wishlist Button */}
      <button
        onClick={() => handleWishlist(product)}
        disabled={isWishListAxist}
        className="absolute  top-4 right-4 z-10      hover:scale-110 transition-all duration-300 text-gray-700 text-2xl cursor-pointer "
      >
        <CustomTooltip
          id={`${product?._id}`}
          content={isWishListAxist ? "Already in wishlist" : "Add to  wishlist"}
        >
          {isWishListAxist ? (
            <FaHeart className=" " />
          ) : (
            <FaRegHeart className=" " />
          )}
        </CustomTooltip>
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

        {/* Colors */}
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
            {product?.productCategory}
          </span>
          <span className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
            {product?.productSubCategory?.slice(0, 10)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Size :
            </span>
            <span className="font-bold text-gray-900 text-lg">
              {product?.productSize}
            </span>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <CustomStarRating numberOfStars={2} />
            <span className="text-sm text-gray-500 font-medium">(30)</span>
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

export default ProductCard;
