import axios from 'axios';
import axiosInstance from "./axiosInstance";

const API_URL = 'http://localhost:8083/api/user';

export const getCurrentUser = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axiosInstance.get(`api/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        throw error;
    }
};


