import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Dashboards.css';
import {  IoPaw, IoPerson, IoTime } from 'react-icons/io5';
import { GiSittingDog } from "react-icons/gi";

const RegistrarDashboard = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Panel rejestratora</h1>

            {/* Układ 2x2 przy użyciu grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

                {/* Sekcja: Rejestracja zwierząt */}
                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-animal"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Rejestracja zwierząt</h2>
                    <GiSittingDog size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Zarządzaj danymi zwierząt w zoo</p>
                </div>

                {/* Sekcja: Rejestracja opiekunów */}
                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-caretaker"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Rejestracja opiekunów</h2>
                    <IoPerson size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Zarządzaj danymi opiekunów zwierząt</p>
                </div>

                {/* Sekcja: Zarządzanie wybiegami */}
                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/edit-enclosure"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Zarządzanie wybiegami</h2>
                    <IoPaw size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Edytuj dane wybiegów w zoo</p>
                </div>


                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#A54C02] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => { window.location.href = "/registrar/work-schedule"; }}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">Rejestracja godzin pracy</h2>
                    <IoTime size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Zarejestruj czas pracy pracowników</p>
                </div>

            </div>

            <Link to="/" className="mt-8 text-blue-600 hover:underline">Wróć do strony głównej</Link>
        </div>
    );
};

export default RegistrarDashboard;
