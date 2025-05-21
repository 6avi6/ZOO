import axiosInstance from "./axiosInstance";
import axios from "axios";

// Usuń zwierzę po ID
export const deleteAnimal = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Błąd podczas usuwania zwierzęcia o ID ${id}:`, error);
    throw error;
  }
};

// Dodaj nowe zwierzę
export const addAnimal = async (animalData) => {
  try {
    console.log(animalData);
    const response = await axiosInstance.post('/api/animals', animalData);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas dodawania zwierzęcia:', error);
    throw error;
  }
};

// Pobierz wszystkie zwierzęta
export const getAllAnimals = async () => {
  try {

    const response = await axiosInstance.get('/api/animals');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania wszystkich zwierząt:', error);
    throw error;
  }
};

// Pobierz konkretne zwierzę po ID
export const getAnimalById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Błąd podczas pobierania zwierzęcia o ID ${id}:`, error);
    throw error;
  }
};

// Zaktualizuj dane zwierzęcia
export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axiosInstance.put(`/api/animals/${id}`, animalData);
    return response.data;
  } catch (error) {
    console.error(`Błąd podczas aktualizacji zwierzęcia o ID ${id}:`, error);
    throw error;
  }
};

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
