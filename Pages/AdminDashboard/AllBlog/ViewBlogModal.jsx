"use client";
import Image from "next/image";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import TiptapRenderer from "../../../components/TiptapRenderer";

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const ViewBlogModal = ({ blog, onClose }) => {
  if (!blog?._id) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-y-auto h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blog?.image && (
              <div className="w-full rounded-lg overflow-hidden shadow-sm ring-1 ring-gray-200/50 flex justify-center bg-gray-50">
                <Image
                  src={`${img_api}${blog.image}`}
                  alt={blog?.title || "Blog image"}
                  width={500}
                  height={350}
                  className="w-full h-auto max-h-[300px] object-cover"
                />
              </div>
            )}
            <div className="flex flex-col justify-between space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {blog?.title}
              </h1>

              {(blog?.metaTitle || blog?.metaDescription) && (
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">SEO Details</h3>
                  {blog?.metaTitle && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">Meta Title</span>
                      <p className="text-sm text-gray-800 mt-1 break-words">{blog.metaTitle}</p>
                    </div>
                  )}
                  {blog?.metaDescription && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">Meta Description</span>
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{blog.metaDescription}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Category:</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  {blog?.category}
                </span>
              </div>
            </div>
          </div>

          {blog?.shortDescription && (
            <div className="prose prose-lg max-w-none text-gray-800 font-medium border-b border-gray-200 pb-6">
              <TiptapRenderer content={blog.shortDescription} />
            </div>
          )}

          {blog?.content && (
            <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed">
              <TiptapRenderer content={blog.content} />
            </div>
          )}

          {blog?.note && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-sm italic text-yellow-900">{blog.note}</p>
            </div>
          )}

          {blog?.authorName && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                About the Author
              </h3>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {blog.authorImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={`${img_api}${blog.authorImage}`}
                      alt={blog.authorName}
                      width={100}
                      height={100}
                      className="rounded-full w-24 h-24 object-cover border-2 border-gray-100 shadow-sm"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <p className="text-lg font-bold text-gray-900">
                    {blog.authorName}
                  </p>
                  {blog.authorBio && (
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      {blog.authorBio}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    {blog.authorSocialLink1 && (
                      <a href={blog.authorSocialLink1} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600" title="Facebook">
                        <FaFacebook size={20} />
                      </a>
                    )}
                    {blog.authorSocialLink2 && (
                      <a href={blog.authorSocialLink2} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600" title="Instagram">
                        <FaInstagram size={20} />
                      </a>
                    )}
                    {blog.authorSocialLink3 && (
                      <a href={blog.authorSocialLink3} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700" title="LinkedIn">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {blog?.tags && (
            <div className="flex items-center flex-wrap gap-3 pt-6 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              {blog.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogModal;