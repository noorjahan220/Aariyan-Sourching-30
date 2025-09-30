"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaTag, FaUser, FaComment } from "react-icons/fa";
import { BsDiamondFill } from "react-icons/bs";
import LoadingSpinner from "../../components/LoadingSpinner";

const extractTextFromLexical = (jsonString) => {
  if (!jsonString) return "";
  try {
    const data = JSON.parse(jsonString);
    let text = "";
    function traverse(node) {
      if (node.type === "text" && node.text) text += node.text + " ";
      if (node.children) node.children.forEach(traverse);
    }
    traverse(data.root);
    return text.trim();
  } catch (e) {
    return "Lorem ipsum dolor sit amet...";
  }
};

const ArticleCard = ({ article, commentCount }) => {
   if(!article ) return <LoadingSpinner/>
  const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${article.image}`;
  const date = new Date(article.createdAt);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const shortDescription = extractTextFromLexical(article.shortDescription);

  return (
    <div className="bg-white shadow-lg h-full flex flex-col">
      <div className="relative">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 left-4 bg-amber-400 text-zinc-800 w-14 h-14 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{day}</span>
          <span className="text-xs uppercase">{month}</span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-amber-500 transition-colors duration-300">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 flex-grow">
          {shortDescription.length > 100
            ? `${shortDescription.substring(0, 100)}...`
            : shortDescription}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1.5">
            <FaTag /> <span>{article.category || "General"}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FaUser /> <span>Admin</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <FaComment /> <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestNewsSection = ({ articles, commentCounts }) => {
  if(!articles ) return <LoadingSpinner/>
  return (
    <div className="relative bg-white overflow-hidden px-4 mb-5">
      <div
        className="absolute inset-0 top-1/2 bg-amber-50"
        aria-hidden="true"
      ></div>
      <div className="relative container mx-auto max-w-6xl py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Our latest news & blogs
          </h2>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="h-px w-12 bg-gray-300"></div>
            <BsDiamondFill className="text-gray-400" />
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </div>

        <div className="relative mt-4">
          <p className="text-center text-gray-500 max-w-5xl mx-auto">
            Stay informed with the latest news and blogs from Aaryan Sourcing!
            Discover insights into wholesale sourcing, supply chain management,
            and cost-saving strategies. Our blogs provide useful tips for
            retailers and e-commerce businesses looking to enhance their
            sourcing approaches. Visit us now for new updates and expert
            guidance.
          </p>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:flex items-center space-x-2">
            <button className="news-swiper-button-prev text-gray-600 text-xl">
              &larr;
            </button>
            <button className="news-swiper-button-next text-gray-600 text-xl">
              &rarr;
            </button>
          </div>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={32}
            slidesPerView={3}
            navigation={{
              nextEl: ".news-swiper-button-next",
              prevEl: ".news-swiper-button-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article._id}>
                <Link href={`/blog/${article._id}`} className="block h-full">
                  <ArticleCard
                    article={article}
                    commentCount={commentCounts[article._id] || 0}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection;
