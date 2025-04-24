import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/styles/Dashboards.css';


const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Admin Panel</h1>
        <div className="dashboard-actions">
          <Link to="/admin/manage-users" className="dashboard-btn">Zarządzaj użytkownikami</Link>
          <Link to="/admin/dictionary-management" className="dashboard-btn">Zarządzaj danymi słownikowymi</Link>
        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>
  );
};

export default AdminDashboard;
