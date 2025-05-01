import axios from 'axios';

const API_URL = 'http://localhost:8083/api/user';

export const getCurrentUser = async () => {
    const token = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        throw error;
    }
};


