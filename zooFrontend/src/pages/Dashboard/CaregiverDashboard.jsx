import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/styles/Dashboards.css';

const CaregiverDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Panel opiekuna zwierząt</h1>
        <div className="dashboard-actions">
        <Link to="/opiekun/update-animal" className="dashboard-btn">Aktualizuj dane zwierzęcia</Link>
        <Link to="/opiekun/update-feeding" className="dashboard-btn">Zgłoś chore zwierzę</Link>

        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>
  );
};

export default CaregiverDashboard;
