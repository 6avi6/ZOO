import React from 'react';
import { Link } from 'react-router-dom';

const DyrektorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel dyrektora</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/dyrektor/reports" className="btn">Przeglądaj raporty</Link>
        <Link to="/dyrektor/staff-list" className="btn">Wyświetl pracowników</Link>
        <Link to="/dyrektor/buy-animal" className="btn">Kup nowe zwierzę</Link>
      </div>

      <div className="mt-8">
  <Link to="/" className="text-sm text-blue-600 underline hover:text-blue-800">
    ⬅️ Wróć do strony głównej
  </Link>
</div>

    </div>
  );
};

export default DyrektorDashboard;
