import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
    const { user, authChecked } = useAuth();

    if (!authChecked) return null;

    if (!user) return <Navigate to="/login" />;

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
