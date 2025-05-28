import axiosInstance from "./axiosInstance";

// Pobierz karmienia danego zwierzęcia
export const getFeedingsByAnimalId = async (animalId) => {
    try {
        const id = Number(animalId);
        const response = await axiosInstance.get(`/api/feedings`);
        // filtrujemy karmienia, które mają w animalIds dokładnie podane animalId poonieważ nie ma endpointu xD
        const filteredFeedings = response.data.filter(feeding =>
            feeding.animalIds && feeding.animalIds.includes(id)
        );
        return filteredFeedings;
    } catch (error) {
        console.error(`Błąd przy pobieraniu karmień zwierzęcia ${animalId}:`, error);
        throw error;
    }
};

export const createFeeding = async (feedingData) => {
    try {
        const response = await axiosInstance.post('/api/feedings', feedingData);
        return response.data;
    } catch (error) {
        console.error('Błąd przy tworzeniu karmienia:', error);
        throw error;
    }
};

export const updateFeeding = async (feedingId, updatedData) => {
    try {
        console.log(updatedData);
        if (updatedData.feedingTime && updatedData.feedingTime.length >= 5) {
            updatedData.feedingTime = updatedData.feedingTime.slice(0, 5);
        }
        const response = await axiosInstance.put(`/api/feedings/${feedingId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy aktualizacji karmienia ${feedingId}:`, error);
        throw error;
    }
};

export const deleteFeeding = async (feedingId) => {
    try {
        const response = await axiosInstance.delete(`/api/feedings/${feedingId}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy usuwaniu karmienia ${feedingId}:`, error);
        throw error;
    }
};

