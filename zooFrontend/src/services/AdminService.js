import axios from 'axios';

const API_URL = 'http://localhost:8083/api/admin';

export const getAllUsers = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        throw error;
    }
};
