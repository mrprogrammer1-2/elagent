import axios from 'axios'

// In-memory access token
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

const api = axios.create({
    baseURL: 'http://localhost:3500',
    withCredentials: true // This allows cookies to be sent with requests
});

// Attach access token to requests
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401 and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry && accessToken) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh access token
                const res = await api.post('/auth/refresh');
                setAccessToken(res.data.accessToken);
                // Retry original request with new token
                originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Clear token and redirect to login
                setAccessToken(null);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;