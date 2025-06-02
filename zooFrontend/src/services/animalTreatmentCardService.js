import axiosInstance from "./axiosInstance";

export const getAllAnimalTreatmentCards = async () => {
    try {
        const response = await axiosInstance.get('/api/animal-treatment-card');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu kart leczenia zwierząt:', error);
        throw error;
    }
};

export const createAnimalTreatmentCard = async (cardData) => {
    try {
        const response = await axiosInstance.post('/api/animal-treatment-card', cardData);
        return response.data;
    } catch (error) {
        console.error('Błąd przy tworzeniu karty leczenia:', error);
        throw error;
    }
};

export const updateAnimalTreatmentCard = async (id, cardData) => {
    try {
        console.log('Update payload wysyłany do backendu:', cardData);
        const response = await axiosInstance.put(`/api/animal-treatment-card/${id}`, cardData);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy aktualizacji karty leczenia o ID ${id}:`, error);
        throw error;
    }
};

export const deleteAnimalTreatmentCard = async (id) => {
    try {
        await axiosInstance.delete(`/api/animal-treatment-card/${id}`);
    } catch (error) {
        console.error(`Błąd przy usuwaniu karty leczenia o ID ${id}:`, error);
        throw error;
    }
};

export const getAllAnimals = async () => {
    try {
        const response = await axiosInstance.get('/api/animals');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu zwierząt:', error);
        throw error;
    }
};

export const getAllSymptoms = async () => {
    try {
        const response = await axiosInstance.get('/api/symptoms');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu symptomów:', error);
        throw error;
    }
};