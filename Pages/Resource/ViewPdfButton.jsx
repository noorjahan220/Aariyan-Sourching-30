// File: components/ViewPdfButton.js
'use client';

import React from "react";
import { FaEye } from "react-icons/fa";

const ViewPdfButton = ({ pdfUrl }) => {
  const handleViewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      onClick={handleViewPdf}
      className="mt-4 mx-auto bg-[#eae8e1] hover:bg-[#dcd9d1] text-gray-800 py-2 px-6 rounded-md flex items-center gap-2"
    >
      <FaEye /> View
    </button>
  );
};

export default ViewPdfButton;