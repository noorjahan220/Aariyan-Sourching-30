"use client";
import React from "react";
import useAllProducts from "../../Hooks/useAllProducts";
import RichTextRenderer from "./RichTextRenderer";
import LoadingSpinner from "../../components/LoadingSpinner";




const ProductTextileCare = ({ productId }) => {
  const [allProducts] = useAllProducts();
  const product = allProducts?.find((p) => p._id === productId);

  if (!product) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="container mx-auto p-4 space-y-8">




      {product.printingEmbroidery && (
         <section>
            <div className="">
              <RichTextRenderer content={product.printingEmbroidery} />
            </div>
         </section>
      )}


 

    </div>
  );
};

export default ProductTextileCare;