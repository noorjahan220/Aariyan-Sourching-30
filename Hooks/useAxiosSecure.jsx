import axios from 'axios';
import { useMemo } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
    baseURL: 'https://api.aaryansourcing.com/',
    });
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
