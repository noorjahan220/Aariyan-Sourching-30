"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../LoadingSpinner";

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const SidebarCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${api_url}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 1) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `${api_url}/blogs/search-titles?q=${searchTerm}`
        );

        if (!response.ok) {
          let errorDetails = `Status: ${response.status} ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorDetails += ` - Message: ${
              errorData.message || JSON.stringify(errorData)
            }`;
          } catch (e) {
            errorDetails += ` - Response body could not be parsed as JSON.`;
          }

          throw new Error(errorDetails);
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleResultClick = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <aside className="bg-white w-full max-w-sm font-sans">
      <div className="relative mb-8" ref={searchContainerRef}>
        <input
          type="text"
          name="search"
          placeholder="Search blogs..."
          className="w-full py-2 pl-4 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm && setShowResults(true)}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-12 bg-amber-400">
          <FaSearch className="text-gray-800" />
        </div>

        {showResults && searchTerm.trim().length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isSearching ? (
              <li className="px-4 py-2 text-sm text-gray-500">Searching...</li>
            ) : searchResults.length > 0 ? (
              searchResults.map((blog) => (
                <li
                  key={blog._id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <Link
                    href={`/blog/${blog._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 transition-colors"
                    onClick={handleResultClick}
                  >
                    {blog.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No results found.
              </li>
            )}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold uppercase tracking-wider text-gray-800">
          Categories
        </h3>
        <div className="w-12 h-1 bg-amber-400 mt-2 mb-3"></div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-sm text-red-500">Error: {error}</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category._id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <span className="block py-2 text-gray-600 text-sm">
                  {category.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default SidebarCategories;