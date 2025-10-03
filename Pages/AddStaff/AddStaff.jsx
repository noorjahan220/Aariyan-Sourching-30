'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


// --- SVG Icon Components (for better UI) ---
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  </svg>
);

const ArrowPathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001a4.992 4.992 0 0 1-4.992 4.992h-.328M5.977 9.348h4.992v-.001a4.992 4.992 0 0 0-4.992 4.992h-.328m12.323 4.344a1.5 1.5 0 0 1-1.499 1.499H5.963a1.5 1.5 0 0 1-1.499-1.499v-.344m12.323 0v.344a1.5 1.5 0 0 0 1.499 1.499h.328a4.992 4.992 0 0 0 4.992-4.992v-.001h-4.992m-12.323 0h-4.992v.001a4.992 4.992 0 0 1 4.992-4.992h.328a4.992 4.992 0 0 1 4.992 4.992v.001h-4.992" />
  </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  );

const routes = [
  "Dashboard", "Products", "Product Management", "Orders",
  "Staff & Users", "Blogs", "Communication", "Transactions & Payments",
  "Account & Settings", "Analytics"
];
const initialPermissionsState = routes.reduce((acc, route) => ({ ...acc, [route]: false }), {});

export default function AddStaff({ onAddStaff }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [permissions, setPermissions] = useState(initialPermissionsState);
  const axiosSecure = useAxiosSecure();

  const { data: availableUsers = [], isLoading, isError } = useQuery({
    queryKey: ['promotableUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/promotable-users');
      return res.data;
    }
  });

  const resetForm = () => {
    setSelectedUserId('');
    setPermissions(initialPermissionsState);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedUserId) return toast.error('Please select a user to promote.');
    const grantedPermissions = Object.keys(permissions).filter(p => permissions[p]);
    if (grantedPermissions.length === 0) return toast.error('Please assign at least one permission.');

    const newStaffData = { userId: selectedUserId, permissions: grantedPermissions };
    const addStaffPromise = onAddStaff(newStaffData);

    toast.promise(addStaffPromise, {
      loading: 'Promoting user to staff...',
      success: () => {
        resetForm();
        return 'User promoted successfully!';
      },
      error: (err) => `Failed to promote user: ${err.message || 'Server error'}`,
    });
  };

  return (
    <div className="max-w-6xl my-7">
      <div className="bg-white rounded-xl">
       
        <p className="text-gray-500 mb-6">Promote an existing user to a staff role by assigning specific permissions.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- Step 1: Select User --- */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2">Step 1: Select User</h3>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon />
              </div>
              <select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none text-sm sm:text-base"
                required
                disabled={isLoading || isError}
              >
                <option value="" disabled></option>
                {availableUsers.map(user => (
                  <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                ))}
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          {/* --- Step 2: Assign Permissions --- */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2">Step 2: Assign Permissions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {routes.map((routeName) => (
                <label key={routeName} htmlFor={routeName} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${permissions[routeName] ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-400'}`}>
                  <input
                    type="checkbox"
                    id={routeName}
                    name={routeName}
                    checked={permissions[routeName]}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-yellow-500 border-gray-300 rounded-md focus:ring-yellow-400"
                  />
                  <span className="ml-3 text-sm sm:text-base text-gray-800 font-medium select-none">{routeName}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* --- Actions --- */}
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isLoading || isError || availableUsers.length === 0}
              >
                <UserPlusIcon /> Add Staff
              </button>
              <button
                type="button" 
                onClick={resetForm}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                <ArrowPathIcon /> Reset
              </button>
            </div>
            {(isError || (!isLoading && availableUsers.length === 0)) && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
                <InfoIcon />
                <span>
                 {isError ? "Could not load users. Please try again later." : "No available users to promote to staff."}
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}