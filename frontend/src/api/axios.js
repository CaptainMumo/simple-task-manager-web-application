// src/api/axios.js
import axios from 'axios';


// Axios instance to be reused throughout the app
const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to include JWT token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to refresh the JWT token if it expires
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return api
                .post('/auth/token/refresh/', {
                    refresh: localStorage.getItem('refresh_token'),
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    return api(originalRequest);
                });
        }
        return Promise.reject(error);
    }
);


export default api;