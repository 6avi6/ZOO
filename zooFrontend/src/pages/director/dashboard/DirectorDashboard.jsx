import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaPaw } from 'react-icons/fa';

const DirectorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Panel Dyrektora</h1>
      <div className="flex flex-row w-full gap-4 justify-center text-center m-8">

        <div
          className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/director/reports')}
        >
          <h1 className="mb-8 mt-4">Przeglądaj raporty</h1>
          <FaChartBar size={130} />
        </div>

        <div
          className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/director/buy-animal')}
        >
          <h1 className="mb-8 mt-4">Kup nowe zwierzę</h1>
          <FaPaw size={120} />
        </div>

      </div>
    </div>
  );
};

export default DirectorDashboard;
