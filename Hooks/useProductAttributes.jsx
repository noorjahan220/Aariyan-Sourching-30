"use client";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useProductAttributes = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: productsAttributes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["productsAttributes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/find-productAttributes");
      return res.data;
    },
  });

  return [productsAttributes, refetch, isLoading];
};

export default useProductAttributes;
