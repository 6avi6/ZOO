import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ requiredRole }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        if (!payload) throw new Error("Invalid token format");

        const user = JSON.parse(atob(payload));

        if (requiredRole && user.role !== requiredRole) {
            return <Navigate to="/unauthorized" />;
        }

        return <Outlet />;
    } catch (error) {
        console.error('Błąd podczas dekodowania tokena:', error);
        return null;
    }
};

export default PrivateRoute;
