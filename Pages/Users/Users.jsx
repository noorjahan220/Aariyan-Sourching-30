"use client";

import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 sm:gap-6 animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
            <div className="w-1/3 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>
    </div>
);

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', currentPage, debouncedSearchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/users', {
        params: { page: currentPage, limit: 10, search: debouncedSearchTerm }
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const performUserDeletion = (userId) => {
    return axiosSecure.delete(`/api/users/${userId}`);
  };

  const handleDeleteConfirmation = (userId, userName) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Delete {userName}?</p>
            <p className="text-sm text-gray-600">This action is permanent.</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <button onClick={() => toast.dismiss(t.id)} className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={() => {
            toast.dismiss(t.id);
            toast.promise(performUserDeletion(userId), {
              loading: `Deleting ${userName}...`,
              success: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
                return `User ${userName} has been deleted.`;
              },
              error: (err) => `Error: ${err.response?.data?.message || "Could not delete user."}`
            });
          }} className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
        </div>
      </div>
    ));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const users = data?.users || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="max-w-6xl my-7">
     
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => <UserSkeleton key={i} />)
        ) : isError ? (
          <div className="text-center py-10 text-red-500">Error: {error.message}</div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <img src={'https://i.ibb.co.com/Pz1C9TpN/Whats-App-Image-2025-09-19-at-16-11-33-cd52c182.jpg'} alt={user.name} className="w-16 h-16 object-cover rounded-md"/>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-slate-800 text-base sm:text-lg">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
                <button onClick={() => handleDeleteConfirmation(user._id, user.name)} className="text-gray-400 hover:text-red-600" aria-label={`Delete ${user.name}`}>
                  <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 px-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel={'< Prev'}
            nextLabel={'Next >'}
            breakLabel={'...'}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            forcePage={currentPage - 1}
            containerClassName={'flex items-center gap-2'}
            pageLinkClassName={'px-3 py-1 border rounded-md hover:bg-gray-100'}
            activeLinkClassName={'bg-blue-500 text-white border-blue-500'}
            previousLinkClassName={'px-3 py-1 border rounded-md hover:bg-gray-100'}
            nextLinkClassName={'px-3 py-1 border rounded-md hover:bg-gray-100'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      )}
    </div>
  );
}

export default Users;