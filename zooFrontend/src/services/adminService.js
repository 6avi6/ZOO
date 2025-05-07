import axiosInstance from "./axiosInstance";
import axios from "axios";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`api/admin/users`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        throw error;
    }
};

export const getUserWorkSchedule = async (id) => {
    try {
        const response = await axiosInstance.get(`api/admin/user/${id}/work-schedule`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania harmonogramu użytkownika:', error);
        throw error;
    }
};

export const registerUser = async (data) => {
    try {
        const response = await axios.post('http://localhost:8083/api/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        throw error;
    }
};

