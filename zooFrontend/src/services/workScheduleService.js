// workScheduleService.js
import axiosInstance from './axiosInstance';

// Pobierz harmonogram pracy po ID
export const getWorkScheduleById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/work-schedules/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas pobierania harmonogramu o ID ${id}:`, error);
        throw error;
    }
};

// Zaktualizuj harmonogram pracy
export const updateWorkSchedule = async (id, workScheduleData) => {
    try {
        const response = await axiosInstance.put(`/api/work-schedules/${id}`, workScheduleData);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas aktualizacji harmonogramu o ID ${id}:`, error);
        throw error;
    }
};

// Usuń harmonogram pracy
export const deleteWorkSchedule = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/work-schedules/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd podczas usuwania harmonogramu o ID ${id}:`, error);
        throw error;
    }
};

// Dodaj nowy harmonogram pracy
export const createWorkSchedule = async (workScheduleData) => {
    try {
        const response = await axiosInstance.post('/api/work-schedules', workScheduleData);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas tworzenia harmonogramu pracy:', error);
        throw error;
    }
};

// Pobierz wszystkie harmonogramy pracy
export const getAllWorkSchedules = async () => {
    try {
        const response = await axiosInstance.get('/api/work-schedules');
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania wszystkich harmonogramów pracy:', error);
        throw error;
    }
};

// Pobierz stronicowane harmonogramy pracy i przefiltruj po userId (lokalnie)
export const getPagedWorkSchedules = async (page, size, userId) => {
    try {
        const response = await axiosInstance.get('/api/work-schedules/paged', {
            params: { page, size }
        });

        const allSchedules = response.data.content;

        // Filtrowanie po stronie klienta na podstawie userId xd
        const filteredSchedules = allSchedules.filter(schedule =>
            schedule.userIds.includes(userId)
        );

        return {
            ...response.data,
            content: filteredSchedules,
            page: {
                ...response.data.page,
                totalElements: filteredSchedules.length,
                totalPages: 1,
                size: filteredSchedules.length
            }
        };
    } catch (error) {
        console.error('Błąd podczas pobierania stronicowanych harmonogramów pracy:', error);
        throw error;
    }
};

// Pobierz harmonogramy pracy z przedziału dat
export const getWorkSchedulesByDateRange = async (startDate, endDate) => {
    try {
        const response = await axiosInstance.get('/api/work-schedules/date-range', {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania harmonogramów z przedziału dat:', error);
        throw error;
    }
};