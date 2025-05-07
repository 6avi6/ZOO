import { Navigate } from 'react-router-dom';

const HomeRedirect = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        if (!payload) throw new Error("Invalid token format");

        const user = JSON.parse(atob(payload));

        switch (user.role) {
            case 'ADMIN':
                return <Navigate to="/admin/dashboard" />;
            case 'VETERINARIAN':
                return <Navigate to="/veterinarian/dashboard" />;
            case 'REGISTRAR':
                return <Navigate to="/registrar/dashboard" />;
            case 'DIRECTOR':
                return <Navigate to="/director/dashboard" />;
            case 'CAREGIVER':
                return <Navigate to="/caregiver/dashboard" />;
            default:
                return <Navigate to="/unauthorized" />;
        }
    } catch (error) {
        console.error('Błąd podczas dekodowania tokena:', error);
        return null;
    }
};

export default HomeRedirect;
