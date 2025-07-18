import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7070/api', // your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
