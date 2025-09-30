"use client"; 
import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CustomTooltip = ({ id, content, children }) => {
  return (
    <div className="inline-block relative">
      {/* children (button, icon ইত্যাদি) */}
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>

      {/* Tooltip */}
      <Tooltip
        id={id}
        place="top"
        effect="solid"
        delayShow={100} // হালকা delay দিতে পারো
        className="!bg-black !text-white !text-xs !px-2 !py-1 rounded-md shadow-md 
                   transform translate-y-2 opacity-0 transition-all duration-300 ease-out 
                   data-show:translate-y-0 data-show:opacity-100"
      />
    </div>
  );
};

export default CustomTooltip;
