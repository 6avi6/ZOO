import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axiosInstance.get(`api/admin/users`, {
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
        const response = await axiosInstance.get(`api/admin/user/${id}/work-schedule`, {
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

