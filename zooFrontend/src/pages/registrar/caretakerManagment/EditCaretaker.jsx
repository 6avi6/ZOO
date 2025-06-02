import React, { useEffect, useState } from 'react';
import RegistrarNavbar from '../../../components/RegistrarNavbar';
import { getAllCaregivers } from '../../../services/caretakerService';
import { getUser, updateUserById, deleteUser } from '../../../services/userService';
import { registerUser } from '../../../services/adminService';
import { Pencil, Plus, Save, X, Trash2 } from 'lucide-react';

const EditCaretaker = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: 'CAREGIVER'
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
                alert('Unauthorized. Please log in again.');
            } else {
                alert('Error fetching user data.');
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
            alert('Error saving changes.');
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteUser(id);
            setCaregivers(caregivers.filter(u => u.id !== id));
        } catch {
            alert('Error deleting user.');
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
            setNewUser({ username: '', password: '', role: 'CAREGIVER' });
        } catch (error) {
            alert('Error registering new caregiver.');
        }
    };

    const displayOrPlaceholder = (value) => value ? value : <span className="text-gray-400 italic">No data</span>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">Caregivers</h1>

            {isAdding && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Caregiver</h2>
                        <input
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={handleAddChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleRegisterClick}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewUser({ username: '', password: '', role: 'CAREGIVER' });
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-auto rounded-lg bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {['Username', 'First Name', 'Last Name', 'Email', 'Hired', 'Actions'].map((header) => (
                            <th
                                key={header}
                                scope="col"
                                className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {caregivers.map(user => (
                        <tr key={user.id} className="group hover:bg-gray-50 transition-colors duration-150">
                            {editingUser === user.id ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="username"
                                            value={user.username || ''}
                                            className="border p-1 rounded w-full"
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="firstName"
                                            value={editedUser.firstName || ''}
                                            onChange={handleChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="lastName"
                                            value={editedUser.lastName || ''}
                                            onChange={handleChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="email"
                                            value={editedUser.email || ''}
                                            onChange={handleChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            type="date"
                                            name="hireDate"
                                            value={editedUser.hireDate || ''}
                                            onChange={handleChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                        <button
                                            onClick={handleSaveClick}
                                            className="text-green-600 hover:text-green-400 px-2 py-2"
                                        >
                                            <Save size={16}/>
                                        </button>
                                        <button
                                            onClick={() => setEditingUser(null)}
                                            className="text-gray-600 hover:text-gray-400 px-2 py-2"
                                        >
                                            <X size={16} />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.username)}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.firstName)}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.lastName)}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.email)}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.hireDate)}</td>
                                    <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"><Pencil size={16} /></button>
                                        <button
                                            onClick={() => handleDeleteClick(user.id)}
                                            className="px-2 py-1 text-red-600 hover:text-red-400"><Trash2 size={16} /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button
                    onClick={() => setIsAdding(true)}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
                >
                    <Plus size={20}/>
                </button>
            </div>
        </div>
    );
};

export default EditCaretaker;
