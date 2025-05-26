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

export const assignCaretakersToAnimal = async (animalId, userIds) => {
    try {
        console.log("Animal", animalId);
        console.log(userIds);
        console.log(userIds.map(id => typeof id));
        const response = await axiosInstance.put(`/api/animals/${animalId}/employees`, userIds);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas przypisywania opiekunów do zwierzęcia ${animalId}:`, error);
        throw error;
    }
};