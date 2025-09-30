"use client";
import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import ProductDetailsData from "../AdminDashboard/ProductDetailsData";
import ProductPrintingEmbroidery from "../AdminDashboard/ProductPrintingEmbroidery";
import ProductTextileCare from "../AdminDashboard/ProductTextileCare";
import AvailableVarients from "../AdminDashboard/AvailableVarients";
import LoadingSpinner from "../../components/LoadingSpinner";
import DownLoad from "../AdminDashboard/DownLoad";

const ProductDetailsTabs = ({ productId,category }) => {
  if (!productId) {
    return <LoadingSpinner />;
  }

  const allTabs = [
    // ... (other tabs remain the same)
    {
      title: "Product Description",
      content: <ProductDetailsData category={category} productId={productId} />,
      isVisible: !!productId,
    },
    {
      title: "Availabel Varients",
      content: <AvailableVarients productId={productId} />,
      isVisible: !!productId,
    },
    {
      title: "Printing & Embroidery",
      content: <ProductPrintingEmbroidery productId={productId} />,
      isVisible: !!productId,
    },
    {
      title: "Textile Care",
      content: <ProductTextileCare productId={productId} />,
      isVisible: !!productId,
    },
    {
      title: "Download",
      // V V V V  THE ONLY CHANGE IS HERE V V V V
      content: <DownLoad productId={productId} />, // Pass the productId as a prop
      // ^ ^ ^ ^  THE ONLY CHANGE IS HERE ^ ^ ^ ^
      isVisible: !!productId,
    },
  ];

  // Filter only visible tabs
  const visibleTabs = allTabs.filter((tab) => tab.isVisible);

  return (
    <div className="w-full max-w-6xl mx-auto px-4  font-sans">
      <Tabs
        className="flex flex-col lg:flex-row w-full rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm"
        focusTabOnClick={false}
      >
        {/* Tab Buttons */}
        <TabList
          className="
            flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3 
            lg:flex-col lg:border-b-0 lg:border-r lg:w-1/4 lg:max-w-[240px]
          "
        >
          {visibleTabs.map((tab, index) => (
            <Tab
              key={index}
              className="
                px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md cursor-pointer 
                transition-colors duration-200 outline-none
                hover:bg-slate-200 hover:text-slate-800
              "
              selectedClassName="!bg-[#ffbb42] !text-black shadow-sm"
            >
              {tab.title}
            </Tab>
          ))}
        </TabList>

        {/* Content Section */}
        <div className="flex-1 p-3 md:p-4 min-h-[500px]">
          {visibleTabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDetailsTabs;
