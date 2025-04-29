import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ requiredRole }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode(token);

        if (requiredRole && decoded.role !== requiredRole) {
            return <Navigate to="/unauthorized" />;
        }

        return <Outlet />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
