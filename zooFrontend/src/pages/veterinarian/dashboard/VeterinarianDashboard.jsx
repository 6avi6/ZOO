import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNotesMedical, FaStethoscope, FaHeartbeat } from 'react-icons/fa';

const VeterinarianDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Veterinarian Dashboard</h1>
      <div className="flex flex-row w-full gap-4 justify-center text-center m-8 flex-wrap">

        <div
          className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/veterinarian/register-treatment')}
        >
          <h1 className="mb-8 mt-4">Register Treatment</h1>
          <FaStethoscope size={120} />
        </div>

        {/* <div
          className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/veterinarian/sick-animals')}
        >
          <h1 className="mb-8 mt-4">Browse Reports</h1>
          <FaNotesMedical size={120} />
        </div> */}

        <div
          className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/veterinarian/sick-animals')}
        >
          <h1 className="mb-8 mt-4">Sick Animals List</h1>
          <FaHeartbeat size={120} />
        </div>
      </div>
    </div>
  );
};

export default VeterinarianDashboard;
