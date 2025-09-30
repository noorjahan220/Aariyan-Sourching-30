"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import dynamic from "next/dynamic";

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const TiptapEditor = dynamic(() => import("../../components/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-4 min-h-[250px] flex justify-center items-center">
      <p>Loading Editor...</p>
    </div>
  ),
});

const BlogForm = ({ blogToEdit, onFormSubmit, onCancel }) => {
  const isEditing = !!blogToEdit;
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      shortDescription: null,
      note: "",
      tags: "",
      content: null,
      // SEO
      metaTitle: "",
      metaDescription: "",
      mainImageAltText: "",
      metaKeywords: "",
      metaRobotsIndex: true,
      metaRobotsNoindex: false,
      metaRobotsFollow: true,
      metaRobotsNofollow: false,
      metaImage: null,
      // Social
      ogTitle: "",
      ogDescription: "",
      twitterTitle: "",
      twitterDescription: "",
    },
  });

  const watchedImage = watch("image");
  const watchedMetaImage = watch("metaImage");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get("/categories");
        setCategories(data || []);
        if (!isEditing && data.length > 0) {
          setValue("category", data[0].value || data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [isEditing, axiosSecure, setValue]);

  useEffect(() => {
    if (isEditing && blogToEdit) {
      const parseJson = (jsonString) => {
        try {
          return typeof jsonString === "string"
            ? JSON.parse(jsonString)
            : jsonString;
        } catch (e) {
          console.error("Failed to parse content for editing:", e);
          return null;
        }
      };
      
      const robots = blogToEdit.metaRobots || "index, follow";

      reset({
        title: blogToEdit.title,
        category: blogToEdit.category,
        shortDescription: parseJson(blogToEdit.shortDescription),
        note: blogToEdit.note || "",
        tags: blogToEdit.tags || "",
        content: parseJson(blogToEdit.content),
        // SEO
        metaTitle: blogToEdit.metaTitle || "",
        metaDescription: blogToEdit.metaDescription || "",
        mainImageAltText: blogToEdit.mainImageAltText || "",
        metaKeywords: blogToEdit.metaKeywords || "",
        metaRobotsIndex: robots.includes("index"),
        metaRobotsNoindex: robots.includes("noindex"),
        metaRobotsFollow: robots.includes("follow"),
        metaRobotsNofollow: robots.includes("nofollow"),
        metaImage: null,
        // Social
        ogTitle: blogToEdit.ogTitle || "",
        ogDescription: blogToEdit.ogDescription || "",
        twitterTitle: blogToEdit.twitterTitle || "",
        twitterDescription: blogToEdit.twitterDescription || "",
      });

      if (blogToEdit.image) {
        setImagePreview(`${img_api}${blogToEdit.image}`);
      }
      if (blogToEdit.metaImage) {
        setMetaImagePreview(`${img_api}${blogToEdit.metaImage}`);
      }
    }
  }, [isEditing, blogToEdit, reset]);

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedImage]);

  useEffect(() => {
    if (watchedMetaImage && watchedMetaImage.length > 0) {
      const file = watchedMetaImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setMetaImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [watchedMetaImage]);

  const onSubmit = async (formData) => {
    try {
      const submitData = new FormData();
      
      // Main Content
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      if (formData.shortDescription)
        submitData.append("shortDescription", JSON.stringify(formData.shortDescription));
      submitData.append("note", formData.note);
      submitData.append("tags", formData.tags);
      if (formData.content)
        submitData.append("content", JSON.stringify(formData.content));
      
      // SEO
      submitData.append("metaTitle", formData.metaTitle);
      submitData.append("metaDescription", formData.metaDescription);
      submitData.append("mainImageAltText", formData.mainImageAltText);
      submitData.append("metaKeywords", formData.metaKeywords);
      
      const directives = [];
      if (formData.metaRobotsIndex) directives.push("index");
      if (formData.metaRobotsNoindex) directives.push("noindex");
      if (formData.metaRobotsFollow) directives.push("follow");
      if (formData.metaRobotsNofollow) directives.push("nofollow");
      submitData.append("metaRobots", directives.join(", "));
      
      // Social
      submitData.append("ogTitle", formData.ogTitle);
      submitData.append("ogDescription", formData.ogDescription);
      submitData.append("twitterTitle", formData.twitterTitle);
      submitData.append("twitterDescription", formData.twitterDescription);

      // Files
      if (formData.image && formData.image.length > 0) {
        submitData.append("image", formData.image[0]);
      } else if (isEditing && blogToEdit.image) {
        submitData.append("existingImage", blogToEdit.image);
      }
      if (formData.metaImage && formData.metaImage.length > 0) {
        submitData.append("metaImage", formData.metaImage[0]);
      } else if (isEditing && blogToEdit.metaImage) {
        submitData.append("existingMetaImage", blogToEdit.metaImage);
      }

      const url = isEditing ? `/blogs/${blogToEdit._id}` : "/blogs";
      const method = isEditing ? axiosSecure.put : axiosSecure.post;

      const { data } = await method(url, submitData);
      toast.success(isEditing ? "Blog updated successfully!" : "Blog added successfully!");
      onFormSubmit(data?.blog, blogToEdit?._id);
      reset();
    } catch (err) {
      console.error("Failed to submit blog:", err);
      toast.error("Failed to submit blog.");
    }
  };

  return (
    <div className="w-full my-7">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">{isEditing ? "Edit Blog" : "Add New Blog"}</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Main Blog Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Blog Title</label>
              <input id="title" {...register("title", { required: "Title is required" })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400"/>
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
              <select id="category" {...register("category", { required: "Category is required" })} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400">
                {categories.map((cat, idx) => <option key={idx} value={cat.value || cat}>{cat.value || cat}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">Tags</label>
            <input id="tags" type="text" {...register("tags")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="e.g., fashion, sourcing, tech"/>
          </div>
          <div className="my-6">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Main Image (Featured)</label>
            <input id="image" type="file" accept="image/*" {...register("image")} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"/>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>

          {/* SEO & Social Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-5">SEO & Social Media Details</h2>
            
            {/* Standard SEO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="mb-4">
                <label htmlFor="metaTitle" className="block text-gray-700 font-medium mb-2">Meta Title</label>
                <input id="metaTitle" type="text" {...register("metaTitle")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="SEO Meta Title"/>
              </div>
              <div className="mb-4">
                <label htmlFor="mainImageAltText" className="block text-gray-700 font-medium mb-2">Main Image Alt Text</label>
                <input id="mainImageAltText" type="text" {...register("mainImageAltText")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="e.g. White cotton t-shirt for men"/>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="metaDescription" className="block text-gray-700 font-medium mb-2">Meta Description</label>
              <textarea id="metaDescription" rows="3" {...register("metaDescription")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Enter SEO meta description..."/>
            </div>
            <div className="mb-6">
              <label htmlFor="metaKeywords" className="block text-gray-700 font-medium mb-2">Meta Keywords (comma-separated)</label>
              <input id="metaKeywords" type="text" {...register("metaKeywords")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="e.g. t-shirt, cotton, premium apparel"/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Meta Robots</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <label className="flex items-center cursor-pointer"><input type="checkbox" {...register("metaRobotsIndex")} className="form-checkbox h-5 w-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"/><span className="ml-2 text-gray-700">Index</span></label>
                <label className="flex items-center cursor-pointer"><input type="checkbox" {...register("metaRobotsNoindex")} className="form-checkbox h-5 w-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"/><span className="ml-2 text-gray-700">Noindex</span></label>
                <label className="flex items-center cursor-pointer"><input type="checkbox" {...register("metaRobotsFollow")} className="form-checkbox h-5 w-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"/><span className="ml-2 text-gray-700">Follow</span></label>
                <label className="flex items-center cursor-pointer"><input type="checkbox" {...register("metaRobotsNofollow")} className="form-checkbox h-5 w-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"/><span className="ml-2 text-gray-700">Nofollow</span></label>
              </div>
            </div>

            {/* Social Media / Open Graph */}
            <div className="mt-6 pt-6 border-t border-dashed border-gray-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media / Open Graph</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label htmlFor="ogTitle" className="block text-gray-700 font-medium mb-2">Open Graph Title</label>
                        <input id="ogTitle" type="text" {...register("ogTitle")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Title for social sharing"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="twitterTitle" className="block text-gray-700 font-medium mb-2">Twitter Title</label>
                        <input id="twitterTitle" type="text" {...register("twitterTitle")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Title for Twitter sharing"/>
                    </div>
                </div>
                 <div className="mb-6">
                    <label htmlFor="ogDescription" className="block text-gray-700 font-medium mb-2">Open Graph Description</label>
                    <textarea id="ogDescription" rows="3" {...register("ogDescription")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Description for social sharing"/>
                </div>
                 <div className="mb-6">
                    <label htmlFor="twitterDescription" className="block text-gray-700 font-medium mb-2">Twitter Description</label>
                    <textarea id="twitterDescription" rows="3" {...register("twitterDescription")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Description for Twitter sharing"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="mb-6">
                        <label htmlFor="metaImage" className="block text-gray-700 font-medium mb-2">Social Sharing Image (Meta Image)</label>
                        <input id="metaImage" type="file" accept="image/*" {...register("metaImage")} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"/>
                    </div>
                    {metaImagePreview && <div className="mb-6"><p className="block text-gray-700 font-medium mb-2">Preview:</p><Image src={metaImagePreview} alt="Meta Image Preview" width={200} height={105} className="rounded-md border border-gray-300 object-cover"/></div>}
                </div>
            </div>
          </div>
          
          {/* Main Content Editors */}
          <div className="mb-6">
            <label htmlFor="note" className="block text-gray-700 font-medium mb-2">Note</label>
            <textarea id="note" rows="2" {...register("note")} className="w-full p-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:border-yellow-400" placeholder="Add an internal note or a special mention"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Short Description</label>
            <TiptapEditor name="shortDescription" control={control} defaultValue={isEditing ? blogToEdit.shortDescription : null}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Main Content</label>
            <TiptapEditor name="content" control={control} defaultValue={isEditing ? blogToEdit.content : null}/>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="flex justify-center items-center bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-75 disabled:cursor-not-allowed" disabled={isSubmitting}>
              {isSubmitting ? <><FaSpinner className="animate-spin mr-2" /><span>Submitting...</span></> : isEditing ? "Update Blog" : "Publish Blog"}
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;