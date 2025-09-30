"use client";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaDownload } from "react-icons/fa";

const ResourceCard = ({ card, onViewClick }) => {
  const { id, title, description, image, pageUrl, pdfUrl } = card;


  const handleViewAction = () => {
   
    if (onViewClick) {
      onViewClick(); 
    } else {
     
      if (pdfUrl) {
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-transform">
      <Link href={pageUrl} className="flex flex-col flex-grow">
        <div className="relative w-full aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-xl font-semibold mt-3">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </Link>
      <button
    
        onClick={handleViewAction}
        className="mt-4 mx-auto bg-[#eae8e1] hover:bg-[#dcd9d1] text-gray-800 py-2 px-6 rounded-md flex items-center gap-2"
      >
        <FaEye /> View
      </button>
      {id === 6 && (
        <a
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/download-pdf/all-products`}
          download
          className="mt-4 mx-auto bg-[#eae8e1] hover:bg-[#dcd9d1] text-gray-800 py-2 px-6 rounded-md flex items-center gap-2"
        >
          <FaDownload /> Download Product Data
        </a>
      )}
    </div>
  );
};

export default ResourceCard;