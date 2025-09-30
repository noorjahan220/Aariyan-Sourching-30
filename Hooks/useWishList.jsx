"use client"
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useWishList = () => {
        const  axiosSecure = useAxiosSecure();
 
         const {data  : wishlists = [],refetch,isLoading} = useQuery({
            queryKey : ['wishlists'],
            queryFn : async () => {
                 const res = await axiosSecure.get('/find-wishlist');
                   return res.data
            }
         })

         return [wishlists,refetch,isLoading]
};

export default useWishList;