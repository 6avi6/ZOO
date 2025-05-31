import axiosInstance from "./axiosInstance";

// GET ALL food types
export const getAllFoodTypes = async () => {
    try {
        const response = await axiosInstance.get('/api/food-types');
        return response.data;
    } catch (error) {
        console.error("Błąd przy pobieraniu wszystkich typów jedzenia:", error);
        throw error;
    }
};

// GET food type by ID
export const getFoodTypeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/food-types/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy pobieraniu typu jedzenia o ID ${id}:`, error);
        throw error;
    }
};

// CREATE new food type
export const createFoodType = async (foodTypeData) => {
    try {
        const response = await axiosInstance.post('/api/food-types', foodTypeData);
        return response.data;
    } catch (error) {
        console.error("Błąd przy tworzeniu nowego typu jedzenia:", error);
        throw error;
    }
};

// UPDATE food type
export const updateFoodType = async (id, updatedData) => {
    try {
        const response = await axiosInstance.put(`/api/food-types/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy aktualizacji typu jedzenia o ID ${id}:`, error);
        throw error;
    }
};

// DELETE food type
export const deleteFoodType = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/food-types/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy usuwaniu typu jedzenia o ID ${id}:`, error);
        throw error;
    }
};
