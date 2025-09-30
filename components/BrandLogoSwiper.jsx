"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const BrandLogoSwiper = ({ brandLogo = [], img_api }) => {
  if (!brandLogo?.length) return null;

  return (
    <div className="mt-8">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 15 },
          640: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 30 },
        }}
        className="px-4"
      >
        {brandLogo.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <Image
                src={`${img_api}${logo}`}
                alt={`brand-${index}`}
                width={160}
                height={64}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandLogoSwiper;