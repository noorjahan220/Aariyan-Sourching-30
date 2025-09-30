"use client";

import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import CommonBanner from "../../components/CommonBanner";
import WishlistData from "../Prductdetails/WishlistData";
import useWishList from "../../Hooks/useWishList";
import { FaRegHeart } from "react-icons/fa";

const wishlistImg = '/wishlistimg.jpg';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlists, refetch, isLoading] = useWishList();

  const myWishlists = wishlists?.filter(wishlist => wishlist?.email === user?.email);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <CommonBanner title="wishlist" breadcrumb="my wishlist" backgroundImage={wishlistImg} />

      {(!myWishlists || myWishlists.length === 0) ? (
        <div className="flex flex-col items-center justify-center my-20 text-gray-500">
          <FaRegHeart size={60} className="mb-4 animate-pulse" />
          <h2 className="text-2xl font-semibold">Your wishlist is empty!</h2>
          <p className="text-center mt-2">Browse products and add your favorites to see them here.</p>
        </div>
      ) : (
        <WishlistData myWishlists={myWishlists} refetch={refetch} />
      )}
    </div>
  );
};

export default Wishlist;
