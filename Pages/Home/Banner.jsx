"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const Banner = ({ slides }) => {
  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full h-[50vh] md:h-[78vh] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">No banners to display.</p>
      </section>
    );
  }
  return (
    <section className="relative w-full h-[50vh] md:h-[78vh] bg-gray-200 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id} className="relative w-full h-full">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  slide.image?.startsWith("http")
                    ? slide.image
                    : img_api + slide.image
                })`,
              }}
            />
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="max-w-6xl mx-auto w-full px-4 lg:px-2">
                <div className="max-w-xl text-left">
                  <p className="text-xs sm:text-sm md:text-base font-normal text-gray-900 uppercase tracking-wider">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-gray-900 font-light mt-2 sm:mt-4 leading-tight">
                    {slide.title1}
                    <br />
                    {slide.title2}
                    <br />
                    <span className="font-bold">{slide.titleBold}</span>
                  </h1>
                  <button className="mt-4 sm:mt-6 md:mt-8 bg-gray-900 text-white px-3 sm:px-4 lg:px-8 py-1.5 sm:py-2 lg:py-3 hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
