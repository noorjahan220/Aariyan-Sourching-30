// FILE: src/components/LatestNewsSection.js (Fully Updated)

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaUser, FaRegComment } from "react-icons/fa";
import { BsDiamondFill } from "react-icons/bs";
import TiptapRenderer from "../../components/TiptapRenderer";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- Helper Functions (Consistent with other components) ---

const safelyParseJSON = (jsonString) => {
  if (!jsonString) return null;
  if (typeof jsonString === 'object') return jsonString;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse blog content JSON:", error);
    return null;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return { day: "00", month: "---" };
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }).toLowerCase(),
  };
};


// --- Article Card Sub-Component (Styled for consistency) ---
const ArticleCard = ({ blog, commentCount }) => {
  if (!blog) return null;

  const postDate = formatDate(blog.createdAt);
  const shortDescriptionJson = safelyParseJSON(blog.shortDescription);

  return (
    <div className="bg-white border border-gray-200 h-full flex flex-col group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${blog._id}`} className="block">
        <div className="relative w-full h-56 bg-gray-200">
          <Image
            src={`${API_URL}${blog.image}`}
            alt={blog.title || 'Blog post image'}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {/* Consistent Date Badge */}
          <div className="absolute top-0 left-0 bg-yellow-400 text-gray-800 text-center flex flex-col px-4 py-1">
            <span className="text-base font-semibold">{postDate.day}</span>
            <span className="text-base tracking-widest">{postDate.month}</span>
          </div>
        </div>
      </Link>
      <div className="p-5 flex-grow flex flex-col">
        <Link href={`/blog/${blog._id}`} className="block">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 mb-3 line-clamp-2">
                {blog.title}
            </h3>
        </Link>
        

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1.5">
            <FaUser /> <span>Admin</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FaRegComment /> <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main LatestNewsSection Component ---
const LatestNewsSection = ({ blogs, commentCounts }) => {


  // This guard clause is crucial. If the blogs prop is empty, it shows a helpful message.
  if (!blogs || blogs.length === 0) {
    return (
        <div className="bg-amber-50 py-16 text-center text-gray-600">
            <h2 className="text-2xl font-semibold">No Recent News</h2>
            <p className="mt-2">Check back later for the latest updates and articles.</p>
        </div>
    );
  }

  return (
    <div className="relative bg-white overflow-hidden px-4 py-5">
      <div className="absolute inset-0 top-1/2 bg-amber-50" aria-hidden="true"></div>
      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Latest News & Blogs
          </h2>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="h-px w-12 bg-gray-300"></div>
            <BsDiamondFill className="text-gray-400" />
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
          <p className="mt-6 text-center text-gray-600 max-w-3xl mx-auto">
            Stay informed with insights into wholesale sourcing, supply chain management,
            and cost-saving strategies for retailers and e-commerce businesses.
          </p>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              nextEl: ".news-swiper-button-next",
              prevEl: ".news-swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="!pb-2" // Add padding for shadow visibility
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id} className="h-auto">
                <div className="h-full">
                    <ArticleCard
                        blog={blog}
                        commentCount={commentCounts[blog._id] || 0}
                    />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="mt-8 flex justify-center items-center space-x-4">
            <button className="news-swiper-button-prev p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm" aria-label="Previous slide">
              &larr;
            </button>
            <button className="news-swiper-button-next p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm" aria-label="Next slide">
              &rarr;
            </button>
        </div>

      </div>
    </div>
  );
};

export default LatestNewsSection;