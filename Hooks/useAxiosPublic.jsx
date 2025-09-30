import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
       baseURL: 'https://api.aaryansourcing.com/',
    })
    return  axiosPublic;
};

export default useAxiosPublic;