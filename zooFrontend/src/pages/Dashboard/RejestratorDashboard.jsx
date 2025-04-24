import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard/styles/Dashboards.css';

const RejestratorDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Panel rejestratora</h1>

        {/* Sekcja: Rejestracja zwierząt */}
        <h2 className="dashboard-section"> Rejestracja zwierząt</h2>
        <div className="dashboard-actions">
        <Link to="/rejestrator/add-animal" className="dashboard-btn">Dodaj zwierzę</Link>
        <Link to="/rejestrator/edit-animal" className="dashboard-btn">Edytuj dane zwierzęcia</Link>
        </div>

        {/* Sekcja: Rejestracja opiekunów */}
        <h2 className="dashboard-section"> Rejestracja opiekunów</h2>
        <div className="dashboard-actions">
        <Link to="/rejestrator/add-caretaker" className="dashboard-btn">Edytuj opiekuna</Link>
        </div>

        {/* Sekcja: Zarządzanie wybiegami */}
        <h2 className="dashboard-section"> Zarządzanie wybiegami</h2>
        <div className="dashboard-actions">

        <Link to="/rejestrator/edit-enclosure" className="dashboard-btn">Edytuj wybieg</Link>
        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>
  );
};

export default RejestratorDashboard;
