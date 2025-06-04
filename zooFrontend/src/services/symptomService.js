import axiosInstance from "./axiosInstance";

// Pobierz wszystkie symptomy
export const getAllSymptoms = async () => {
    try {
        const response = await axiosInstance.get('/api/symptoms');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu symptomów:', error);
        throw error;
    }
};

// Pobierz symptom po ID
export const getSymptomById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/symptoms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy pobieraniu symptomu o ID ${id}:`, error);
        throw error;
    }
};

// Utwórz nowy symptom
export const createSymptom = async (symptomData) => {
    try {
        const response = await axiosInstance.post('/api/symptoms', symptomData);
        return response.data;
    } catch (error) {
        console.error("Błąd przy tworzeniu symptomu:", error);
        throw error;
    }
};

// Aktualizuj symptom
export const updateSymptom = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/api/symptoms/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy aktualizacji symptomu o ID ${id}:`, error);
        throw error;
    }
};

// Usuń symptom
export const deleteSymptom = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/symptoms/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy usuwaniu symptomu o ID ${id}:`, error);
        throw error;
    }
};
