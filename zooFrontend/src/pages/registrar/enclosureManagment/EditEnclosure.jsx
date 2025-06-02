import React, { useEffect, useState } from 'react';
import { Trash2, Pencil, Save, X, Plus } from 'lucide-react';
import RegistrarNavbar from '../../../components/RegistrarNavbar';
import {
    getAllEnclosures,
    addEnclosure,
    updateEnclosure,
    deleteEnclosure
} from '../../../services/enclosureService';

const EditEnclosure = () => {
    const [enclosures, setEnclosures] = useState([]);
    const [editingEnclosure, setEditingEnclosure] = useState(null);
    const [editedEnclosure, setEditedEnclosure] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newEnclosureData, setNewEnclosureData] = useState({
        terrainType: '',
        isAccessWater: false,
        maxAnimals: '',
        temperature: '',
        insolation: ''
    });

    const terrainTypes = [
        'FOREST',
        'GRASSLAND',
        'SAVANNA',
        'SHRUBLAND',
        'MOUNTAIN',
        'WETLAND',
        'DESERT',
        'ARTIFICIAL'
    ];

    const insolationOptions = ['Low', 'Medium', 'High'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const enclosureData = await getAllEnclosures();
                setEnclosures(enclosureData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEditClick = (enclosure) => {
        setEditingEnclosure(enclosure.id);
        setEditedEnclosure({ ...enclosure });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedEnclosure(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveClick = async (id) => {
        try {
            await updateEnclosure(id, editedEnclosure);
            const updated = await getAllEnclosures();
            setEnclosures(updated);
            setEditingEnclosure(null);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteEnclosure(id);
            setEnclosures(enclosures.filter(e => e.id !== id));
        } catch (error) {
            console.error('Error deleting enclosure:', error);
        }
    };

    const handleAddChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEnclosureData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await addEnclosure(newEnclosureData);
            const updated = await getAllEnclosures();
            setEnclosures(updated);
            setIsAdding(false);
            setNewEnclosureData({
                terrainType: '',
                isAccessWater: false,
                maxAnimals: '',
                temperature: '',
                insolation: ''
            });
        } catch (error) {
            console.error('Error adding enclosure:', error);
        }
    };

    return (
        <div className="p-8">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-4">Enclosures</h1>

            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                <Plus size={20} />
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Insolation</th>
                        <th className="px-4 py-2">Access to Water</th>
                        <th className="px-4 py-2">Max Animals</th>
                        <th className="px-4 py-2">Temperature</th>
                        <th className="px-4 py-2">Terrain Type</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {enclosures.map((enc) => (
                        <tr key={enc.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{enc.id}</td>
                            {editingEnclosure === enc.id ? (
                                <>
                                    <td>
                                        <select
                                            name="insolation"
                                            value={editedEnclosure.insolation}
                                            onChange={handleEditChange}
                                            className="p-1 border rounded"
                                        >
                                            <option value="">Select</option>
                                            {insolationOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name="isAccessWater"
                                            checked={editedEnclosure.isAccessWater}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="maxAnimals"
                                            type="number"
                                            value={editedEnclosure.maxAnimals}
                                            onChange={handleEditChange}
                                            className="p-1 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="temperature"
                                            type="number"
                                            value={editedEnclosure.temperature}
                                            onChange={handleEditChange}
                                            className="p-1 border rounded"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="terrainType"
                                            value={editedEnclosure.terrainType}
                                            onChange={handleEditChange}
                                            className="p-1 border rounded"
                                        >
                                            <option value="">Select</option>
                                            {terrainTypes.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveClick(enc.id)}
                                            className="px-2 py-1 text-green-600 hover:text-green-400 rounded"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button
                                            onClick={() => setEditingEnclosure(null)}
                                            className="px-2 py-1 text-gray-600 hover:text-gray-400 rounded"
                                        >
                                            <X size={16} />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-2">{enc.insolation}</td>
                                    <td className="px-4 py-2">{enc.isAccessWater ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-2">{enc.maxAnimals}</td>
                                    <td className="px-4 py-2">{enc.temperature}</td>
                                    <td className="px-4 py-2">{enc.terrainType}</td>
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(enc)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(enc.id)}
                                            className="px-2 py-1 text-red-600 hover:text-red-400"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isAdding && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">Add Enclosure</h2>
                        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
                            <select
                                name="insolation"
                                value={newEnclosureData.insolation}
                                onChange={handleAddChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            >
                                <option value="">Select Insolation</option>
                                {insolationOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isAccessWater"
                                    checked={newEnclosureData.isAccessWater}
                                    onChange={handleAddChange}
                                />
                                Access to Water
                            </label>
                            <input
                                name="maxAnimals"
                                type="number"
                                placeholder="Maximum Number of Animals"
                                value={newEnclosureData.maxAnimals}
                                onChange={handleAddChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            />
                            <input
                                name="temperature"
                                type="number"
                                placeholder="Temperature"
                                value={newEnclosureData.temperature}
                                onChange={handleAddChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            />
                            <select
                                name="terrainType"
                                value={newEnclosureData.terrainType}
                                onChange={handleAddChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            >
                                <option value="">Select Terrain Type</option>
                                {terrainTypes.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="submit"
                                    className="p-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditEnclosure;
