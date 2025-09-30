'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import TiptapEditor to prevent any SSR issues, even in modals
const TiptapEditor = dynamic(() => import('../../../components/TiptapEditor'), {
  ssr: false,
  loading: () => <div className="border border-gray-300 rounded-lg p-4 min-h-[150px] flex justify-center items-center"><p>Loading Editor...</p></div>,
});

// Helper function to parse JSON safely
const parseJson = (jsonString) => {
  try {
    // If it's already a valid object, return it. Otherwise, parse the string.
    return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
  } catch (e) {
    // If parsing fails, log the error and return null to avoid crashing.
    console.error(`Failed to parse content:`, e);
    return null;
  }
};

const EditBlogModal = ({ blog, onClose, onUpdateSuccess }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();
  
  const { register, handleSubmit, setValue, control } = useForm();

  useEffect(() => {
    if (blog) {
      // This useEffect is still good for resetting the form if the blog prop changes
      setValue('title', blog.title || '');
      setValue('category', blog.category || '');
      setValue('content', parseJson(blog.content));
      setValue('shortDescription', parseJson(blog.shortDescription)); 
      setValue('note', blog.note || '');             
      setValue('tags', blog.tags || '');             
      setValue('metaTitle', blog.metaTitle || '');
      setValue('metaDescription', blog.metaDescription || '');
      setValue('existingImage', blog.image || null);
    }
  }, [blog, setValue]);

  const handleUpdate = async (data) => {
    setIsUpdating(true);
    try {
      const submitData = new FormData();
     
      submitData.append('title', data.title);
      submitData.append('category', data.category);
      if(data.content) submitData.append('content', JSON.stringify(data.content));
      if(data.shortDescription) submitData.append('shortDescription', JSON.stringify(data.shortDescription));
      submitData.append('note', data.note);                                         
      submitData.append('tags', data.tags);                                         
      submitData.append('metaTitle', data.metaTitle || '');
      submitData.append('metaDescription', data.metaDescription || '');
      
      if (data.image && data.image[0]) {
        submitData.append('image', data.image[0]);
      } else if (data.existingImage) {
        submitData.append('existingImage', data.existingImage);
      }
      
      const { data: responseData } = await axiosSecure.put(`/blogs/${blog._id}`, submitData);
      
      onUpdateSuccess(responseData.blog);
      toast.success("Blog updated successfully!");
      onClose();
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog.");
    } finally {
      setIsUpdating(false);
    }
  };

  // --- FIX: Parse the JSON here for the initial render ---
  const initialShortDescription = parseJson(blog?.shortDescription);
  const initialContent = parseJson(blog?.content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[5px]">
      <div className="bg-white w-full max-w-4xl mx-4 rounded-xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Blog</h1>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
              <input type="text" id="title" {...register('title', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input type="text" id="metaTitle" {...register('metaTitle')} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" id="category" {...register('category', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input type="text" id="tags" {...register('tags')} placeholder="e.g., fashion, sourcing" className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            {/* --- FIX: Pass the parsed object to defaultValue --- */}
            <TiptapEditor name="shortDescription" control={control} defaultValue={initialShortDescription} />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
            <input type="file" id="image" accept="image/*" {...register('image')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200" />
          </div>
          
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea id="metaDescription" {...register('metaDescription')} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" rows={4} placeholder="Write meta description..."></textarea>
          </div>
       
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
            <textarea id="note" {...register('note')} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400" rows={2} placeholder="Add an internal note..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            {/* --- FIX: Pass the parsed object to defaultValue --- */}
            <TiptapEditor name="content" control={control} defaultValue={initialContent} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="w-[180px] h-[40px] px-3 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isUpdating} className="w-[180px] h-[40px] px-3 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-70 flex items-center justify-center gap-2">
              {isUpdating ? <><FaSpinner className="animate-spin" /> Updating...</> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;