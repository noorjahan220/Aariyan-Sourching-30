'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const AccountDetailsForm = () => {
  const auth = useAuth() || {};
  const { user, updateUserProfile, changePassword } = auth;


  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    }
  });

  const onSubmit = async (data) => {
    try {

      //  Name update

      if (data.name !== user.displayName) {
        try {
          await updateUserProfile(data.name);
          toast.success("Profile updated successfully!");
        } catch (error) {
          toast.error("Name update failed: " + error.message);
        }
      }


      //  Password update

      if (data.current_password || data.new_password || data.confirm_password) {
        if (!data.current_password) {
          toast.error("Please enter your current password to change password.");
          return;
        }
        if (!data.new_password) {
          toast.error("Please enter a new password.");
          return;
        }
        if (data.new_password !== data.confirm_password) {
          toast.error("New password and confirm password do not match!");
          return;
        }

        try {
          await changePassword(data.current_password, data.new_password);
          toast.success("Password updated successfully!");
        } catch (error) {
          console.log(error.message); // Debugging

     
          if (error.code === "auth/wrong-password") {
            toast.error("Current password is wrong!");
          } else {
            toast.error(error.message || "Password change failed!");
          }

          return; 
        }
      }



    } catch (error) {
      toast.error(error.message);
    } finally {
      reset()
    }
  };

  return (
    <div className="max-w-6xl my-7">
      <div className="mb-6">
        
        <p className="mt-1 text-sm text-gray-500">Update your profile information and password.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: "Name is required" })}
              className={`bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 transition-colors duration-300`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={user?.email}
              disabled
              className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-3 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="!mt-8 border-t border-gray-200"></div>

        <h3 className="text-lg font-semibold text-gray-800 pt-2 !mb-4">
          Password Change
        </h3>

        {/* Current Password */}
        <div>
          <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-700">
            Current password (leave blank to keep unchanged)
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              id="current_password"
              {...register('current_password')}
              placeholder='Enter your current password'
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 pr-10 transition-colors duration-300"
            />
            <span
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
              aria-label="Toggle current password visibility"
            >
              {showCurrent ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Password */}
          <div>
            <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-700">
              New password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                id="new_password"
                {...register('new_password')}
                placeholder='Enter new password'
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 pr-10 transition-colors duration-300"
              />
              <span
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                aria-label="Toggle new password visibility"
              >
                {showNew ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm_password"
                {...register('confirm_password')}
                placeholder='Confirm new password'
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 pr-10 transition-colors duration-300"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-sm
                       hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                       disabled:bg-yellow-300 disabled:cursor-not-allowed
                       transition-all duration-300 flex items-center justify-center text-base"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;