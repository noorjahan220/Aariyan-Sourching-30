// Hooks/useFilterdProducts.js

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useFilter } from "../Context/FilterContext";

const useFilterdProducts = (page = 1) => {
  const axiosSecure = useAxiosSecure();
  const {
    selectedCategory,
    selectedSubCategory,
    selectedSize,
    selectedColour,
    selectedFit,
    selectedGender,
    selectedSustainability,
    selectedSearchQuery,
    selectedBrand,
  } = useFilter();

  const limit = 12;

  const {
    data: allFilterdProducts = { data: [], total: 0, page: 1, pages: 1 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      "allFilterdProducts",
      selectedCategory,
      selectedSubCategory,
      selectedSize,
      selectedGender, // Added for correct query refetching
      selectedColour,
      selectedFit,
      selectedSustainability,
      selectedSearchQuery,
      selectedBrand,
      page,
      limit,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/find-filterd-products", {
        params: {
          category: selectedCategory,
          subCategory: selectedSubCategory,
          size: selectedSize,
          gender: selectedGender, // Pass gender to the API
          colour: selectedColour,
          fit: selectedFit,
          sustainability: selectedSustainability,
          search: selectedSearchQuery,
          brand: selectedBrand,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  return [allFilterdProducts, refetch, isLoading];
};

export default useFilterdProducts;