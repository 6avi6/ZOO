import axios from 'axios';

const API_BASE_URL = '/api/enclosures';

// Pobierz wszystkie wybiegi
export const getAllEnclosures = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania wybiegów:', error);
        throw error;
    }
};

// Dodaj nowy wybieg
export const addEnclosure = async (newEnclosure) => {
    try {
        const response = await axios.post(API_BASE_URL, newEnclosure);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas dodawania wybiegu:', error);
        throw error;
    }
};

// Zaktualizuj wybieg
export const updateEnclosure = async (id, updatedEnclosure) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedEnclosure);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas aktualizacji wybiegu o ID ${id}:`, error);
        throw error;
    }
};

// Usuń wybieg
export const deleteEnclosure = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas usuwania wybiegu o ID ${id}:`, error);
        throw error;
    }
};
