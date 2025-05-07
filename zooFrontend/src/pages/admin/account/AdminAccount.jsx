import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar";
import {getCurrentUser, updateCurrentUser} from "../../../services/userService";
import {ToastContainer, toast, Slide} from "react-toastify";

const AdminAccount = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        hireDate: '',
        role: ''
    });
    const notify = () => toast("Pomyślnie zapisano dane.", {})

    const handleSave = async () => {
        try {
            const updatedUser = await updateCurrentUser(user);
            console.log("Zapisano dane:", updatedUser);
            notify();
        } catch (error) {
            console.error("Błąd zapisu danych:", error);
            alert("Błąd zapisu danych.");
        }
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                console.log('Otrzymane dane użytkownika:', userData);
                setUser({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    username: userData.username || '',
                    email: userData.email || '',
                    hireDate: userData.hireDate || '',
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
            <div className="bg-white my-12 mx-auto h-[550px] max-w-lg rounded-lg border shadow-sm border-gray-300">
                <h1 className="mx-auto ml-12 font-semibold text-2xl text-gray-800 my-6">Konto</h1>
                <div className="mx-12  flex flex-col justify-between gap-2">
                    <div>
                        <label className="block text-gray-700 text-md">Imię</label>
                        <input type="text"
                               className="border w-full p-1 border-gray-300 rounded-lg"
                               value={user.firstName}
                               onChange={(e) => setUser({...user, firstName: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md">Nazwisko</label>
                        <input type="text"
                               className="border w-full p-1 border-gray-300 rounded-lg"
                               value={user.lastName}
                               onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md">Nazwa użytkownika</label>
                        <input type="text"
                               className="border w-full p-1 border-gray-300 rounded-lg"
                               value={user.username}
                               onChange={(e) => setUser({...user, username: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md">E-mail</label>
                        <input type="text"
                               className="border w-full p-1 border-gray-300 rounded-lg"
                               value={user.email}
                               onChange={(e) => setUser({...user, email: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md">Data zatrudnienia</label>
                        <input type="text"
                               className="bg-gray-100 border w-full p-1 border-gray-300 rounded-lg"
                               value={user.hireDate}
                               readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-md">Rola</label>
                        <input type="text"
                               className="bg-gray-100 border w-full p-1 border-gray-300 rounded-lg"
                               value={user.role}
                               readOnly />
                    </div>
                    <button className="mt-4 mx-auto w-1/3 bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md transition-all duration-150"
                            onClick={handleSave}>Zapisz</button>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                theme="light"
                transition={Slide}
                pauseOnHover={false}
                toastClassName="bg-white text-black border border-gray-200 shadow"
                progressClassName="bg-green-500"
            />
        </div>
    );
};

export default AdminAccount;