import axiosInstance from "./axiosInstance";

// Pobierz użytkowników z rolą CAREGIVER
export const getAllCaregivers = async (page = 0, size = 100) => {
    try {
        const response = await axiosInstance.get('/api/administration/users/search/paged', {
            params: {
                role: 'CAREGIVER',
                page,
                size
            }
        });
        return response.data.content;
    } catch (error) {
        console.error('Błąd przy pobieraniu opiekunów:', error);
        throw error;
    }
};
