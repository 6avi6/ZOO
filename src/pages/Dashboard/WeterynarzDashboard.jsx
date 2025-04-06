import React from 'react';
import { Link } from 'react-router-dom';

const WeterynarzDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel weterynarza</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/weterynarz/register-treatment" className="btn">Zarejestruj leczenie</Link>
        <Link to="/weterynarz/view-reports" className="btn">Przeglądaj raporty</Link>
        <Link to="/weterynarz/sick-animals" className="btn">Wykaz chorych zwierząt</Link>
      </div>
      <div className="mt-8">
  <Link to="/" className="text-sm text-blue-600 underline hover:text-blue-800">
    ⬅️ Wróć do strony głównej
  </Link>
</div>

    </div>
  );
};

export default WeterynarzDashboard;
