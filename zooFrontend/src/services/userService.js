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

export const updateCurrentUser = async (data) => {
    try {
        const response = await axiosInstance.put(`api/user/me`, data);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`api/administration/user/${id}`);
        return response.data;
    } catch(error) {
        throw error;
    }
}





