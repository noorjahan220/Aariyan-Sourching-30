'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaSpinner, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';

const img_api = process.env.NEXT_PUBLIC_API_BASE_URL;

const HomePageManager = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchBanners = async () => {
        try {
            const res = await axiosSecure.get('/banners');
            setSlides(res.data);
        } catch (error) {
            toast.error('Failed to fetch banners.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('subtitle', data.subtitle);
        formData.append('title1', data.title1);
        formData.append('title2', data.title2);
        formData.append('titleBold', data.titleBold);
        formData.append('image', data.image[0]);

        const promise = axiosSecure.post('/banners', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        toast.promise(promise, {
            loading: 'Uploading banner...',
            success: (res) => {
                if(res.data.success) {
                    fetchBanners();
                    reset();
                    return 'Banner added successfully!';
                }
                throw new Error(res.data.error || 'Failed to add banner.');
            },
            error: (err) => err.message || 'Could not upload banner.',
        });
    };
    
    // --- MODIFIED handleDelete function ---
    const handleDelete = (slideId) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
                <div className="flex items-center gap-3">
                    <FaExclamationTriangle className="text-yellow-500 h-8 w-8" />
                    <div className="text-left">
                        <p className="font-semibold text-gray-800">Delete this banner slide?</p>
                        <p className="text-sm text-gray-600">This action is permanent.</p>
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
                            toast.dismiss(t.id);
                            performDeletion(slideId);
                        }}
                        className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
        });
    };

    // Helper function for deletion promise
    const performDeletion = (slideId) => {
        const promise = axiosSecure.delete(`/banners/${slideId}`);
        toast.promise(promise, {
            loading: 'Deleting banner...',
            success: (res) => {
                if (res.data.success) {
                    fetchBanners();
                    return 'Banner deleted!';
                }
                throw new Error(res.data.error || 'Failed to delete banner.');
            },
            error: (err) => `Error: ${err.message || 'Could not delete banner.'}`,
        });
    };

    const inputStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="w-full my-7">
            <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">Homepage Banner Management</h1>

            <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Banner Slide</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="subtitle" className={labelStyle}>Subtitle</label>
                            <input id="subtitle" {...register('subtitle', { required: true })} className={inputStyle} placeholder="e.g., Winter Collection 2024" />
                        </div>
                           <div>
                            <label htmlFor="title1" className={labelStyle}>Title (Line 1)</label>
                            <input id="title1" {...register('title1', { required: true })} className={inputStyle} placeholder="e.g., Any variation" />
                        </div>
                        
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title2" className={labelStyle}>Title (Line 2)</label>
                            <input id="title2" {...register('title2', { required: true })} className={inputStyle} placeholder="e.g., that fits your" />
                        </div>
                         <div>
                            <label htmlFor="titleBold" className={labelStyle}>Title (Bold Part)</label>
                            <input id="titleBold" {...register('titleBold', { required: true })} className={inputStyle} placeholder="e.g., imagination" />
                        </div>
                    </div>
                    <div>
                         <label htmlFor="image" className={labelStyle}>Banner Image</label>
                         <input id="image" type="file" accept="image/*" {...register('image', { required: "Banner image is required" })} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200" />
                         {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 disabled:opacity-70 flex items-center">
                        {isSubmitting ? <><FaSpinner className="animate-spin mr-2" /> Adding...</> : 'Add Slide'}
                    </button>
                </form>
            </div>

            <div>
                 <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Banner Slides</h2>
                 {isLoading ? <LoadingSpinner></LoadingSpinner> : (
                    <div className="space-y-4">
                        {slides.length > 0 ? slides.map(slide => (
                            <div key={slide._id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <img src={`${img_api}${slide.image}`} alt={slide.subtitle} className="w-32 h-20 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-800">{slide.subtitle}</p>
                                    <p className="text-sm text-gray-600">{slide.title1} {slide.title2} <strong>{slide.titleBold}</strong></p>
                                </div>
                                <button onClick={() => handleDelete(slide._id)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                                    <FaTrash className="h-5 w-5" />
                                </button>
                            </div>
                        )) : <p>No banner slides found. Add one using the form above.</p>}
                    </div>
                 )}
            </div>
        </div>
    );
};

export default HomePageManager;