import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { GiSittingDog, GiMeal } from "react-icons/gi";
import { MdSchedule } from "react-icons/md";
import '../../../styles/Dashboards.css';

const CaregiverDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-8">Panel Opiekuna Zwierząt</h1>

            <div className="flex flex-wrap gap-8 justify-center text-center">
                {/* Moje zwierzęta */}
                <div
                    className="flex flex-col items-center max-w-sm w-72 p-6 border border-gray-300 bg-white shadow-md h-72 rounded-xl hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/animals")}
                >
                    <h2 className="mb-6 text-lg font-medium">Moje zwierzęta</h2>
                    <GiSittingDog size={130} />
                </div>

                {/* Mój grafik pracy */}
                <div
                    className="flex flex-col items-center max-w-sm w-72 p-6 border border-gray-300 bg-white shadow-md h-72 rounded-xl hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/schedule")}
                >
                    <h2 className="mb-6 text-lg font-medium">Mój grafik pracy</h2>
                    <MdSchedule size={130} />
                </div>

                {/* Moje karmienia */}
                <div
                    className="flex flex-col items-center max-w-sm w-72 p-6 border border-gray-300 bg-white shadow-md h-72 rounded-xl hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/feedings")}
                >
                    <h2 className="mb-6 text-lg font-medium">Moje karmienia</h2>
                    <GiMeal size={130} />
                </div>
            </div>
            <Link to="/" className="mt-8 text-blue-600 hover:underline">Wróć do strony głównej</Link>
        </div>
    );
};

export default CaregiverDashboard;
