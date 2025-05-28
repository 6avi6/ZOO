// src/services/enclosuresReportService.js
import axiosInstance from "./axiosInstance";

export const getEnclosuresReport = async () => {
  try {
    const response = await axiosInstance.get(`api/reports/enclosures`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania raportu wybiegów:", error);
    throw error;
  }
};
