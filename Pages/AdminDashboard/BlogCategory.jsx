'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaExclamationTriangle } from "react-icons/fa";

const TrashIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033c-1.12 0-2.033.954-2.033 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (newValue) => {
    const res = await axios.post("http://localhost:5000/categories", { value: newValue });
    if (res.data.insertedId) {
      setCategories(prev => [...prev, { _id: res.data.insertedId, value: newValue }]);
    }
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/categories/${id}`);
    setCategories(prev => prev.filter(cat => cat._id !== id));
    toast.success("Category deleted successfully!", { duration: 2000 })
  };

 const confirmDelete = (id) => {
  toast((t) => (
    // Using the enhanced and consistent UI
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center gap-3">
        <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
        <div className="text-left">
          <p className="font-semibold text-gray-800">Delete it</p>
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
            // Call the actual deletion logic from your other function
            handleDeleteCategory(id);
            // Dismiss this confirmation toast
            toast.dismiss(t.id);
          }}
          className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  ), {
    // Using the consistent duration
    duration: 6000,
  });
};

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCategory = e.target.elements.newCategory.value.trim();
    if (newCategory) {
      handleAddCategory(newCategory);
      e.target.reset();
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-6xl my-7">
      <Toaster position="top-right" />
      

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full mb-8">
        <h3 className="text-lg font-semibold mb-3">Add New Category</h3>
        <form onSubmit={handleAddSubmit} className="flex gap-4">
          <input
            type="text"
            name="newCategory"
            placeholder="e.g., Business"
            className="flex-grow p-2 border border-gray-300 rounded-md"
            required
          />
          <button type="submit" className="bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-yellow-500">
            Add
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full">
        <h3 className="text-lg font-semibold mb-3">Existing Categories</h3>
        <ul className="space-y-3">
          {categories.map(cat => (
            <li key={cat._id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
              <span className="font-medium text-gray-700">{cat.value}</span>
              <button onClick={() => confirmDelete(cat._id)} className="text-gray-500 hover:text-red-600" title="Delete">
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogCategory;
