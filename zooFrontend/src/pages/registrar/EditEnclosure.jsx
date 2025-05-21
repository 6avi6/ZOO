import React, { useEffect, useState } from 'react';
import { getAllEnclosures, updateEnclosure, deleteEnclosure, addEnclosure } from '../../services/enclosureService';
import RegistrarNavbar from "../../components/RegistrarNavbar"; // Załóżmy, że masz te usługi.

const EditEnclosure = () => {
    const [enclosures, setEnclosures] = useState([]);
    const [editingEnclosure, setEditingEnclosure] = useState(null);
    const [editedEnclosure, setEditedEnclosure] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newEnclosureData, setNewEnclosureData] = useState({
        name: '',
        description: '',
        capacity: '',
    });

    useEffect(() => {
        const fetchEnclosures = async () => {
            const data = await getAllEnclosures();
            setEnclosures(data);
        };
        fetchEnclosures();
    }, []);

    const handleEditClick = (enclosure) => {
        setEditingEnclosure(enclosure.id);
        setEditedEnclosure({ ...enclosure });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedEnclosure(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveClick = async (id) => {
        await updateEnclosure(id, editedEnclosure);
        const updated = await getAllEnclosures();
        setEnclosures(updated);
        setEditingEnclosure(null);
    };

    const handleDeleteClick = async (id) => {
        await deleteEnclosure(id);
        setEnclosures(enclosures.filter(e => e.id !== id));
    };

    const handleAddEnclosureChange = (e) => {
        const { name, value } = e.target;
        setNewEnclosureData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddEnclosureSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEnclosure(newEnclosureData);
            const updated = await getAllEnclosures();
            setEnclosures(updated);
            setIsAdding(false);
            setNewEnclosureData({
                name: '',
                description: '',
                capacity: '',
            });
        } catch (err) {
            console.error('Błąd przy dodawaniu wybiegu:', err);
            alert('Dodanie wybiegu nie powiodło się.');
        }
    };

    return (
        <div className="relative p-6 min-h-screen bg-gray-100">
            <RegistrarNavbar />
            <strong className="text-red-800">Uwaga nie ma endpointów dołączonych</strong>
            <h2 className="text-2xl font-bold mb-4">Edycja wybiegów</h2>
            {/* Floating Add Button */}
            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                +
            </button>

            {/* Enclosure Table */}
            <div className="w-full flex mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-6">
                <table className="w-full table-auto text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nazwa</th>
                        <th className="px-4 py-2">Opis</th>
                        <th className="px-4 py-2">Pojemność</th>
                        <th className="px-4 py-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {enclosures.map((enclosure) => (
                        <tr key={enclosure.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{enclosure.id}</td>
                            {editingEnclosure === enclosure.id ? (
                                <>
                                    <td><input name="name" value={editedEnclosure.name} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="description" value={editedEnclosure.description} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="capacity" value={editedEnclosure.capacity} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleSaveClick(enclosure.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Zapisz</button>
                                        <button onClick={() => setEditingEnclosure(null)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Anuluj</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-2">{enclosure.name}</td>
                                    <td className="px-4 py-2">{enclosure.description}</td>
                                    <td className="px-4 py-2">{enclosure.capacity}</td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleEditClick(enclosure)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edytuj</button>
                                        <button onClick={() => handleDeleteClick(enclosure.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Usuń</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add Enclosure Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">Dodaj nowy wybieg</h2>
                        <form onSubmit={handleAddEnclosureSubmit} className="flex flex-col gap-4">
                            <input name="name" placeholder="Nazwa" value={newEnclosureData.name} onChange={handleAddEnclosureChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="description" placeholder="Opis" value={newEnclosureData.description} onChange={handleAddEnclosureChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="capacity" type="number" placeholder="Pojemność" value={newEnclosureData.capacity} onChange={handleAddEnclosureChange} required className="p-4 border rounded-lg shadow-sm" />
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

export default EditEnclosure;
