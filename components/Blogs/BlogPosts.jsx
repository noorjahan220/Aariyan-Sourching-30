"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BlogPostCard from "./BlogPostCard";
import LoadingSpinner from "../LoadingSpinner";

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/BlogPosts.json");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const offset = currentPage * cardsPerPage;
  const currentPosts = posts.slice(offset, offset + cardsPerPage);
  const pageCount = Math.ceil(posts.length / cardsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="mb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-10 flex justify-center items-center">
            <ReactPaginate
              previousLabel={<FaArrowLeft className="text-xl text-[#ffbb42]" />}
              nextLabel={<FaArrowRight className="text-xl text-[#ffbb42]" />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-md"
              pageLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-[#ffbb42] hover:text-white transition cursor-pointer"
              activeLinkClassName="bg-[#ffbb42] text-white border-[#ffbb42] font-semibold"
              previousClassName="cursor-pointer"
              nextClassName="cursor-pointer"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPosts;
