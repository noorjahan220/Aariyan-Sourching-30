"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Head from "next/head";
import { FaRegComment, FaTag, FaUser } from "react-icons/fa";
import CommonBanner from "./CommonBanner";
import CommentForm from "./Blogs/BlogsDetails/CommentForm";
import SidebarCategories from "./Blogs/BlogsDetails/SidebarCategories";
import TagsSection from "./Blogs/BlogsDetails/TagsSection";
import BlogArchive from "./Blogs/BlogsDetails/BlogArchive";
import Comments from "./Blogs/BlogsDetails/Comments";
import LoadingSpinner from "./LoadingSpinner";
import TiptapRenderer from "./TiptapRenderer";

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to safely parse JSON strings from the database
const safelyParseJSON = (jsonString) => {
  if (!jsonString) return null;
  if (typeof jsonString === "object") return jsonString; // It's already an object
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse content JSON:", error);
    return null; // Return null on parsing error
  }
};

const BlogDetails = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    try {
      setCommentsLoading(true);
      const response = await fetch(`${api_url}/comments?blogId=${id}`);
      const data = await response.json();
      setComments(data || []);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setCommentsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api_url}/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [id, fetchComments]);

  const formatDate = (dateString) => {
    if (!dateString) return { day: "00", month: "---" };
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { day: "2-digit" }),
      month: date.toLocaleDateString("en-US", { month: "short" }).toLowerCase(),
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-lg text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-lg">Blog post not found.</div>
    );
  }

  const postDate = formatDate(blog.createdAt);
  const shortDescriptionJson = safelyParseJSON(blog.shortDescription);
  const contentJson = safelyParseJSON(blog.content);

  // Construct meta image URL, fallback to main image
  const metaImageUrl = blog.metaImage
    ? `${api_url}${blog.metaImage}`
    : blog.image
    ? `${api_url}${blog.image}`
    : "";

  return (
    <main>
      {/* SEO HEAD SECTION */}
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription} />
        {blog.metaKeywords && <meta name="keywords" content={blog.metaKeywords} />}
        {blog.metaRobots && <meta name="robots" content={blog.metaRobots} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.ogTitle || blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.ogDescription || blog.metaDescription} />
        {metaImageUrl && <meta property="og:image" content={metaImageUrl} />}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={blog.twitterTitle || blog.ogTitle || blog.metaTitle || blog.title} />
        <meta property="twitter:description" content={blog.twitterDescription || blog.ogDescription || blog.metaDescription} />
        {metaImageUrl && <meta property="twitter:image" content={metaImageUrl} />}
      </Head>

      <CommonBanner title={"blog"} breadcrumb={"blog details"} />

      <section className="max-w-6xl mx-auto py-6 flex flex-col-reverse lg:flex-row gap-6 px-4 sm:px-6">
        <div className="bg-white lg:w-[70%]">
          <div className="relative w-full h-[400px] bg-[#D6D6D6]">
            {blog.image && (
              <Image
                src={`${api_url}${blog.image}`}
                alt={blog.mainImageAltText || blog.title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
            <div className="absolute top-0 left-0 bg-yellow-400 text-gray-800 text-center flex flex-col px-4 py-1">
              <span className="text-base font-semibold">{postDate.day}</span>
              <span className="text-base tracking-widest">{postDate.month}</span>
            </div>
          </div>

          <div className="p-4 sm:p-0">
            <h2 className="text-3xl font-semibold text-[#262626] my-4">{blog.title}</h2>
            <div className="flex items-center space-x-6 text-gray-500 mb-4">
              <div className="flex items-center space-x-2"><FaTag /><span>{blog.category}</span></div>
              <div className="flex items-center space-x-2"><FaUser /><span>Admin</span></div>
              <div className="flex items-center space-x-2"><FaRegComment /><span>{comments.length}</span></div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-0">
            <div className="max-w-4xl mx-auto">
              {shortDescriptionJson && (
                <div className="prose max-w-none text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                  <TiptapRenderer jsonContent={shortDescriptionJson} />
                </div>
              )}
              <div className="prose max-w-none text-gray-600 text-sm leading-relaxed">
                <TiptapRenderer jsonContent={contentJson} />
              </div>
              {blog.note && (
                <blockquote className="bg-gray-50 border-l-2 border-amber-400 p-6 my-8">
                  <p className="italic text-gray-700 leading-relaxed">{blog.note}</p>
                </blockquote>
              )}
            </div>
          </div>

          <div className="bg-white py-8 px-4 sm:p-0 font-sans">
            <Comments comments={comments} loading={commentsLoading} />
          </div>
          <div className="my-10 text-black p-4 sm:p-0">
            <CommentForm blogId={blog?._id} onCommentPosted={fetchComments} />
          </div>
        </div>

        <aside className="blog_sidebar w-full lg:w-[30%] px-4 sm:px-0">
          <SidebarCategories />
          <TagsSection />
          <BlogArchive />
        </aside>
      </section>
    </main>
  );
};

export default BlogDetails;