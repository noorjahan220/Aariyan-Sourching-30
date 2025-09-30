"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaListUl, FaFilter, FaTimes } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ProductCategory from "../../components/ProductCategory";
import ProductSustainability from "../../components/ProductSustainability";
import Gender from "../../components/Gender";
import SizeFilter from "../../components/ShopCategory/SizeFilter";
import ProductColor from "../../components/ProductColor";
import ProductFit from "../../components/ProductFit";
import CommonBanner from "../../components/CommonBanner";
import ProductList from "../../components/ShopProducts/ProductList";
import LoadingSpinner from "../../components/LoadingSpinner";
import Brand from "../../components/ShopCategory/Brand";
import { IoRefreshOutline } from "react-icons/io5";
import { useFilter } from "../../Context/FilterContext";

const shop_banner_img =
  "https://i.ibb.co/5hf33NVK/gifts-golden-shopping-cart-with-copy-space.jpg";

const ShopPageContent = () => {
  const [viewType, setViewType] = useState("grid");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state for mobile

  const filter = useFilter();
  if(!filter) return null;

  const {resetFilters,
    setSelectedCategory,
    setSelectedSubCategory,
    setSelectedSearchQuery,} = filter

  // const {
  //   resetFilters,
  //   setSelectedCategory,
  //   setSelectedSubCategory,
  //   setSelectedSearchQuery,
  // } = useFilter();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const search = searchParams.get("search");

    if (category) {
      setSelectedCategory(category);
    }
    if (subCategory) {
      setSelectedSubCategory(subCategory);
    }
    if (search) {
      setSelectedSearchQuery(search);
    }
  }, [
    searchParams,
    setSelectedCategory,
    setSelectedSubCategory,
    setSelectedSearchQuery,
  ]);

  const handleReset = () => {
    resetFilters();
    router.push("/shop");
    setIsSidebarOpen(false); // Reset করার পর সাইডবার বন্ধ করে দিন
  };

  return (
    <section className="products_shop">
      <CommonBanner
        title={"Shop"}
        breadcrumb={"Shop"}
        backgroundImage={shop_banner_img}
      />

      <div className="product-listing-page w-full max-w-6xl mx-auto px-4 py-10 sm:py-14 lg:grid grid-cols-12 gap-8 justify-between relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          ></div>
        )}

        {/* Sidebar Filters */}
        <aside
          className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-white p-6 shadow-xl z-40 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-full lg:h-auto lg:col-span-3 lg:p-0 lg:bg-transparent lg:shadow-none lg:z-auto`}
        >
          {/* Mobile Sidebar Header */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:gap-5 h-full overflow-y-auto pb-16 lg:h-auto lg:overflow-y-visible">
            <ProductCategory />
            <Brand />
            <SizeFilter />
            <ProductColor />
            <ProductSustainability />
            <Gender />
            <ProductFit />
          </div>
        </aside>

        {/* Product Listing Content */}
        <main className="product-listing-content w-full lg:col-span-9">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            {/* Filter Icon for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-base px-4 py-1.5 rounded-lg text-black font-semibold bg-gray-200 hover:bg-gray-300 cursor-pointer flex items-center gap-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>

            {/* Reset Button */}
      <button
  onClick={handleReset}
  className="flex items-center gap-2 text-base px-4 py-1.5 rounded-lg text-black font-semibold bg-yellow-400 hover:bg-amber-500 cursor-pointer transition-colors"
>
  <IoRefreshOutline size={18} />
  Reset
</button>

            {/* View Type Toggles */}
            <div className="flex items-center gap-3 ml-auto">
              <button
                className={`text-lg p-2 rounded ${
                  viewType === "grid"
                    ? "bg-yellow-400 text-black cursor-pointer"
                    : "bg-gray-100 text-gray-500 cursor-pointer"
                }`}
                onClick={() => setViewType("grid")}
              >
                <BsFillGrid3X3GapFill />
              </button>
              <button
                className={`text-lg p-2 rounded ${
                  viewType === "list"
                    ? "bg-yellow-400 text-black cursor-pointer"
                    : "bg-gray-100 text-gray-500 cursor-pointer"
                }`}
                onClick={() => setViewType("list")}
              >
                <FaListUl />
              </button>
            </div>
          </div>

          <div className="product_list mt-6 lg:mt-0">
            <ProductList viewType={viewType} />
          </div>
        </main>
      </div>
    </section>
  );
};

const Shop = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopPageContent />
    </Suspense>
  );
};

export default Shop;