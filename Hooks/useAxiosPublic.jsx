import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
       baseURL: 'http://srv863654.hstgr.cloud/',
    })
    return  axiosPublic;
};

export default useAxiosPublic;