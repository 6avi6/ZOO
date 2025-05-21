import axiosInstance from "./axiosInstance";
import axios from "axios";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`api/administration/users`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        throw error;
    }
};



export const getUserWorkSchedule = async (id) => {
    try {
        const response = await axiosInstance.get(`api/administration/user/${id}/work-schedule`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania harmonogramu użytkownika:', error);
        throw error;
    }
};

export const registerUser = async (data) => {
    try {
        const response = await axiosInstance.post('api/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas rejestracji:', error);
        throw error;
    }
};

