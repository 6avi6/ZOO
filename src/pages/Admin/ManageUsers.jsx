import React from 'react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Zarządzanie użytkownikami</h1>
        <div className="dashboard-actions">
          <Link to="/admin/manage-users/add" className="dashboard-btn">Dodaj użytkownika</Link>
          <Link to="/admin/manage-users/delete" className="dashboard-btn">Usuń użytkownika</Link>
          <Link to="/admin/manage-users/edit" className="dashboard-btn">Modyfikuj użytkownika</Link>
          <Link to="/admin/manage-users/view" className="dashboard-btn">Przeglądaj użytkowników</Link>
        </div>
      </div>

      <Link to="/admin/dashboard" className="dashboard-back">Wróć do panelu administratora</Link>
    </div>
  );
};

export default ManageUsers;
