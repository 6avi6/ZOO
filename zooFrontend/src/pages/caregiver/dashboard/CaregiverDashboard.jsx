import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiSittingDog, GiMeal } from "react-icons/gi";
import { MdSchedule } from "react-icons/md";
import '../../../styles/Dashboards.css';

const CaregiverDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Caregiver Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/animals")}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">My Animals</h2>
                    <GiSittingDog size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">View and manage your assigned animals</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/schedule")}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">My Work Schedule</h2>
                    <MdSchedule size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Check and update your working hours</p>
                </div>

                <div
                    className="flex flex-col items-center p-5 border border-gray-300 bg-white shadow-md h-72 w-72 rounded-lg hover:border-[#2C7A7B] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/caregiver/feedings")}
                >
                    <h2 className="mb-4 mt-4 text-xl font-semibold">My Feedings</h2>
                    <GiMeal size={100} className="text-gray-600 mb-4" />
                    <p className="text-sm text-center">Manage feeding schedules and food types</p>
                </div>
            </div>

            <Link to="/login" className="mt-8 text-blue-600 hover:underline">Return to login page</Link>
        </div>
    );
};

export default CaregiverDashboard;
