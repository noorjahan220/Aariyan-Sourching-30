"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialLogIn from "../SocailLogIn/SocialLogIn";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { logIn, resetPassword, user } = useAuth();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const result = await logIn(data.email, data.password);
      const loggedInUser = result.user;

      if (loggedInUser) {
        const res = await axiosSecure.get(`/api/user/${loggedInUser.email}`);
        const singleUser = res.data;

        toast.success("Logged in successfully", {
          duration: 1500,
        });
        if (singleUser?.role === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/myaccount");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please check your credentials!");
    } finally {
      reset();
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt(
      "Please enter your registered email for password reset:"
    );
    if (!email) return;
    try {
      await resetPassword(email);
      toast.success("Password reset email sent. Check your inbox!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send password reset email!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-2xl w-full max-w-4xl lg:flex overflow-hidden rounded-lg">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 md:p-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } pr-10`}
                placeholder="Password"
              />
              <span
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <FaSpinner className="animate-spin text-white text-lg" />
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-gray-600 hover:underline"
              >
                Lost your password?
              </button>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-10 text-center relative">
            <p className="text-gray-500 mb-4 text-sm relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[40%] before:h-px before:bg-gray-300 after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-[40%] after:h-px after:bg-gray-300">
              Or login with
            </p>
            <SocialLogIn />
          </div>
        </div>

        {/* Right Side */}
        <div
          className="w-full lg:w-[40%] flex justify-center items-center text-center p-8 bg-cover bg-center min-h-[250px] lg:min-h-0"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="w-full bg-black/50 p-6 rounded-md">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-3 text-white">
              Not a member?
            </h2>
            <p className="text-gray-200 mb-8">
              Sign up to unlock exclusive features and stay connected.
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-yellow-500 transition-all duration-300"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
