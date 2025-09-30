'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'; 
import useAuth from "../../Hooks/useAuth";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRouter } from "next/navigation";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Create User
      const result = await registerUser(data.email, data.password);
      await updateUserProfile(data.username);

      // Store user info in Database
      const userInfo = {
        name: data.username,
        email: data.email,
        role: "user",
        registrationTime: new Date().toLocaleString(),
      };

      const res = await axiosSecure.post("/api/post-users", userInfo);
        console.log(res.data);
        
      if (res.data.insertedId) {
        router.push("/");
        setTimeout(() => {
          toast.success('Successfully created account!');
        }, 200);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-2xl w-full max-w-4xl lg:flex overflow-hidden rounded-lg">
        {/* Left Side */}
        <div 
          className="w-full lg:w-[40%] flex justify-center items-center text-center p-8 bg-cover bg-center min-h-[250px] lg:min-h-0" 
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1032&auto=format&fit=crop')" }}
        >
          <div className="w-full bg-black/50 p-6 rounded-md">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-white">
              Welcome Back!
            </h2>
            <p className="text-gray-200 mb-8">
              Already have an account? Sign in to continue your journey with us.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-yellow-500 transition-all duration-300"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 md:p-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
                placeholder="Password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <p className="text-gray-600 text-xs">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
              <a href="/privacy-policy" className="underline hover:text-yellow-600">privacy policy</a>.
            </p>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-40 px-8 py-3 bg-black text-white font-semibold rounded-md 
                           hover:bg-yellow-500 hover:text-black 
                           transition-all duration-300 flex items-center justify-center text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <FaSpinner className="animate-spin text-white " />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
