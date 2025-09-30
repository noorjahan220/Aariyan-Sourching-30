"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CommentForm = ({ blogId, onCommentPosted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: true,
  });

  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      toast.error("Please fill in your name, email, and comment.");
      return;
    }
    if (!blogId) {
      toast.error("Could not find the blog to comment on. Please refresh.");
      return;
    }

    try {
      const commentDataToSend = {
        name: formData.name,
        email: formData.email,
        website: formData.website,
        comment: formData.comment,
        saveInfo: formData.saveInfo,
        blogId: blogId,
      };

      const response = await axiosSecure.post("/comments", commentDataToSend);

      if (response.data.insertedId) {
        toast.success("Your comment was posted successfully!");

        setFormData({
          name: "",
          email: "",
          website: "",
          comment: "",
          saveInfo: true,
        });
        if (onCommentPosted) {
          onCommentPosted();
        }
      } else {
        toast.error("Something went wrong on the server.");
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputStyles =
    "w-full bg-white border border-gray-200 px-2 py-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors";

  return (
    <section className="bg-[#EFEFEF] p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Leave a comment
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyles}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyles}
              required
            />
            <input
              type="url"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className="mb-6">
            <textarea
              name="comment"
              placeholder="Comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              className={`${inputStyles} resize-y`}
              required
            ></textarea>
          </div>

          <div className="flex items-center mb-8">
            <input
              id="save-info"
              name="saveInfo"
              type="checkbox"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="h-4 w-4 accent-gray-800 border-gray-300 focus:ring-gray-700"
            />
            <label
              htmlFor="save-info"
              className="ml-3 block text-sm text-gray-700 select-none"
            >
              Save my name, email, and website in this browser for the next time
              I comment.
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-2 hover:bg-gray-700 transition-colors duration-300"
            >
              Post Comment
            </button>
          </div>
        </form>
        <Toaster
          toastOptions={{
            style: {
              background: "#FFD700",
              color: "#000",
            },
          }}
        />
      </div>
    </section>
  );
};

export default CommentForm;