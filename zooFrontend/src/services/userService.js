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

export const updateUserById = async (id, userData) => {
    try {
        const response = await axiosInstance.put(`/api/administration/user/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas aktualizacji użytkownika o ID ${id}:`, error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axiosInstance.get(`api/administration/user/${id}`);
        return response.data;
    } catch (error) {
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

export const getAllUsersPaged = async (page = 0, size = 100) => {
    try {
        const response = await axiosInstance.get('/api/administration/users/search/paged', {
            params: {
                page,
                size
            }
        });
        return response.data.content;
    } catch (error) {
        console.error('Błąd przy pobieraniu wszystkich użytkowników:', error);
        throw error;
    }
};






