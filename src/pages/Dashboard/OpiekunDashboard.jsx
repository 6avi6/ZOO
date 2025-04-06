import React from 'react';
import { Link } from 'react-router-dom';

const OpiekunDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel opiekuna zwierząt</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/opiekun/animal-update" className="btn">Aktualizuj dane zwierzęcia</Link>
        <Link to="/opiekun/feeding-update" className="btn">Zmień dane żywieniowe</Link>
      </div>

      <div className="mt-8">
  <Link to="/" className="text-sm text-blue-600 underline hover:text-blue-800">
    ⬅️ Wróć do strony głównej
  </Link>
</div>

    </div>
  );
};

export default OpiekunDashboard;
