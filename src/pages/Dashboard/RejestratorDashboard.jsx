import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/styles/Dashboards.css';

const RejestratorDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Panel rejestratora</h1>
        <div className="dashboard-actions">
          <Link to="/rejestrator/add-animal" className="dashboard-btn">Dodaj zwierzę</Link>
          <Link to="/rejestrator/caretaker-form" className="dashboard-btn">Dodaj opiekuna</Link>
          <Link to="/rejestrator/add-enclosure" className="dashboard-btn">Dodaj wybieg</Link>
          <Link to="/admin/dictionary-management" className="dashboard-btn">Dodaj dane słownikowe</Link>
        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>
  );
};

export default RejestratorDashboard;
