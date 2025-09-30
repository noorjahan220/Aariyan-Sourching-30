'use client'
import React, { useState } from "react";
import { Range } from "react-range";

const PriceRangeSlider = ({ min = 100, max = 500, step = 1, onChange }) => {
  const [values, setValues] = useState([171, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange({ min: newValues[0], max: newValues[1] });
    }
  };

  return (
    <div className="w-full max-w-xs  bg-white mb-6">
      {/* Title */}
      <div className="mb-10">
        <h3 className="text-sm font-bold tracking-wide uppercase">Price</h3>
        <div className="mt-2 mb-4 relative">
          <div className="absolute top-0 w-full h-0.5 bg-gray-100"></div>
          <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
        </div>
      </div>

      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="h-1 w-full rounded bg-gray-300 relative"
              style={{ ...restProps.style }}
            >
              <div
                className="absolute h-1 bg-yellow-500 rounded"
                style={{
                  left: "0%",
                  width: `${((values[0] - min) / (max - min)) * 100}%`,
                }}
              ></div>
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="h-4 w-4 rounded-full bg-white border-2 border-gray-500 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            />
          );
        }}
      />

      <div className="flex justify-between items-center mt-4">
        <div className="text-base font-semibold text-black pr-3">
          Price:
          <span className="font-semibold text-black"> ${values[0]}</span> - 
          <span className="font-semibold text-black"> ${values[1]}</span>
        </div>
        <button className="px-5 py-2 bg-gray-100 text-gray-700 text-sm rounded-sm border border-gray-300 hover:bg-gray-200">
          Filter
        </button>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
