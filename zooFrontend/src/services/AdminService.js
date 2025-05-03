import axios from 'axios';
import {useParams} from "react-router-dom";

const API_URL = 'http://localhost:8083/api/admin';

export const getAllUsers = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        throw error;
    }
};

export const getUserWorkSchedule = async (id) => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_URL}/user/${id}/work-schedule`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania harmonogramu użytkownika:', error);
        throw error;
    }
};

