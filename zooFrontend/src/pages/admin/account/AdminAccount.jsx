import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar";
import {getCurrentUser} from "../../../services/UserService";

const AdminAccount = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        hireDate: '',
        role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                console.log('Otrzymane dane użytkownika:', userData); // Dodane dla debugowania
                setUser({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    username: userData.username || '',
                    email: userData.email || '',
                    hireDate: userData.hireDate || '', // Poprawiono nazwę pola
                    role: userData.role || ''
                });
            } catch (error) {
                console.error('Błąd pobierania danych:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="bg-white mt-12 mx-auto h-[700px] max-w-lg rounded-lg border shadow-sm border-gray-300">
                <h1 className="mx-auto ml-12 font-semibold text-2xl text-gray-800 my-6">Konto</h1>
                <div className="mx-12 my-6 flex flex-col justify-between gap-6">
                    <div>
                        <label className="block text-gray-700 text-md mb-1">Imię</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.firstName} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md mb-1">Nazwisko</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.lastName} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md mb-1">Nazwa użytkownika</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.username} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md mb-1">E-mail</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.email} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md mb-1">Data zatrudnienia</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.hireDate} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md mb-1">Rola</label>
                        <input type="text" className="border w-full p-1 border-gray-300 rounded-lg" value={user.role} readOnly />
                    </div>
                    <button className="mt-4 mx-auto w-1/3 bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md transition-all duration-150">Zapisz</button>
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;