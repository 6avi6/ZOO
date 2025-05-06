import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [user, setUser] = useState(null);

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:8083/api/auth/refresh', null, {
                withCredentials: true,
            });
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            setUser(jwtDecode(newAccessToken));
        } catch {
            localStorage.removeItem('accessToken');
            setUser(null);
        } finally {
            setAuthChecked(true);
        }
    };

    const handleTokenUpdate = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    refreshAccessToken();
                } else {
                    setUser(decoded);
                    setAuthChecked(true);
                }
            } catch {
                refreshAccessToken();
            }
        } else {
            refreshAccessToken();
        }
    };

    useEffect(() => {
        handleTokenUpdate();
        window.addEventListener('storage', handleTokenUpdate);
        return () => window.removeEventListener('storage', handleTokenUpdate);
    }, []);

    return (
        <AuthContext.Provider value={{ user, authChecked }}>
            {authChecked ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
