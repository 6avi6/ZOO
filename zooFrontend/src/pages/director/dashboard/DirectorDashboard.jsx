import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Dashboards.css';

const DirectorDashboard = () => {
  return (
    <div className="dashboard-container">
    <div className="dashboard-content">
      <h1 className="dashboard-title">Panel dyrektora</h1>
      <div className="dashboard-actions">
        <Link to="/dyrektor/reports" className="dashboard-btn">Przeglądaj raporty</Link>
        

        <Link to="/dyrektor/buy-animal" className="dashboard-btn">Kup nowe zwierzę</Link>
      </div>
    </div>

    <Link to="/" className="dashboard-back"> Wróć do strony głównej</Link>
  </div>
);
};

export default DirectorDashboard;