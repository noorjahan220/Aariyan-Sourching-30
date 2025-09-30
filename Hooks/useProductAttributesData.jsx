// useProductAttributesData.js
import { useMemo } from "react";
import useAuth from "./useAuth";

const useProductAttributesData = () => {
  const { filterAttributes } = useAuth();
  const productsAttributes = filterAttributes;

  
  const productCategory = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.category?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productSubCategory = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.subCategory?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productSize = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.productSize?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productColour = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.ProductColour?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productFit = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.productFit?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productBrand = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.brand?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  const productSustainability = useMemo(
    () =>
      productsAttributes?.flatMap((product) =>
        product.productAttributes?.sustainability?.map((cat) => cat)
      ) || [], 
    [productsAttributes]
  );

  return {
    productCategory,
    productSubCategory,
    productSize,
    productColour,
    productFit,
    productBrand,
    productSustainability,
  };
};

export default useProductAttributesData;