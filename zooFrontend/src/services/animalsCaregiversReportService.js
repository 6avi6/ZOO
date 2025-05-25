import axiosInstance from './axiosInstance';

export const getAnimalsCaregiversReport = async () => {
  try {
    const response = await axiosInstance.get('api/reports/animals-caregivers');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania danych o opiekunach:', error);
    throw error;
  }
};
