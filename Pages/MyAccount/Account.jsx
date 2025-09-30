'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const Account = () => {
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

        // Firebase এ current password ভুল হলে এইভাবে চেক করতে পারেন
        if (error.code === "auth/wrong-password") {
            toast.error("Current password is wrong!");
        } else {
            toast.error(error.message || "Password change failed!");
        }

        return; // Stop further execution
    }
}



        } catch (error) {
            toast.error(error.message);
        }finally{
          reset()
        }
    };

    return (
        <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-800 lg:mb-5">
                Account Details
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-700">
                            Name<span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: "Name is required" })}
                            className={`bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-300`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={user?.email}
                            disabled
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 !mt-10 md:!mt-4 !mb-4">
                    Password Change
                </h3>

                {/* Current Password */}
                <div className="relative">
                    <label htmlFor="current_password" className="block mb-2 text-base font-medium text-gray-700">
                        Current password (leave blank to leave unchanged)
                    </label>
                    <input
                        type={showCurrent ? "text" : "password"}
                        id="current_password"
                        {...register('current_password')}
                        placeholder='Enter Your Current Password'
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 transition-colors duration-300"
                    />
                    <span
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute top-11 right-3 cursor-pointer text-gray-500"
                    >
                        {showCurrent ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* New Password */}
                    <div className="relative">
                        <label htmlFor="new_password" className="block mb-2 text-base font-medium text-gray-700">
                            New password (leave blank to leave unchanged)
                        </label>
                        <input
                            type={showNew ? "text" : "password"}
                            id="new_password"
                            {...register('new_password')}
                               placeholder='Enter New Password'
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 transition-colors duration-300"
                        />
                        <span
                            onClick={() => setShowNew(!showNew)}
                            className="absolute top-11 right-3 cursor-pointer text-gray-500"
                        >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="confirm_password" className="block mb-2 text-base font-medium text-gray-700">
                            Confirm new password
                        </label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            id="confirm_password"
                            {...register('confirm_password')}
                               placeholder='Confirm New Password'
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 transition-colors duration-300"
                        />
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute top-11 right-3 cursor-pointer text-gray-500"
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3 bg-yellow-400 text-white font-semibold rounded-md 
                                   hover:bg-yellow-300 hover:text-black 
                                   transition-all duration-300 flex items-center justify-center text-base"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-x-2">
                                <FaSpinner className="animate-spin text-white " />
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Account;
