import axios from 'axios';

const API_URL = '_URL_';

export const fetchStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch stats', error);
        throw error;
    }
};

export const fetchItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data.items;
    } catch (error) {
        console.error('Failed to fetch items', error);
        throw error;
    }
};
