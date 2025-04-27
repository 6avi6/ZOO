import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Dashboards.css';
import { IoPerson } from "react-icons/io5";
import { FaBook } from "react-icons/fa";


const AdminDashboard = () => {
  return (

      <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Admin Dashboard</h1>
          <div className="flex flex-row w-full gap-4 justify-center text-center m-8 ">
              <div className="flex flex-col items-center w-1/3 p-4 border border-gray-300 bg-white shadow-md rounded-lg hover:border-[#2c5282] transition-all duration-300">
                <h1 className="mb-8">Zarządzaj użytkownikami</h1>
                  <IoPerson size={110}/>

              </div>
              <div className="flex flex-col items-center max-w-lg w-1/3 p-4 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#2c5282] transition-all duration-300">
                <h1 className="mb-8">Zarządzaj danymi słownikowymi</h1>
                  <FaBook size={100} />
              </div>
          </div>
      </div>
    /*<div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Admin Panel</h1>
        <div className="dashboard-actions">
          <Link to="/admin/manage-users" className="dashboard-btn">Zarządzaj użytkownikami</Link>
          <Link to="/admin/dictionary-management" className="dashboard-btn">Zarządzaj danymi słownikowymi</Link>
        </div>
      </div>

      <Link to="/" className="dashboard-back">Wróć do strony głównej</Link>
    </div>*/
  );
};

export default AdminDashboard;
