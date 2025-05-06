import React from 'react';
import { Link } from 'react-router-dom';

const ReportsOverview = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Raporty</h1>
        <div className="dashboard-actions">
          <Link to="/dyrektor/reports/employees" className="dashboard-btn">Wykaz pracowników</Link>
          <Link to="/dyrektor/reports/enclosures" className="dashboard-btn">Wykaz wybiegów i liczby zwierząt</Link>
          <Link to="/dyrektor/reports/assignments" className="dashboard-btn">Zwierzęta z opiekunami</Link>
          <Link to="/dyrektor/reports/sick-animals" className="dashboard-btn">Wykaz chorych zwierząt</Link>
        </div>
      </div>
      <Link to="/dyrektor/dashboard" className="dashboard-back">← Wróć do panelu dyrektora</Link>
    </div>
  );
};

export default ReportsOverview;
