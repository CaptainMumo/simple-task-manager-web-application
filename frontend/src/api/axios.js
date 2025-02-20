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
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await api.post('/auth/token/refresh/', {
                    refresh: refreshToken,
                });

                localStorage.setItem('token', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                // Update the Authorization header for the original request
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                // Update the refresh token in the request data if it exists
                if (originalRequest.data) {
                    const requestData = JSON.parse(originalRequest.data);
                    if (requestData.refresh) {
                        requestData.refresh = response.data.refresh;
                        originalRequest.data = JSON.stringify(requestData);
                    }
                }

                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token error - remove the token and redirect to login page
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;