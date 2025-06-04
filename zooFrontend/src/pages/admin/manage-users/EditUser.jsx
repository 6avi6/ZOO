import React, { useEffect, useState } from 'react';
import { getUser, updateUserById } from '../../../services/userService';
import { toast } from 'react-toastify';
import {IoMdClose} from "react-icons/io";
import {FaSave} from "react-icons/fa";

const EditUser = ({ userId, onClose, onUserUpdated }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUser(userId);
                setUserData(data);
            } catch (err) {
                toast.error("Błąd podczas pobierania danych użytkownika");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserById(userId, userData);
            toast.success("Zaktualizowano użytkownika!");
            onUserUpdated();
            onClose();
        } catch (err) {
            toast.error("Błąd podczas zapisywania zmian.");
        }
    };

    if (!userId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
                <IoMdClose
                    onClick={onClose}
                    size={36}
                    className="absolute top-5 right-5 text-gray-800 cursor-pointer underline hover:text-[#e30b1e] rounded-full p-1 hover:bg-red-100 transition-all duration-150"/>
                <h2 className="text-xl font-bold mb-4">Edytuj użytkownika</h2>

                {loading ? (
                    <p>Ładowanie danych...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label>Nazwa użytkownika</label>
                            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Login" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label>Imię</label>
                            <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="Imię" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label>Nazwisko</label>
                            <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Nazwisko" className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />

                        </div>
                        <div>
                            <label>Rola</label>
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="ADMIN">Administrator</option>
                                <option value="DIRECTOR">Dyrektor</option>
                                <option value="VETERINARIAN">Weterynarz</option>
                                <option value="REGISTRAR">Rejestrator</option>
                                <option value="CAREGIVER">Opiekun</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#526C43] text-white w-[40%] block mx-auto py-2 rounded-full hover:bg-[#234228] transition-colors flex items-center justify-center gap-2"
                        >
                            <FaSave />
                            Zapisz zmiany
                        </button>


                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUser;
