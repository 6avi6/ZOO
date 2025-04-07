import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/styles/Dashboards.css';

const WeterynarzDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Panel weterynarza</h1>
        <div className="dashboard-actions">
          <Link to="/weterynarz/register-treatment" className="dashboard-btn">Zarejestruj leczenie</Link>
          <Link to="/weterynarz/view-reports" className="dashboard-btn">Przeglądaj raporty</Link>
          <Link to="/weterynarz/sick-animals" className="dashboard-btn">Wykaz chorych zwierząt</Link>
        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>
  );
};

export default WeterynarzDashboard;
