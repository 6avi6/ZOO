import axiosInstance from "./axiosInstance";

// Pobierz wszystkie wybiegi
export const getAllEnclosures = async () => {
    try {
        const response = await axiosInstance.get('/api/enclosures');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania wszystkich wybiegów:', error);
        throw error;
    }
};

// Pobierz pojedynczy wybieg po ID
export const getEnclosureById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/enclosures/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas pobierania wybiegu o ID ${id}:`, error);
        throw error;
    }
};

// Dodaj nowy wybieg
export const addEnclosure = async (enclosureData) => {
    try {
        const response = await axiosInstance.post('/api/enclosures', enclosureData);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas dodawania wybiegu:', error);
        throw error;
    }
};

// Zaktualizuj dane wybiegu
export const updateEnclosure = async (id, enclosureData) => {
    try {
        const response = await axiosInstance.put(`/api/enclosures/${id}`, enclosureData);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas aktualizacji wybiegu o ID ${id}:`, error);
        throw error;
    }
};

// Usuń wybieg po ID
export const deleteEnclosure = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/enclosures/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas usuwania wybiegu o ID ${id}:`, error);
        throw error;
    }
};
