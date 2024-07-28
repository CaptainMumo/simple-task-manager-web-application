// src/api/index.js
import api from './axios';

// User authentication API calls
export const registerUser = async (username, password) => {
    const response = await api.post('/auth/register/', { username, password });
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await api.post('/auth/token/', { username, password });
    // Set the JWT token in local storage
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
};

export const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    await api.post('/auth/logout/', { refresh: refreshToken });
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};


// Task management API calls
export const createTask = async (title, description) => {
    const response = await api.post('/tasks/', { title, description });
    return response.data;
};

export const getTasks = async () => {
    const response = await api.get('/tasks/');
    return response.data;
};

export const getTask = async (id) => {
    const response = await api.get(`/tasks/${id}/`);
    return response.data;
};

export const updateTask = async (id, title, description, completed) => {
    const response = await api.put(`/tasks/${id}/`, { title, description, completed });
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}/`);
    return response.data;
};
