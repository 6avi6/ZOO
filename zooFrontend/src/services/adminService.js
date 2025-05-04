import axiosInstance from "./axiosInstance";

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

