'use client';
import { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import BlogList from './BlogList';
import ViewBlogModal from './ViewBlogModal';
import EditBlogModal from './EditBlogModal';

const AllBlogs = ({ categories }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const BLOGS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('page', currentPage);
      params.append('limit', BLOGS_PER_PAGE);
      
      const { data } = await axiosSecure.get(`/blogs?${params.toString()}`);
      
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);

    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs");
      setBlogs([]); 
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, currentPage, axiosSecure]); 

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchBlogs();
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [fetchBlogs]); 


  const handleDeleteBlog = async (blogId) => {
    const deletePromise = axiosSecure.delete(`/blogs/${blogId}`);

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting blog...',
        success: () => {
          fetchBlogs(); 
          return "Blog deleted successfully!";
        },
        error: "Failed to delete blog."
      }
    );
  };

  const handleUpdateSuccess = (updatedBlog) => {
    setBlogs(blogs.map(b => (b._id === updatedBlog._id ? updatedBlog : b)));
    setEditingBlog(null);
  };

  return (
    <div className='max-w-6xl my-7'>
      <Toaster position="top-right" />
      

      <BlogList
        blogs={blogs} 
        loading={loading}
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onView={setViewBlog}
        onEdit={setEditingBlog}
       
        onDelete={handleDeleteBlog}
      />

 
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {viewBlog && viewBlog._id && (
        <ViewBlogModal
          blog={viewBlog}
          onClose={() => setViewBlog(null)}
        />
      )}
    </div>
  );
};

export default AllBlogs;