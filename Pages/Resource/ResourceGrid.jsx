"use client";
import ResourceCard from "../../components/ResourceCard";
import { useState } from "react";
import AskAnyQuestionModal from "../../components/AskAnyQuestionModal";
const ResourceGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resourceCardData = [
    {
      id: 1,
      title: "Online Lookbook",
      description: "Discover Trendy Fashion and Style Inspiration",
      image:
        "https://i.ibb.co/dwqjG5qC/Online-Lookbook-Discover-Trendy-Fashion-and-Style-Inspiration.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/lookbook",
    },
    {
      id: 2,
      title: "Colour Card",
      description:
        "Color Palette Collection for Home Design and Decoration Inspiration",
      image:
        "https://i.ibb.co/dwHJ5f5M/Color-Palette-Collection-for-Home-Design-and-Decoration-Inspiration.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/colors",
    },
    {
      id: 3,
      title: "Printing & Embroidery",
      description:
        "Custom Print and Embroidery Services for Apparel and Merchandise",
      image: "https://i.ibb.co/W4x92LqD/printing-embroidery-options.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/printingembroidery",
    },
    {
      id: 4,
      title: "Coat Hangers",
      description: "Premium Coat Hangers for Home and Closet Organization",
      image:
        "https://i.ibb.co/CKrd0M8R/Premium-Coat-Hangers-for-Home-and-Closet-Organization.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "",
    },
    {
      id: 5,
      title: "Size Charts",
      description:
        "Apparel Size Chart – Accurate Measurement Guide for Perfect Fit",
      image:
        "https://i.ibb.co/6cgvVmM5/Apparel-Size-Chart-Accurate-Measurement-Guide-for-Perfect-Fit.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/Sizechart",
    },
    {
      id: 6,
      title: "Product Sheets",
      description: "Download detailed product sheets for our entire range.",
      image: "https://i.ibb.co/Q2wB13W/product-sheets.webp",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/productsheets",
    },
    {
      id: 7,
      title: "Code Of Conduct",
      description:
        "Global Code of Conduct for Ethical Business Practices and Integrity",
      image:
        "https://i.ibb.co/BVgrksys/Global-Code-of-Conduct-for-Ethical-Business-Practices-and-Integrity.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/codeofconduct",
    },
    {
      id: 8,
      title: "Exclusive Style & Comfort",
      description:
        "Premium Women's Black Hoodie – Apparel Exclusive Style & Comfort",
      image:
        "https://i.ibb.co/DfsTyKxx/Premium-Women-s-Black-Hoodie-Apparel-Exclusive-Style-Comfort.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/exclusive",
    },
    {
      id: 9,
      title: "Type of Fabric",
      description: "Types of Fabric Guide to Popular Materials for Apparel",
      image:
        "https://i.ibb.co/xK3SBqm9/Types-of-Fabric-Guide-to-Popular-Materials-for-Apparel.jpg",
      pdfUrl: "/LookBook-Image/Lookbook-final-14-9-25.pdf",
      pageUrl: "/FabricShowcase",
    },
  ];
  const openContactModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {resourceCardData.map((card) => (
          <ResourceCard
            key={card.id}
            card={card}
            onViewClick={card.id === 4 ? openContactModal : null}
          />
        ))}
      </div>

      <AskAnyQuestionModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      ></AskAnyQuestionModal>
      {/* <div
        className={`fixed bottom-8 right-8 w-80 bg-white rounded-lg shadow-2xl p-6 transition-all duration-500 ease-in-out z-50 ${
          isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
          <button
            onClick={() => setIsModalOpen(false)} 
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <IoClose size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          We are happy to answer your questions. Contact us by phone or email.
        </p>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center">
            <BsTelephoneFill className="w-5 h-5 mr-3 text-gray-500" />
            <span>+8801713-117849</span>
          </div>
          <div className="flex items-center">
            <MdEmail className="w-5 h-5 mr-3 text-gray-500" />
            <span>aasourcingltd77@gmail.com</span>
          </div>
        </div>
        <div className="border-t mt-6 pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Monday - Thursday</p>
              <p>08:30h - 17:00h GMT+6</p>
            </div>
            <div>
              <p className="font-semibold">Friday</p>
              <p>08:30h - 14:30h GMT+6</p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ResourceGrid;
