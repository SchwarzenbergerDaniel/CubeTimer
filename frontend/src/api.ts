import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:8080/api", // TODO: Take from .env file
    withCredentials: true,
});

// Attaches the access token to every request
api.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('accessToken'); // Or use a global state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;