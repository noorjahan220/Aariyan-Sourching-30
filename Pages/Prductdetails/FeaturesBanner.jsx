'use client'
import React from 'react';
// Using Lucide icons for a clean and consistent look
import { LuTruck, LuUndo2, LuHeadset, LuBadgePercent } from 'react-icons/lu';

// 1. Define the data for the features in an array of objects
const featuresData = [
  {
    Icon: LuTruck,
    title: 'Free Shipping',
    description: 'Free for $50+ orders',
  },
  {
    Icon: LuUndo2,
    title: 'Easy Returns',
    description: '14 Days easy return',
  },
  {
    Icon: LuHeadset,
    title: 'Fast Support',
    description: '24/7 Customer support',
  },
  {
    Icon: LuBadgePercent,
    title: 'Member Discount',
    description: 'Discount for elite members',
  },
];

// 2. Create the main component
const FeaturesBanner = () => {
  return (
    <div className="w-full bg-slate-50 font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-around items-center gap-y-10 gap-x-4">
          {featuresData.map(({ Icon, title, description }, index) => (
            // Use React.Fragment to group each feature item and its potential separator
            <React.Fragment key={title}>
              {/* Feature Item */}
              <div className="flex items-center gap-4">
                <Icon className="h-10 w-10 flex-shrink-0 text-slate-700" />
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500">{description}</p>
                </div>
              </div>

              {/* Vertical Separator: Only shown on medium screens and up, and not after the last item */}
              {index < featuresData.length - 1 && (
                <div className="hidden md:block h-12 w-px bg-slate-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesBanner;