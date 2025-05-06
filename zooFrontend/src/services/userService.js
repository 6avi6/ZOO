import axiosInstance from "./axiosInstance";

export const getCurrentUser = async () => {

    try {
        const response = await axiosInstance.get(`api/user/me`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        throw error;
    }
};


