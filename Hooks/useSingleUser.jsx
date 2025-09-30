"use client"
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useSingleUser = () => { 
    const { user } = useAuth(); // get logged-in user's email
    const axiosSecure = useAxiosSecure();

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['singleUser', user?.email],
        queryFn: async () => {
            if (!user?.email) return null; // safety check
            const res = await axiosSecure.get(`/api/user/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email // only run if email exists
    });

    return { singleUser: data, refetch, isLoading };
};

export default useSingleUser;
