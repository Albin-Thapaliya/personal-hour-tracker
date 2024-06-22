import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export const login = async (username, password) => {
    try {
        const response = await apiClient.post('/login', { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Failed to login', error);
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const register = async (username, password) => {
    try {
        const response = await apiClient.post('/register', { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Failed to register', error);
        throw new Error('Registration failed. Please try again.');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const fetchUserData = async () => {
    try {
        const response = await apiClient.get('/user');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data', error);
        throw new Error('Failed to fetch user data. Please try again later.');
    }
};
