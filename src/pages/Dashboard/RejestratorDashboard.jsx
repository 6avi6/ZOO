import React from 'react';
import { Link } from 'react-router-dom';

const RejestratorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel rejestratora</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/rejestrator/add-animal" className="btn">Dodaj zwierzę</Link>
        <Link to="/rejestrator/caretaker-form" className="btn">Dodaj opiekuna</Link>
        <Link to="/rejestrator/add-enclosure" className="btn">Dodaj wybieg</Link>
        <Link to="/admin/dictionary-management" className="btn">Dodaj dane słownikowe</Link>
      </div>

      <div className="mt-8">
  <Link to="/" className="text-sm text-blue-600 underline hover:text-blue-800">
    ⬅️ Wróć do strony głównej
  </Link>
</div>

    </div>
  );
};

export default RejestratorDashboard;
