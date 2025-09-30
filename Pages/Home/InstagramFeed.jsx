"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const InstagramIcon = () => (
  <svg
    className="w-5 h-5 text-gray-800"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- Image URLs as variables ---
const img_1 = "/instagram-01.jpg";
const img_2 = "/instagram-02.jpg";
const img_3 = "/instagram-03.jpg";
const img_4 = "/instagram-04.jpg";
const img_5 = "/instagram-05.jpg";
const img_6 = "/instagram-06.jpg";
// const img_7 = '/public/instagram-01.jpg';
// const img_8 = '/public/instagram-01.jpg';

const images = [img_1, img_2, img_3, img_4, img_5, img_6];

const InstagramFeed = () => {
  return (
    <section className="bg-white pt-5 sm:pt-5 mb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Follow@Instagram
          </h2>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="h-px w-12 bg-gray-300"></div>
            <InstagramIcon />
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </div>
        <div className="relative mt-4">
          <p className="text-center text-gray-500 max-w-5xl mx-auto">
            Follow Aaryan Sourcing on Instagram @AaryanSourcing for the best in
            wholesale sourcing and supply chain solutions. Stay updated with
            top-quality products, cost-effective sourcing options, and business
            insights. Perfect for retailers and e-commerce owners looking for
            reliable suppliers. Follow now
          </p>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:flex items-center space-x-2">
            <button className="instagram-swiper-button-prev text-gray-600 text-xl">
              &larr;
            </button>
            <button className="instagram-swiper-button-next text-gray-600 text-xl">
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Swiper
          modules={[Navigation]}
          spaceBetween={2}
          slidesPerView={6}
          loop={true}
          navigation={{
            nextEl: ".instagram-swiper-button-next",
            prevEl: ".instagram-swiper-button-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 2 },
            640: { slidesPerView: 3, spaceBetween: 2 },
            1024: { slidesPerView: 6, spaceBetween: 2 },
          }}
          className="w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square bg-gray-200">
                <img
                  src={src}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InstagramFeed;
