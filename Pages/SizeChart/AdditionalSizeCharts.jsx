// File: AdditionalSizeCharts.js
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const AdditionalSizeCharts = () => {
  const [sizeChartImages, setSizeChartImages] = useState([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await fetch(`${img_api}/size-charts`);
        if (!response.ok) throw new Error('Failed to fetch size charts');
        const data = await response.json();
        setSizeChartImages(data);
      } catch (error) {
        console.error("Error fetching size charts:", error);
      } finally {
      }
    };
    fetchCharts();
  }, []);


  if (sizeChartImages.length === 0) {
    // Don't render the section if there are no charts
    return null; 
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 mb-8">
          Additional Size Charts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sizeChartImages.map((chart) => (
            <div key={chart._id}>
              {/* Note: The 'Image' component from Next.js requires width/height.
                  If your images are not uniform, you might need to use a standard <img> tag
                  or find a way to get dimensions from the backend.
                  For simplicity, we'll assume a standard aspect ratio here. */}
              <Image
                src={`${img_api}${chart.src}`}
                alt={chart.alt}
                width={600}
                height={700}
                className="w-full h-auto"
                priority // Preload the first image for better LCP
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalSizeCharts;