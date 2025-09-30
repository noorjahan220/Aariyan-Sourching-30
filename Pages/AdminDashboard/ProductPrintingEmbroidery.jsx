"use client";
import React from "react";
import useAllProducts from "../../Hooks/useAllProducts";
import RichTextRenderer from "./RichTextRenderer";
import { FaDownload } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
// import toast from "react-hot-toast";

const ProductPrintingEmbroidery = ({ productId }) => {
  const [allProducts] = useAllProducts();
  const product = allProducts?.find((p) => p._id === productId);

  if (!product) return <LoadingSpinner></LoadingSpinner>;

 

  return (
    <div className="container mx-auto p-4 space-y-8">
      {product.printingEmbroidery && (
        <section>
          {/* Rich text content */}
          <div className="mb-6">
            <RichTextRenderer content={product.printingEmbroidery} />
          </div>

         
          {product.mainPdfs && product.mainPdfs.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Available Downloads:</h3>
              <div className="flex flex-wrap gap-4">
                {product.mainPdfs.map((pdfFile, index) => {
               
                  const pdfUrl = pdfFile.startsWith("http")
                    ? pdfFile
                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${pdfFile}`;
                  
                
                  const fileName = pdfFile.split("/").pop();

                  return (
                    <a
                      key={index}
                      href={pdfUrl}
                      download 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-fit bg-[#E4DFCC] px-3 py-2 rounded-sm capitalize flex flex-wrap items-center gap-2 hover:bg-[#d9d3bb] transition"
                    >
                        <FaDownload></FaDownload>
                      {` PDF ${index + 1}`}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ProductPrintingEmbroidery;