'use client';

import { FaTag, FaUser, FaRegComment, FaArrowRight } from "react-icons/fa";
import CommonBanner from "../CommonBanner";
import Image from "next/image";
import Link from "next/link";
import BlogPostCard from "./BlogPostCard";
import TiptapRenderer from "../TiptapRenderer";

// Helper function to safely parse JSON content
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

const Blog = ({ blogs, commentCounts }) => {
  // Guard clause for when no blogs are fetched
  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <CommonBanner title={"blog"} breadcrumb={"blog"} />
        <p className="text-center py-20 text-lg text-gray-700">No blog posts found.</p>
      </div>
    );
  }

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const featuredDate = formatDate(featuredBlog.createdAt);
  
  const featuredShortDescriptionJson = safelyParseJSON(featuredBlog.shortDescription);
  const api_url = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  return (
    <div>
      <CommonBanner title={"blog"} breadcrumb={"blog"} />

      {/* Featured Blog Section */}
      <div className="bg-white grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-10 md:px-16 lg:px-32 my-10">
        <div className="relative max-w-6xl mx-auto h-[250px] lg:h-auto w-full bg-gray-200">
          <Image
            src={`${api_url}${featuredBlog.image}`}
            alt={featuredBlog.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority // Load the main featured image faster
          />
          <div className="absolute top-0 left-0 bg-yellow-400 text-gray-800 text-center flex flex-col px-4 py-1">
            <span className="text-base font-semibold">
              {featuredDate.day}
            </span>
            <span className="text-base tracking-widest">
              {featuredDate.month}
            </span>
          </div>
        </div>
        <div className="relative w-full px-8 pt-8 bg-[#EFEFEF]">
          <div className="pb-16">
            <h2 className="text-3xl font-semibold text-[#262626] mb-4 line-clamp-2">
              {featuredBlog.title}
            </h2>
            {featuredShortDescriptionJson && (
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-4 line-clamp-4">
                <TiptapRenderer jsonContent={featuredShortDescriptionJson} />
              </div>
            )}
            <div className="flex items-center space-x-6 text-gray-500 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <FaUser />
                <span>Admin</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaRegComment />
                <span>{commentCounts[featuredBlog._id] || 0}</span>
              </div>
            </div>
            {featuredBlog.tags && (
              <div className="flex items-center flex-wrap gap-2 mb-10">
                <FaTag className="text-gray-500" />
                {featuredBlog.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 text-3xl sm:text-4xl lg:text-6xl font-semibold text-[#E3E3E3] select-none pl-6 pointer-events-none">
            {featuredBlog.category.toUpperCase()}
          </div>
          <Link
            href={`/blog/${featuredBlog._id}`}
            className="absolute bottom-0 right-0 bg-yellow-400 p-6 hover:bg-yellow-500 transition-colors"
            aria-label={`Read more about ${featuredBlog.title}`}
          >
            <FaArrowRight className="text-2xl text-gray-800" />
          </Link>
        </div>
      </div>

      {/* Other Blogs Section */}
      <div className="px-4 sm:px-10 md:px-16 lg:px-32 py-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBlogs.map((blog) => (
            <BlogPostCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;