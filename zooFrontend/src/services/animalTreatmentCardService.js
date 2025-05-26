import axiosInstance from "./axiosInstance";

// Pobierz wszystkie karty leczenia zwierząt
export const getAllAnimalTreatmentCards = async () => {
    try {
        const response = await axiosInstance.get('/api/animal-treatment-card');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu kart leczenia zwierząt:', error);
        throw error;
    }
};

// Utwórz nową kartę leczenia zwierzęcia
export const createAnimalTreatmentCard = async (cardData) => {
    try {
        console.log(cardData);
        const response = await axiosInstance.post('/api/animal-treatment-card', cardData);
        return response.data;
    } catch (error) {
        console.error('Błąd przy tworzeniu karty leczenia:', error);
        throw error;
    }
};
