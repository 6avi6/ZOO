import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { IoClose, IoLogOutOutline, IoMenu } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenu(!menu);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="bg-white h-[80px] w-full flex items-center border-b-2 border-gray-200">
            <img
                src={logo}
                alt="logo"
                className="size-16 ml-3 rounded-md hover:scale-[1.05] cursor-pointer transition-all duration-300"
            />

            {/* Desktop navigation */}
            <div className="hidden sm:flex flex-row items-center justify-between w-full ml-auto">
                <div className="flex flex-row gap-4 ml-12">
                    <Link to="/admin/manage-users">
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-[#F4E7CB] transition-all duration-200">
                            Użytkownicy
                        </p>
                    </Link>
                    <Link to="/admin/manage-dictionary">
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-[#F4E7CB] transition-all duration-200">
                            Słownik
                        </p>
                    </Link>
                    <Link to="/admin/account">
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-[#F4E7CB] transition-all duration-200">
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
                className={`fixed sm:hidden top-0 w-[60%] h-full bg-white ease-in-out duration-300 transition-all z-50 ${
                    menu ? 'left-0' : 'left-[-100%]'
                }`}
            >
                <ul className="pt-4 mx-4">
                    <Link to="/admin/manage-users">
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-[#F4E7CB] duration-200">
                            Użytkownicy
                        </li>
                    </Link>
                    <Link to="/admin/manage-dictionary">
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-[#F4E7CB] duration-200">
                            Słownik
                        </li>
                    </Link>
                    <Link to="/admin/account">
                        <li className="p-3 mb-2 text-gray-800 border-b-2 border-gray-200 hover:pl-2 hover:border-[#F4E7CB] duration-200">
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

export default Navbar;
