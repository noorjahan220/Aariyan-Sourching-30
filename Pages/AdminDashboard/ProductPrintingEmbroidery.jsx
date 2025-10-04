"use client";
import React from "react";
import useAllProducts from "../../Hooks/useAllProducts";
import RichTextRenderer from "./RichTextRenderer";
import { FaDownload } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProductPrintingEmbroidery = ({ productId }) => {
  const [allProducts] = useAllProducts();
  const product = allProducts?.find((p) => p._id === productId);

  if (!product) {
    return <LoadingSpinner />;
  }

  const hasPrintingContent = !!product.printingEmbroidery;

  const hasPdf = !!product.mainPdf;

  if (!hasPrintingContent && !hasPdf) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {hasPrintingContent && (
        <section>
          <div className="mb-6">
            <RichTextRenderer content={product.printingEmbroidery} />
          </div>
        </section>
      )}

      {hasPdf && (
        <section>
          <div>
            <h3 className="text-lg font-semibold mb-3">Available Downloads:</h3>
            <div className="flex flex-wrap gap-4">
              {(() => {
                const pdfFile = product.mainPdf;

                const pdfUrl = pdfFile.startsWith("http")
                  ? pdfFile
                  : `${process.env.NEXT_PUBLIC_API_BASE_URL}${pdfFile}`;

                const fileName = pdfFile.split("/").pop();

                return (
                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit bg-[#E4DFCC] px-3 py-2 rounded-sm capitalize flex flex-wrap items-center gap-2 hover:bg-[#d9d3bb] transition"
                  >
                    <FaDownload />

                    PDF
                  </a>
                );
              })()}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPrintingEmbroidery;