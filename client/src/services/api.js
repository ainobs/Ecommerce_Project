import axios from 'axios';

// Create an instance of Axios with custom configurations if needed
const api = axios.create({
  baseURL: '/api',
  // baseURL: 'http://192.168.43.12:5000/api',
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling requests and responses
api.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add authentication headers)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // You can handle successful responses here
    return response.data; // Return only the response data
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // Server responded with an error status code (4xx or 5xx)
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
