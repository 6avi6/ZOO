import axiosInstance from "./axiosInstance";
import axios from "axios";

// Funkcja do pobierania dostępnych zwierząt
export const getAvailableAnimals = async () => {
  try {
    const response = await axiosInstance.get('/api/animals/available');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania dostępnych zwierząt:', error);
    throw error;
  }
};

// Funkcja do zakupu zwierzęcia
export const buyAnimal = async (id) => {
  try {
    const response = await axiosInstance.post(`/api/animals/${id}/buy`);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas zakupu zwierzęcia:', error);
    throw error;
  }
};
