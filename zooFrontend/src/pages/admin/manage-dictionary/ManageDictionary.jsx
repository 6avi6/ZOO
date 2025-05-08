import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar";

const ManageDictionary = () => {
  return (

    <div>
        <Navbar />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dane słownikowe</h1>
        <div className="dashboard-actions">
          <Link to="/admin/add-animal-species" className="dashboard-btn">Dodaj gatunek zwierzęcia</Link>
          <Link to="/admin/add-food-type" className="dashboard-btn">Dodaj rodzaj pożywienia</Link>
          <Link to="/admin/add-enclosure-type" className="dashboard-btn">Dodaj typ wybiegu</Link>
        </div>
      </div>
      <Link to="/admin/dashboard" className="dashboard-back">Wróć do panelu admina</Link>
    </div>
  );
};

export default ManageDictionary;
