import axiosInstance from "./axiosInstance";

export const getSickAnimalsReport = async () => {
  try {
    const response = await axiosInstance.get('api/reports/sick-animals');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania danych o chorych zwierzętach:', error);
    throw error;
  }
};
