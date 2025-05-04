import axiosInstance from './axiosInstance';
import axios from "axios";


export const login = async (username, password) => {
    const response = await axios.post('http://localhost:8083/api/auth/login', { username, password }, {
        withCredentials: true,
    });

    if (response.data.accessToken) {
        const token = response.data.accessToken;
        localStorage.setItem('accessToken', token);
        window.dispatchEvent(new Event('storage')); // żeby AuthContext złapał
        return true;
    }

    return false;
};


export const logout = async () => {
    await axiosInstance.post('/api/auth/refresh/logout', null, {
        withCredentials: true,
    });
    localStorage.removeItem('accessToken');
};

