import axiosInstance from "./axiosInstance";

// src/services/employeesReportService.js

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('api/reports/employees');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania raportu pracowników:', error);
        throw error;
    }
};
