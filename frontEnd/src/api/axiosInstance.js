import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7070/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
