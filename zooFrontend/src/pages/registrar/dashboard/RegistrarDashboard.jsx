import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Dashboards.css';
import { IoPaw, IoPerson } from 'react-icons/io5'; // Dodano ikony

const RegistrarDashboard = () => {
  return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Panel rejestratora</h1>
        <div className="flex flex-row w-full gap-4 justify-center text-center m-8">

          {/* Sekcja: Rejestracja zwierząt */}
          <div
              className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              onClick={() => { window.location.href = "/registrar/edit-animal"; }}
          >
            <h2 className="mb-4 mt-4 text-xl font-semibold">Rejestracja zwierząt</h2>
            <IoPaw size={120} className="text-gray-600 mb-4" />
            <p className="text-sm">Zarządzaj danymi zwierząt w zoo</p>
          </div>

          {/* Sekcja: Rejestracja opiekunów */}
          <div
              className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              onClick={() => { window.location.href = "/registrar/edit-caretaker"; }}
          >
            <h2 className="mb-4 mt-4 text-xl font-semibold">Rejestracja opiekunów</h2>
            <IoPerson size={120} className="text-gray-600 mb-4" />
            <p className="text-sm">Zarządzaj danymi opiekunów zwierząt</p>
          </div>

          {/* Sekcja: Zarządzanie wybiegami */}
          <div
              className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              onClick={() => { window.location.href = "/registrar/edit-enclosure"; }}
          >
            <h2 className="mb-4 mt-4 text-xl font-semibold">Zarządzanie wybiegami</h2>
            <IoPaw size={120} className="text-gray-600 mb-4" />
            <p className="text-sm">Edytuj dane wybiegów w zoo</p>
          </div>
        </div>

        <Link to="/" className="mt-8 text-blue-600 hover:underline">Wróć do strony głównej</Link>
      </div>
  );
};

export default RegistrarDashboard;
