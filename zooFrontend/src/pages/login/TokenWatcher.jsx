import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TokenWatcher = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    }, [location.pathname]); // <== działa za każdym razem, gdy zmienia się ścieżka

    return null; // Nie renderuje nic widocznego
};

export default TokenWatcher;
