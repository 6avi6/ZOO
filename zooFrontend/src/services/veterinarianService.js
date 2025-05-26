import axiosInstance from "./axiosInstance";

// Pobierz użytkowników z rolą VETERINARIAN
export const getAllVeterinarians = async (page = 0, size = 100) => {
    try {
        const response = await axiosInstance.get('/api/administration/users/search/paged', {
            params: {
                role: 'VETERINARIAN',
                page,
                size
            }
        });
        console.log(response.data);
        return response.data.content;
    } catch (error) {
        console.error('Błąd przy pobieraniu opiekunów:', error);
        throw error;
    }
};