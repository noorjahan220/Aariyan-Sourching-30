import axios from 'axios';
import { useMemo } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
    baseURL: 'http://srv863654.hstgr.cloud/',
    });
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
