import axiosInstance from "./axiosInstance";

// Pobierz wszystkie symptomy
export const getAllSymptoms = async () => {
    try {
        const response = await axiosInstance.get('/api/symptoms');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu symptomów:', error);
        throw error;
    }
};
