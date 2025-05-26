import React, { useEffect, useState } from 'react';
import RegistrarNavbar from '../../components/RegistrarNavbar';
import { getAllCaregivers } from '../../services/caretakerService';
import { getUser, updateUserById, deleteUser } from '../../services/userService';
import { registerUser } from '../../services/adminService';

const EditCaretaker = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'CARETAKER'
    });

    useEffect(() => {
        const fetchCaregivers = async () => {
            const data = await getAllCaregivers();
            setCaregivers(data);
        };
        fetchCaregivers();
    }, []);

    const handleEditClick = async (user) => {
        try {
            const fullData = await getUser(user.id);
            setEditingUser(user.id);
            setEditedUser(fullData);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Brak autoryzacji. Proszę się zalogować ponownie.');
            } else {
                alert('Błąd podczas pobierania danych użytkownika.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            await updateUserById(editedUser.id, editedUser);
            const updated = await getAllCaregivers();
            setCaregivers(updated);
            setEditingUser(null);
        } catch {
            alert('Błąd podczas zapisywania zmian.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            console.log(id)
            await deleteUser(id);
            setCaregivers(caregivers.filter(u => u.id !== id));
        } catch {
            alert('Błąd podczas usuwania użytkownika.');
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegisterClick = async () => {
        try {
            await registerUser(newUser);
            const updated = await getAllCaregivers();
            setCaregivers(updated);
            setIsAdding(false);
            setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'CARETAKER' });

        } catch (error) {
            alert('Błąd podczas rejestracji nowego opiekuna.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-4">Opiekunowie</h1>
            <stron className="bg-red-800"> Nie ma dodawania</stron>
            {isAdding && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Dodaj nowego opiekuna</h2>
                        <input
                            name="firstName"
                            placeholder="Imię"
                            value={newUser.firstName}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            name="lastName"
                            placeholder="Nazwisko"
                            value={newUser.lastName}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Hasło"
                            value={newUser.password}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleRegisterClick}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Zarejestruj
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'CARETAKER' });
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <table className="w-full bg-white rounded shadow-md">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-2">Imię</th>
                    <th className="p-2">Nazwisko</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Zatrudniony</th>
                    <th className="p-2 text-center">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {caregivers.map(user => (
                    <tr key={user.id} className="text-sm text-left">
                        {editingUser === user.id ? (
                            <>
                                <td className="p-2">
                                    <input
                                        name="firstName"
                                        value={editedUser.firstName || ''}
                                        onChange={handleChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="p-2">
                                    <input
                                        name="lastName"
                                        value={editedUser.lastName || ''}
                                        onChange={handleChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="p-2">
                                    <input
                                        name="email"
                                        value={editedUser.email || ''}
                                        onChange={handleChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="p-2">{editedUser.hireDate}</td>
                                <td className="p-2 flex justify-center gap-2">
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-green-600 text-white px-4 py-1 rounded w-20"
                                    >
                                        Zapisz
                                    </button>
                                    <button
                                        onClick={() => setEditingUser(null)}
                                        className="bg-gray-500 text-white px-4 py-1 rounded w-20"
                                    >
                                        Anuluj
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="p-2">{user.firstName}</td>
                                <td className="p-2">{user.lastName}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.hireDate}</td>
                                <td className="p-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="bg-blue-600 text-white px-4 py-1 rounded w-20"
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user.id)}
                                        className="bg-red-600 text-white px-4 py-1 rounded w-20"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}


                </tbody>

            </table>

            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                +
            </button>
        </div>
    );
};

export default EditCaretaker;
