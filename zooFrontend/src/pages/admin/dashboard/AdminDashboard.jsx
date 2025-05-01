import React from 'react';
import '../../../styles/Dashboards.css';
import { IoPerson } from "react-icons/io5";
import { FaBook } from "react-icons/fa";


const AdminDashboard = () => {
  return (

      <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1>Admin Dashboard</h1>
          <div className="flex flex-row w-full gap-4 justify-center text-center m-8 ">
              <div className="flex flex-col items-center max-w-lg w-1/3 min-w-72 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#2c5282] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => {window.location.href = "/admin/manage-users"}}>
                <h1 className="mb-8 mt-4">Zarządzaj użytkownikami</h1>
                  <IoPerson size={130}/>

              </div>
              <div className="flex flex-col items-center max-w-lg  min-w-72 w-1/3 p-5 border border-gray-300 bg-white shadow-md h-72 rounded-lg hover:border-[#2c5282] hover:scale-[1.03]  transition-all duration-300 cursor-pointer"
                    onClick={() => {window.location.href = "/admin/manage-dictionary"}}>
                <h1 className="mb-8 mt-4">Zarządzaj danymi słownikowymi</h1>
                  <FaBook size={120} />

              </div>
          </div>
      </div>

  );
};

export default AdminDashboard;
