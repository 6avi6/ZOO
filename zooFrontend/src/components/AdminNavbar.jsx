import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { IoClose, IoLogOutOutline, IoMenu, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const AdminNavbar = () => {
    const [menu, setMenu] = useState(false);
    const [dictionaryOpen, setDictionaryOpen] = useState(false); // 👈 do rozwijanego menu
    const [mobileDictionaryOpen, setMobileDictionaryOpen] = useState(false); // 👈 do mobilnego menu
    const navigate = useNavigate();

    const toggleMenu = () => setMenu(!menu);
    const toggleDictionary = () => setDictionaryOpen(!dictionaryOpen);
    const toggleMobileDictionary = () => setMobileDictionaryOpen(!mobileDictionaryOpen);

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
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-[#F4E7CB]  transition-all duration-200">
                            Users
                        </p>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={toggleDictionary}
                            className={`flex items-center text-xl p-[23px] text-gray-800 h-full border-b-4 border-white hover:border-[#F4E7CB] ${dictionaryOpen ? 'border-[#F4E7CB]' : 'border-white'} transition-all duration-200`}
                        >
                            Dictionary {dictionaryOpen ? <IoChevronUp size={14} className="ml-2 inline" /> : <IoChevronDown size={14}  className="ml-2 inline" />}
                        </button>
                        <div
                            className={`absolute left-0 mt-[1px] bg-white shadow-md rounded-b-md z-10 w-[158px] border-b border-l border-r border-b-gray-200 overflow-hidden transition-all duration-[400ms] ease-in-out ${
                                dictionaryOpen ? 'max-h-48' : 'max-h-0'
                            }`}
                        >
                            {/*<Link to="/admin/dictionary/animals">
                                <p className="px-4 py-2 hover:text-[#A68A64]">Animals</p>
                            </Link>
                            <Link to="/admin/dictionary/terrains">
                                <p className="px-4 py-2 hover:text-[#A68A64]">Terrains</p>
                            </Link>*/}
                            <Link to="/admin/dictionary/feed">
                                <p className="px-4 py-2 hover:text-[#A68A64]">Feed</p>
                            </Link>
                            <Link to="/admin/dictionary/symptoms">
                                <p className="px-4 py-2 rounded-b-md hover:text-[#A68A64]">Symptoms</p>
                            </Link>
                        </div>


                    </div>

                    <Link to="/admin/account">
                        <p className="text-xl p-[23px] text-gray-800 cursor-pointer h-full border-b-4 border-white hover:border-[#F4E7CB] transition-all duration-200">
                            Account
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

                    <li
                        onClick={toggleMobileDictionary}
                        className="flex justify-between items-center p-3 mb-2 text-gray-800 border-b-2 border-gray-200 cursor-pointer hover:pl-2 hover:border-[#F4E7CB] duration-200"
                    >
                        Słownik {mobileDictionaryOpen ? <IoChevronUp /> : <IoChevronDown />}
                    </li>
                    {mobileDictionaryOpen && (
                        <div className="ml-4">
                            <Link to="/admin/dictionary/animals">
                                <li className="py-2 text-gray-800 hover:pl-2 hover:text-[#A68A64]">Animals</li>
                            </Link>
                            <Link to="/admin/dictionary/terrains">
                                <li className="py-2 text-gray-800 hover:pl-2 hover:text-[#A68A64]">Terrains</li>
                            </Link>
                            <Link to="/admin/dictionary/feed">
                                <li className="py-2 text-gray-800 hover:pl-2 hover:text-[#A68A64]">Feed</li>
                            </Link>
                            <Link to="/admin/dictionary/symptoms">
                                <li className="py-2 text-gray-800 hover:pl-2 hover:text-[#A68A64]">Symptoms</li>
                            </Link>
                        </div>
                    )}

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

export default AdminNavbar;
