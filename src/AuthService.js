import axios from 'axios';

const API_URL = '_URL_';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Failed to login', error);
        throw error;
    }
};

export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Failed to register', error);
        throw error;
    }
};