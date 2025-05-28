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

// Pobierz opiekunów przypisanych do zwierzęcia o {id}
export const getCaretakersByAnimalId = async (animalId) => {
    try {
        const response = await axiosInstance.get(`/api/animals/${animalId}/caretakers`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy pobieraniu opiekunów dla zwierzęcia ${animalId}:`, error);
        throw error;
    }
};

// Przypisz opiekunów do zwierzęcia
export const assignCaretakersToAnimal = async (animalId, userIds) => {
    try {
        const response = await axiosInstance.put(`/api/animals/${animalId}/employees`, userIds);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas przypisywania opiekunów do zwierzęcia ${animalId}:`, error);
        throw error;
    }
};


// Update typu karmienia
export const updateFoodType = async (data) => {
    try {
        const response = await axiosInstance.put('/api/caregiver/update-food-type', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas aktualizacji rodzaju pożywienia:', error);
        throw error;
    }
};

// Update czasu karmienia
export const updateFeedingTime = async (data) => {
    try {
        const response = await axiosInstance.put('/api/caregiver/update-feeding-time', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas aktualizacji czasu karmienia:', error);
        throw error;
    }
};

//Update wybiegu karmienia
export const updateEnclosure = async (data) => {
    try {
        const response = await axiosInstance.put('/api/caregiver/update-enclosure', data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas aktualizacji wybiegu:', error);
        throw error;
    }
};

// Pobiearnie zwierząt przypisanych do opiekowania sie
export const getMyAnimals = async () => {
    try {
        const response = await axiosInstance.get('/api/caregiver/my-animals');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania przypisanych zwierząt:', error);
        throw error;
    }
};

// Pobieranie karmień dla aktualnie zalogowanego opiekuna
export const getMyFeedings = async () => {
    try {
        const response = await axiosInstance.get('/api/caregiver/my-Feedings');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania harmonogramu karmienia:', error);
        throw error;
    }
};
