"use client";
import React, { useMemo } from "react";
import Link from 'next/link';
import useAllProducts from "../../Hooks/useAllProducts";
import RichTextRenderer from "./RichTextRenderer";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProductDetailsData = ({ productId, category }) => {
  const [allProducts] = useAllProducts();

  const subcategoriesForGivenCategory = useMemo(() => {
    if (!category || !allProducts || allProducts.length === 0) return [];

    const filteredProductsByCategory = allProducts.filter(
      (p) => p.productCategory === category
    );

    const uniqueSubcategories = [...new Set(
      filteredProductsByCategory.map((p) => p.productSubCategory).filter(Boolean)
    )];

    return uniqueSubcategories;
  }, [category, allProducts]);

  const product = allProducts?.find((p) => p._id === productId);

  if (!product) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <section>
        <div>
          <RichTextRenderer content={product.description} />
          <div className="tags mt-8">
            <h1 className="text-lg font-semibold capitalize mb-2">
              Tags :
            </h1>
            <div className="flex flex-wrap gap-4">
              {subcategoriesForGivenCategory.length > 0 ? (
                subcategoriesForGivenCategory.map((sub, index) => (
                  <Link
                    key={index}
                    href={`/shop?subCategory=${encodeURIComponent(sub)}`}
                    className="text-gray-900 text-base underline capitalize font-normal cursor-pointer hover:text-amber-600 transition-colors"
                  >
                    {sub}
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No subcategories available for the "{category}" category.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsData;
