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

// Pobierz dostępne wybiegi
export const getAvailableEnclosures = async () => {
  const response = await axiosInstance.get('/api/enclosures');
  return response.data;
};

// Dyrektor: dodaj zwierzę
export const createAnimal = async (animalData) => {
  const response = await axiosInstance.post('/api/animals', animalData);
  return response.data;
};

// Dyrektor: przypisz opiekunów
export const assignCaregivers = async (animalId, caregiverIds) => {
  await axiosInstance.put(`/api/animals/${animalId}/employees`, caregiverIds);
};

// Pobierz listę gatunków
export const getSpecies = async () => {
  const response = await axiosInstance.get('/api/animals/species');
  return response.data;
};

// Pobierz wszystkich użytkowników
export const getAllUsers = async () => {
  const response = await axiosInstance.get('/api/user/all');
  return response.data;
};