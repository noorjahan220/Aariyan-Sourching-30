"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import CustomTooltip from "../../components/CustomTooltip";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useWishList from "../../Hooks/useWishList";
import toast from "react-hot-toast";

const WishlistCompare = ({ myProductData }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlists, refetch, isLoading] = useWishList();

  const isWishListAxist = wishlists?.find(
    (wishlist) =>
      wishlist?.productId === myProductData?._id &&
      wishlist?.email === user?.email
  );

  const handleWishlist = async (myProductData) => {
    const data = {
      productId: myProductData?._id,
      email: user?.email,
      image: myProductData?.mainImage,
      title: myProductData?.title,
      colors: myProductData?.productColors,
      category: myProductData?.productCategory,
      subCategory: myProductData?.productSubCategory,
      size: myProductData?.productSize,
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

  return (
    <div className="flex items-center gap-6 text-gray-700 text-sm">
      <div className="flex gap-3 items-center    z-50">
        <button
          onClick={() => handleWishlist(myProductData)}
          disabled={isWishListAxist}
          aria-label="Add to Wishlist"
          className=" rounded-full  transition-colors cursor-pointer flex items-center justify-center text-xl"
        >
          <CustomTooltip
            id={`${myProductData?._id}`}
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
        Add to wishlist
      </div>
    </div>
  );
};

export default WishlistCompare;
