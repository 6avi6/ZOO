// src/services/treatmentCardService.js
import axiosInstance from './axiosInstance';

// Pobierz wszystkie karty leczenia
export const getAllTreatmentCards = async () => {
  const response = await axiosInstance.get('/api/animal-treatment-card');
  return response.data;
};

// Dodaj nową kartę leczenia
export const createTreatmentCard = async (data) => {
  const response = await axiosInstance.post('/api/animal-treatment-card', data);
  return response.data;
};

// Edytuj istniejącą kartę leczenia
export const updateTreatmentCard = async (id, data) => {
  const response = await axiosInstance.put(`/api/animal-treatment-card/${id}`, data);
  return response.data;
};

// Usuń kartę leczenia
export const deleteTreatmentCard = async (id) => {
  await axiosInstance.delete(`/api/animal-treatment-card/${id}`);
};
