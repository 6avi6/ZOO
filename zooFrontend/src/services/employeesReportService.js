import axiosInstance from "./axiosInstance";

// src/services/employeesReportService.js



//TO DO:
//zmień api na director/reports/... gdy juz bedzie dostepne
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`api/admin/users`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania raportu pracowników:', error);
        throw error;
    }
};
