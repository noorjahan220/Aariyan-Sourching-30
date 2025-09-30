'use client';
import Image from 'next/image';
import { FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { TrashIcon, EyeIcon as SolidEyeIcon } from '@heroicons/react/24/solid'; // Using solid for clarity

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const BlogList = ({
  blogs = [],
  loading = false,
  categories = [],
  searchTerm = '',
  setSearchTerm = () => {},
  selectedCategory = 'all',
  setSelectedCategory = () => {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {}, // This prop will receive handleDeleteBlog from the parent
}) => {

  // This function correctly shows the UI and then calls the parent's logic.
  const handleDeleteConfirmation = (blogId, blogTitle) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Delete "{blogTitle}"?</p>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // This now calls the parent's handleDeleteBlog function
              onDelete(blogId); 
            }}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
    });
  };

  return (
    <>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                {blog.image && (
                  <div className="relative w-16 h-16 mr-4 hidden sm:block flex-shrink-0">
                    <Image
                      src={`${img_api}${blog.image}`}
                      alt={blog.title}
                      fill
                      sizes="64px"
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h3 className="text-md font-semibold text-gray-800 truncate">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Category: {blog.category || 'General'}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <button onClick={() => onView(blog)} className="p-2 text-gray-500 hover:text-green-600 transition-colors" title="View Details">
                    <SolidEyeIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => onEdit(blog)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteConfirmation(blog._id, blog.title)} className="p-2 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">No blogs found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default BlogList;