//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import DyrektorDashboard from '../pages/Dashboard/DyrektorDashboard';
import OpiekunDashboard from '../pages/Dashboard/OpiekunDashboard';
import RejestratorDashboard from '../pages/Dashboard/RejestratorDashboard';
import WeterynarzDashboard from '../pages/Dashboard/WeterynarzDashboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/dyrektor/dashboard" element={<DyrektorDashboard />} />
      <Route path="/opiekun/dashboard" element={<OpiekunDashboard />} />
      <Route path="/rejestrator/dashboard" element={<RejestratorDashboard />} />
      <Route path="/weterynarz/dashboard" element={<WeterynarzDashboard />} />
    </Routes>
  );
};

export default AppRouter;
