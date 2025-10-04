"use client";
import { useState, useMemo } from "react";

import Link from "next/link";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import CustomStarRating from "./CustomStarRating";
import BrandLogoSwiper from "./BrandLogoSwiper";
import SizeChartModal from "./SizeChartModal";
import AskAnyQuestionModal from "./AskAnyQuestionModal";
import WishlistCompare from "../Pages/Shop/WishlistCompare";
import ProductImageGallery from "./ProductImageGallery";
import { IoChatbubblesSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import useAuth from "../Hooks/useAuth";

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductDetailsClient = ({ myProductData }) => {
  const {user} = useAuth();
    const pathname = usePathname();
  const sizeChartImg = `${img_api}${myProductData?.sizeChartImage}`;

const allAvailableSizes = useMemo(() => {
    if (!myProductData?.availabelVarients) {
      return [];
    }
  
    const sizes = myProductData.availabelVarients.flatMap((variant) =>
      variant.availableSize.map((sizeObj) => sizeObj.value)
    );
  
    return [...new Set(sizes)];
  }, [myProductData]);

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainImage =
    myProductData?.mainImage || myProductData?.galleryImages?.[0];
  const galleryImages = myProductData?.galleryImages || [];

  const socialMediaLinks = [
    {
      name: "Facebook",
      logo: (
        <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition"></FaFacebook>
      ),
      url: myProductData?.socialMedia?.facebook,
    },
    {
      name: "Twitter",
      logo: (
        <FaTwitter className="text-sky-500 text-2xl hover:scale-110 transition"></FaTwitter>
      ),
      url: myProductData?.socialMedia?.twitter,
    },
    {
      name: "Instagram",
      logo: (
        <FaInstagram className="text-pink-600 text-2xl hover:scale-110 transition"></FaInstagram>
      ),
      url: myProductData?.socialMedia?.instagram,
    },
    {
      name: "LinkedIn",
      logo: (
        <FaLinkedin className="text-blue-700 text-2xl hover:scale-110 transition"></FaLinkedin>
      ),
      url: myProductData?.socialMedia?.linkedIn,
    },
  ];

  return (
    <main>
      <section className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12  py-10">
        <ProductImageGallery
          mainImage={mainImage}
          galleryImages={galleryImages}
          img_api={img_api}
        />

        <div className="product_details p-6 space-y-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {myProductData?.title}
            </h1>
            <p className="text-base text-gray-800 font-normal">
              {myProductData?.productCode}
            </p>
          </div>

          <div>
            <p className="text-base text-gray-600 break-words">
              {myProductData?.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 my-3">
            <span className="uppercase bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition duration-300">
              {myProductData?.productCategory}
            </span>
            <span className="uppercase bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-green-200 shadow-sm hover:shadow-md transition duration-300">
              {myProductData?.productSubCategory}
            </span>
            <span className="uppercase bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-purple-200 shadow-sm hover:shadow-md transition duration-300">
              {myProductData?.brand}
            </span>
          </div>
          {allAvailableSizes.length > 0 && (
            <div className="mt-4">
              <span className="text-sm text-black uppercase tracking-wide font-semibold shrink-0">
                Available Sizes :
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {allAvailableSizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 text-sm font-medium border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 hover:border-gray-900 transition-colors uppercase"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              {myProductData?.colors?.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-md border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color?.code }}
                ></span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CustomStarRating rating={5} />
            <span className="text-gray-500 text-sm">(200 reviews)</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-between">
            <span className="px-3 py-1 text-sm font-medium border border-gray-200 rounded-lg">
              {myProductData?.GSM_Code} GSM
            </span>
            <span className="px-3 py-1 text-sm font-medium border border-gray-200 rounded-lg uppercase">
              {myProductData?.fit}
            </span>
            <span className="px-3 py-1 text-sm font-medium border border-gray-200 rounded-lg uppercase">
              {myProductData?.Sustainability}
            </span>
          </div>

          <div
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-sm font-semibold text-black transition block cursor-pointer underline hover:text-yellow-600"
          >
            Size chart
          </div>

            {pathname !== '/admindashboard' && (
                   <div className="flex gap-5">
            <Link
              href="/order"
              className="w-[180px] py-2 my-4 font-semibold rounded-md bg-[#ffbb42] text-lg capitalize flex justify-center items-center"
            >
              shop now
            </Link>
            <Link
              href={user ? "/myaccount?tab=Messages" : "/login"} // Add "?tab=Messages"
              className="w-[180px] py-2 my-4 font-semibold rounded-md border-2 border-[#ffbb42] hover:bg-[#ffbb42] text-lg capitalize flex justify-center items-center"
            >
              <IoChatbubblesSharp></IoChatbubblesSharp>
              <span className="pl-2">chat now</span>
            </Link>
          </div>
            )

          }
       

          <BrandLogoSwiper
            brandLogo={myProductData?.brandLogo}
            img_api={img_api}
          />

            {pathname !== '/admindashboard' && (


          <div className="flex justify-between items-center">
            <div>
              <WishlistCompare myProductData={myProductData} />
            </div>
            <p
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-black hover:text-yellow-600 transition cursor-pointer"
            >
              Any Questions ?
            </p>
          </div>
            )}


          {socialMediaLinks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">
                Follow Us:
              </h3>
              <div className="flex gap-4">
                {socialMediaLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    {item.logo}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {isSizeGuideOpen && (
        <SizeChartModal
          sizeChartImg={sizeChartImg}
          setIsSizeGuideOpen={setIsSizeGuideOpen}
        ></SizeChartModal>
      )}

        {pathname !== '/admindashboard' && (
          <AskAnyQuestionModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      ></AskAnyQuestionModal>
        )}
    </main>
  );
};

export default ProductDetailsClient;