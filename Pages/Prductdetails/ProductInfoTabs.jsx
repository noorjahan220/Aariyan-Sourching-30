'use client'
import React from 'react';

const ProductInfoTabs = () => {

  const specificationsData = [
    { label: 'Product Type', value: 'Tops & Tunics' },
    { label: 'Brand', value: 'Honey By Pantaloons' },
    { label: 'Product Code', value: 'PANPANT' },
    { label: 'Sales Package', value: '1' },
    { label: 'Combo', value: 'Single' },
    { label: 'Color', value: 'Green' },
    { label: 'Size', value: 'M' },
    { label: 'Material', value: 'Cotton' },
    { label: 'Occasion', value: 'Casual' },
  ];

  return (
    <div className="w-full  font-sans bg-[#F9F9F9] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20  py-10 ov">
      {/* DaisyUI Radio Tabs */}
      <div className="tabs tabs-bordered">
        {/* Specifications Tab */}
        <input
          type="radio"
          name="product_tabs_unique"
          className="tab"
          aria-label="Specifications"
          defaultChecked
        />
        <div className="tab-content  p-3">
          <p className="text-gray-600 mb-8 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div>
              <dl>
                {specificationsData.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 py-2 ">
                    <dt className="font-bold text-gray-800">{item.label}</dt>
                    <dd className="text-gray-600">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <dl>
                {specificationsData.slice(0, 6).map((item, index) => (
                  <div key={index} className="grid grid-cols-2 py-2">
                    <dt className="font-bold text-gray-800">{item.label}</dt>
                    <dd className="text-gray-600">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Additional Information Tab */}
        <input
          type="radio"
          name="product_tabs_unique"
          className="tab"
          aria-label="Additional information"
        />
        <div className="tab-content border-base-300 bg-base-100 p-6">
          Content for Additional Information.
        </div>

        {/* Reviews Tab */}
        <input
          type="radio"
          name="product_tabs_unique"
          className="tab"
          aria-label="Reviews (6)"
        />
        <div className="tab-content border-base-300 bg-base-100 p-6">
          Content for Reviews.
        </div>

        {/* Return Policy Tab */}
        <input
          type="radio"
          name="product_tabs_unique"
          className="tab"
          aria-label="Return Policy"
        />
        <div className="tab-content border-base-300 bg-base-100 p-6">
          Content for Return Policy.
        </div>
      </div>

      {/* Active tab color customization */}
      <style jsx>{`
        .tabs-bordered .tab:checked {
          border-color: #ffbb42;
          color: #1F2937; /* gray-800 */
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default ProductInfoTabs;