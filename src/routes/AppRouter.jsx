//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
