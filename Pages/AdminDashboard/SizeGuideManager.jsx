'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaSpinner, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const SizeGuideManager = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [charts, setCharts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchSizeCharts = async () => {
        try {
            const res = await axiosSecure.get('/size-charts');
            setCharts(res.data);
        } catch (error) {
            toast.error('Failed to fetch size charts.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSizeCharts();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('alt', data.alt);

        const promise = axiosSecure.post('/size-charts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        toast.promise(promise, {
            loading: 'Uploading size chart...',
            success: (res) => {
                if(res.data.success) {
                    fetchSizeCharts();
                    reset();
                    return 'Size chart added!';
                }
                throw new Error(res.data.error || 'Upload failed.');
            },
            error: (err) => err.message || 'Could not upload chart.',
        });
    };
    
    // --- MODIFIED handleDelete function ---
    const handleDelete = (chartId) => {
        // Create a custom toast with confirmation buttons
        toast((t) => (
            <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
                <div className="flex items-center gap-3">
                    <FaExclamationTriangle className="text-yellow-500 h-8 w-8" />
                    <div className="text-left">
                        <p className="font-semibold text-gray-800">Delete this size chart?</p>
                        <p className="text-sm text-gray-600">This action cannot be undone.</p>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-3">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Dismiss the confirmation toast first
                            toast.dismiss(t.id);
                            // Then, execute the deletion with its own promise toast
                            performDeletion(chartId);
                        }}
                        className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 6000, // Keep the toast open for 6 seconds
        });
    };

    // Helper function to be called after confirmation
    const performDeletion = (chartId) => {
        const promise = axiosSecure.delete(`/size-charts/${chartId}`);
        toast.promise(promise, {
            loading: 'Deleting...',
            success: (res) => {
                if (res.data.success) {
                    fetchSizeCharts(); // Refresh list on success
                    return 'Size chart deleted!';
                }
                // This will trigger the error state of the toast
                throw new Error(res.data.error || 'Deletion failed.');
            },
            error: (err) => `Error: ${err.message || 'Could not delete size chart.'}`,
        });
    };

    return (
        <div className="max-w-6xl my-7">
            

            <div className="mb-12">
                <h2 className="mt-1  font-semibold text-xl text-gray-700">Add New Size Chart Image</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div>
                         <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                         <input id="image" type="file" accept="image/*" {...register('image', { required: "An image is required" })} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500" />
                         {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                    </div>
                    <div>
                         <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-1">Image Description (Alt Text)</label>
                         <input id="alt" {...register('alt')} className="w-full p-2 border  border-gray-300 rounded-md" placeholder="e.g., Men's T-Shirt Sizing" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 disabled:opacity-70 flex items-center">
                        {isSubmitting ? <><FaSpinner className="animate-spin mr-2" /> Uploading...</> : 'Upload Chart'}
                    </button>
                </form>
            </div>

            <div>
                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Size Charts</h2>
                 {isLoading ? <LoadingSpinner></LoadingSpinner> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {charts.length > 0 ? charts.map(chart => (
                            <div key={chart._id} className="relative group rounded-sm overflow-hidden">
                                <img src={`${img_api}${chart.src}`} alt={chart.alt} className="w-full h-auto object-cover" />
                                <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                    <button onClick={() => handleDelete(chart._id)} className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-red-600 hover:bg-red-700">
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        )) : <p>No size charts have been uploaded yet.</p>}
                    </div>
                 )}
            </div>
        </div>
    );
};

export default SizeGuideManager;