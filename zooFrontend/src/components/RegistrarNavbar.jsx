import React, { useState } from 'react';
import { IoClose, IoLogOutOutline, IoMenu } from 'react-icons/io5';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';
import logo from '../assets/logo.png';

const RegistrarNavbar = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();  // Pobierz aktualną lokalizację

    const toggleMenu = () => setMenu(!menu);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Funkcja generująca dynamiczne ścieżki w zależności od lokalizacji
    const generateLink = (path) => {
        return location.pathname.startsWith('/registrar') ? `/registrar/${path}` : `/${path}`;
    };

    return (
        <div className="bg-white h-[80px] w-full flex items-center border-b-2 border-gray-200 mb-5">
            <Link to={generateLink('dashboard')}>
            <img
                src={logo}
                alt="logo"
                className="size-16 ml-3 rounded-md hover:scale-[1.05] cursor-pointer transition-all duration-300"
            />
            </Link>
            {/* Desktop navigation */}
            <div className="hidden sm:flex flex-row items-center justify-between w-full ml-auto">
                <div className="flex flex-row gap-4 ml-12">
                    <Link to={generateLink('edit-animal')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Rejestracja zwierząt
                        </p>
                    </Link>
                    <Link to={generateLink('edit-caretaker')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Rejestracja opiekunów
                        </p>
                    </Link>
                    <Link to={generateLink('edit-enclosure')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Zarządzanie wybiegami
                        </p>
                    </Link>
                    <Link to={generateLink('work-schedule')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Godziny prac
                        </p>
                    </Link>
                    <Link to={generateLink('edit-food-types')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Typy jedzenia
                        </p>
                    </Link>
                    <Link to={generateLink('edit-symptom-types')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Typy objawów
                        </p>
                    </Link>
                    <Link to={generateLink('account')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Konto
                        </p>
                    </Link>
                </div>
                <IoLogOutOutline
                    onClick={handleLogout}
                    className="size-12 mr-4 p-2 text-gray-800 rounded-full hover:scale-110 transition-all duration-200 cursor-pointer"
                />
            </div>

            {/* Mobile menu icon */}
            <div className="block ml-auto mr-4 sm:hidden">
                {menu ? (
                    <IoClose className="size-10 text-gray-800" onClick={toggleMenu} />
                ) : (
                    <IoMenu className="text-gray-800 size-10" onClick={toggleMenu} />
                )}
            </div>

            {/* Mobile drawer */}
            <div
                className={`fixed sm:hidden top-0 w-[60%] h-full bg-white ease-in-out duration-300 transition-all z-50 ${menu ? 'left-0' : 'left-[-100%]'}`}
            >
                <ul className="pt-4 mx-4">
                    <Link to={generateLink('edit-animal')}>
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-green-300 duration-200">
                            Zwierzęta
                        </li>
                    </Link>
                    <Link to={generateLink('edit-caretaker')}>
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-green-300 duration-200">
                            Opiekunowie
                        </li>
                    </Link>
                    <Link to={generateLink('edit-enclosure')}>
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-green-300 duration-200">
                            Rejestracja
                        </li>
                    </Link>
                    <Link to={generateLink('edit-food-types')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Typy jedzenia
                        </p>
                    </Link>
                    <Link to={generateLink('edit-symptom-types')}>
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-green-300 transition-all duration-200">
                            Typy objawów
                        </p>
                    </Link>
                    <Link to={generateLink('account')}>
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-green-300 duration-200">
                            Konto
                        </li>
                    </Link>
                </ul>
                <IoLogOutOutline
                    onClick={handleLogout}
                    className="size-14 mt-8 mx-auto p-2 text-gray-800 rounded-full hover:scale-110 transition-all duration-200 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default RegistrarNavbar;
