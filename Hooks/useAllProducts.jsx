"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/find-products");
      return res.data;
    },
  });

  return [allProducts, refetch, isLoading];
};

export default useAllProducts;
