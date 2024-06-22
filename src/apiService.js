import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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

export const addItem = async (item) => {
    try {
        const response = await axios.post(`${API_URL}/items`, item);
        return response.data.item;
    } catch (error) {
        console.error('Failed to add item', error);
        throw error;
    }
};

export const deleteItem = async (itemId) => {
    try {
        await axios.delete(`${API_URL}/items/${itemId}`);
    } catch (error) {
        console.error('Failed to delete item', error);
        throw error;
    }
};
