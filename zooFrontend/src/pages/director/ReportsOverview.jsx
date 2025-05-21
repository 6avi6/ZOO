import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaHandsHelping, FaStethoscope } from 'react-icons/fa';
import { GiWoodenFence } from 'react-icons/gi';
import DirectorNavbar from '../../components/DirectorNavbar'; 

const ReportsOverview = () => {
  return (
    <div>
      <DirectorNavbar />

      <div className="dashboard-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="dashboard-title">Raporty</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">


            <Link to="/director/reports/employees" className="w-full max-w-xs p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 text-center">
              <FaUserTie size={48} className="mx-auto mb-4 text-[#234228]" />
              <p className="text-lg font-semibold text-gray-800">Wykaz pracowników</p>
            </Link>

            <Link to="/director/reports/enclosures" className="w-full max-w-xs p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 text-center">
              <GiWoodenFence size={48} className="mx-auto mb-4 text-[#234228]" />
              <p className="text-lg font-semibold text-gray-800">Wykaz wybiegów i liczby zwierząt</p>
            </Link>

            <Link to="/director/reports/assignments" className="w-full max-w-xs p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 text-center">
              <FaHandsHelping size={48} className="mx-auto mb-4 text-[#234228]" />
              <p className="text-lg font-semibold text-gray-800">Zwierzęta z opiekunami</p>
            </Link>

            <Link to="/director/reports/sick-animals" className="w-full max-w-xs p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 text-center">
              <FaStethoscope size={48} className="mx-auto mb-4 text-[#234228]" />
              <p className="text-lg font-semibold text-gray-800">Wykaz chorych zwierząt</p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;
