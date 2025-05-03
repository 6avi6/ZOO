import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const HomeRedirect = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

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
};

export default HomeRedirect;
