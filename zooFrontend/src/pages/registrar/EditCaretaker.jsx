import React, { useEffect, useState } from 'react';
import RegistrarNavbar from '../../components/RegistrarNavbar'; // Nawigacja
import { getAllCaretakers, updateCaretaker, deleteCaretaker, addCaretaker } from '../../services/caretakerService';

const EditCaretaker = () => {
    const [caretakers, setCaretakers] = useState([]);
    const [editingCaretaker, setEditingCaretaker] = useState(null);
    const [editedCaretaker, setEditedCaretaker] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newCaretakerData, setNewCaretakerData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        const fetchCaretakers = async () => {
            const data = await getAllCaretakers();
            setCaretakers(data);
        };
        fetchCaretakers();
    }, []);

    const handleEditClick = (caretaker) => {
        setEditingCaretaker(caretaker.id);
        setEditedCaretaker({ ...caretaker });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedCaretaker(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveClick = async (id) => {
        await updateCaretaker(id, editedCaretaker);
        const updated = await getAllCaretakers();
        setCaretakers(updated);
        setEditingCaretaker(null);
    };

    const handleDeleteClick = async (id) => {
        await deleteCaretaker(id);
        setCaretakers(caretakers.filter(c => c.id !== id));
    };

    const handleAddCaretakerChange = (e) => {
        const { name, value } = e.target;
        setNewCaretakerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCaretakerSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCaretaker(newCaretakerData);
            const updated = await getAllCaretakers();
            setCaretakers(updated);
            setIsAdding(false);
            setNewCaretakerData({
                firstName: '',
                lastName: '',
                age: '',
                phoneNumber: '',
                email: ''
            });
        } catch (err) {
            console.error('Błąd przy dodawaniu opiekuna:', err);
            alert('Dodanie opiekuna nie powiodło się.');
        }
    };

    return (
        <div className="relative p-6 min-h-screen bg-gray-100">
            <RegistrarNavbar />
            <strong className="text-red-800">Uwaga nie ma endpointów dołączonych</strong>
            {/* Floating Add Button */}
            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                +
            </button>

            {/* Caretaker Table */}
            <div className="w-full flex mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-6">
                <table className="w-full table-auto text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Imię</th>
                        <th className="px-4 py-2">Nazwisko</th>
                        <th className="px-4 py-2">Wiek</th>
                        <th className="px-4 py-2">Numer telefonu</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {caretakers.map((caretaker) => (
                        <tr key={caretaker.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{caretaker.id}</td>
                            {editingCaretaker === caretaker.id ? (
                                <>
                                    <td><input name="firstName" value={editedCaretaker.firstName} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="lastName" value={editedCaretaker.lastName} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="age" value={editedCaretaker.age} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="phoneNumber" value={editedCaretaker.phoneNumber} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="email" value={editedCaretaker.email} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleSaveClick(caretaker.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Zapisz</button>
                                        <button onClick={() => setEditingCaretaker(null)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Anuluj</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-2">{caretaker.firstName}</td>
                                    <td className="px-4 py-2">{caretaker.lastName}</td>
                                    <td className="px-4 py-2">{caretaker.age}</td>
                                    <td className="px-4 py-2">{caretaker.phoneNumber}</td>
                                    <td className="px-4 py-2">{caretaker.email}</td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleEditClick(caretaker)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edytuj</button>
                                        <button onClick={() => handleDeleteClick(caretaker.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Usuń</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add Caretaker Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">Dodaj nowego opiekuna</h2>
                        <form onSubmit={handleAddCaretakerSubmit} className="flex flex-col gap-4">
                            <input name="firstName" placeholder="Imię" value={newCaretakerData.firstName} onChange={handleAddCaretakerChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="lastName" placeholder="Nazwisko" value={newCaretakerData.lastName} onChange={handleAddCaretakerChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="age" type="number" placeholder="Wiek" value={newCaretakerData.age} onChange={handleAddCaretakerChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="phoneNumber" placeholder="Numer telefonu" value={newCaretakerData.phoneNumber} onChange={handleAddCaretakerChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="email" type="email" placeholder="Email" value={newCaretakerData.email} onChange={handleAddCaretakerChange} required className="p-4 border rounded-lg shadow-sm" />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Dodaj</button>
                                <button type="button" onClick={() => setIsAdding(false)} className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all">Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCaretaker;
