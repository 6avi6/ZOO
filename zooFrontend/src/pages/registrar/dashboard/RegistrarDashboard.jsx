import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Dashboards.css';
import { IoPaw, IoPerson, IoTime, IoFastFood, IoMedkit } from 'react-icons/io5';
import { GiSittingDog } from "react-icons/gi";

const RegistrarDashboard = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Registrar Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-animal"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Animal Registration</h2>
                    <GiSittingDog size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Manage zoo animal data</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-caretaker"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Caretaker Registration</h2>
                    <IoPerson size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Manage caretaker information</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-enclosure"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Enclosure Management</h2>
                    <IoPaw size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Edit zoo enclosure details</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/work-schedule"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Work Hours Registration</h2>
                    <IoTime size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Log employee work hours</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-food-types"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Food Types</h2>
                    <IoFastFood size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Manage animal food types</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-symptom-types"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Symptom Types</h2>
                    <IoMedkit size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Manage symptom catalog</p>
                </div>
            </div>

            <Link to="/login" className="mt-8 text-blue-600 hover:underline">Return to login page</Link>
        </div>
    );
};

export default RegistrarDashboard;