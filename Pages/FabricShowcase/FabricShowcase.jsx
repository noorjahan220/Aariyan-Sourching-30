"use client";
import { useState } from "react";
import Image from "next/image";
import { fabricData } from "../../Data/fabricData";
import CommonBanner from "../../components/CommonBanner";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const FabricShowcase = () => {
  const mainTabs = Object.keys(fabricData);

  const [activeMainTab, setActiveMainTab] = useState(mainTabs[0]);
  const [activeSubTab, setActiveSubTab] = useState(
    fabricData[mainTabs[0]][0].id
  );

  const handleMainTabClick = (tabName) => {
    setActiveMainTab(tabName);
    setActiveSubTab(fabricData[tabName][0].id);
  };

  const currentTabData = fabricData[activeMainTab] || [];
  const currentContent = currentTabData.find(
    (item) => item.id === activeSubTab
  )?.content;

  return (
    <div className="bg-white">
      <CommonBanner
        breadcrumb="Fabric "
        backgroundImage={"/fabric/fabricbg.jpg"}
      />
      <div className="max-w-6xl mx-auto px-4 lg:px-2  py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold sub_title_color">
            Yarn & Fabric Types Guide
          </h1>
          <p className="mt-4  mx-auto text-lg paragrap">
            Explore our continually expanding selection of yarns and fabrics for
            all your projects. We offer a variety of materials, including
            cotton, polyester, wool, and alpaca. All yarns are carefully
            selected for their durability, softness, and vibrant colors, making
            your project truly stand out. At that, we have nothing better to
            offer in winter comfort (and winter service), summer wear,
            high-performance exercise clothing than that made with our fine
            yarns. In addition to our giant embroidery and yarn dye library, we
            offer a fantastic selection of woven, knit, and special process
            fabrics, all with unique attributes that are perfect for a wide
            range of garments. All of our fabrics are sourced from reputable
            suppliers, ensuring the quality and strength of our products. We can
            obtain specially made textiles for your custom fabric with our
            purchasing expertise. Aaryan Sourcing. Sources the most beautiful
            fabric for clothing, as we recognize its significance. We are your
            one-stop shop for high-quality custom textiles, explicitly developed
            for various products and yarns.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            {mainTabs.map((tabName) => (
              <button
                key={tabName}
                onClick={() => handleMainTabClick(tabName)}
                className={`flex items-center justify-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                  activeMainTab === tabName
                    ? "primary_bg text-black shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tabName} <ArrowIcon />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="space-y-2">
              {currentTabData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium ${
                    activeSubTab === item.id
                      ? "primary_bg text-black shadow"
                      : "bg-gray-100 sub_title_color hover:bg-gray-200"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            {currentContent && (
              <div className="p-6 border border-gray-200 rounded-lg animate-fadeIn">
                <h2 className="text-2xl font-bold sub_title_color">
                  {currentContent.heading}
                </h2>

                {currentContent.subheading && (
                  <p className="mt-2 text-sm font-semibold text-gray-500">
                    {currentContent.subheading}
                  </p>
                )}

                <pre className="mt-4 paragrap leading-relaxed whitespace-pre-wrap font-sans">
                  {currentContent.description}
                </pre>

                <div className="mt-6 w-full h-auto overflow-hidden rounded-lg">
                  <Image
                    src={currentContent.image}
                    alt={currentContent.heading}
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>

                {currentContent.points && currentContent.points.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold sub_title_color">
                      Key Characteristics
                    </h3>
                    <ul className="mt-4 list-disc list-inside space-y-2 paragrap">
                      {currentContent.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricShowcase;
