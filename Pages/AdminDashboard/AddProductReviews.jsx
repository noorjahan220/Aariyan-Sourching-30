"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ReactStars from "react-stars";


const AddProductReviews = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const formData = {
        reviewerName: data.name,
        totalRatings: data.ratings, 
        totalReview: data.reviews,
        description: data.description,
      };

      const res = await axiosSecure.post("/post-productReview", formData);
      const result = res.data;

      if (result.acknowledged === true && result.insertedId) {
        toast.success("Success! Your review has been posted.", {
          duration: 2000,
        });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add review");
    } finally {
      reset();
    }
  };

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-6xl my-7">
      <div >
       

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 border border-gray-200 rounded-lg"
        >
      


               {/*  Star Ratings */}
            <div>
              <label className={labelStyle}> Ratings</label>
             <Controller
  name="ratings"
  control={control}
  rules={{
    required: "Rating is required",
    min: { value: 1, message: "Minimum rating is 1" },
    max: { value: 5, message: "Maximum rating is 5" },
  }}
  render={({ field }) => (
    <ReactStars
      count={5}
      size={30}
      value={field.value || 0}
      onChange={(newValue) => field.onChange(newValue)}
      color2="#facc15" // yellow-400
      half={false}
    />
  )}
/>
              {errors.ratings && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ratings.message}
                </p>
              )}
            </div>

          {/* ---------- name And reviews */}
          <div className="reviews_raings grid grid-cols-2 gap-6">
         
    {/* Reviewer Name */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Reviewer Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={inputStyle}
              placeholder="e.g. John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>


      {/* Total Reviews */}
            <div>
              <label htmlFor="reviews" className={labelStyle}>
                 Reviews
              </label>
              <input
                id="reviews"
                type="number"
                {...register("reviews", {
                  required: "Total reviews is required",
                  min: { value: 0, message: "Reviews cannot be negative" },
                })}
                className={inputStyle}
                placeholder="e.g. 120"
              />
              {errors.reviews && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.reviews.message}
                </p>
              )}
            </div>
      
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelStyle}>
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows="4"
              className={inputStyle}
              placeholder="Write the review description..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className=" w-[180px] flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className=" w-[180px] flex items-center justify-center px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                  Submitting...
                </>
              ) : (
                "Add Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductReviews;
