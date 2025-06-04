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
        <div className="min-h-screen bg-gray-50 pt-0 pr-6 pb-6 pl-6">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">Enclosures</h1>

            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
                title="Add Enclosure"
            >
                <Plus size={20} />
            </button>

            <div className="overflow-auto rounded-lg bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {['ID', 'Insolation', 'Access to Water', 'Max Animals', 'Temperature', 'Terrain Type', 'Actions'].map((header) => (
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
                    {enclosures.map((enc) => (
                        <tr key={enc.id} className="group hover:bg-gray-50 transition-colors duration-150">
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">{enc.id}</td>
                            {editingEnclosure === enc.id ? (
                                <>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <select
                                            name="insolation"
                                            value={editedEnclosure.insolation}
                                            onChange={handleEditChange}
                                            className="border p-1 rounded w-full"
                                        >
                                            <option value="">Select</option>
                                            {insolationOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            type="checkbox"
                                            name="isAccessWater"
                                            checked={editedEnclosure.isAccessWater}
                                            onChange={handleEditChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="maxAnimals"
                                            type="number"
                                            value={editedEnclosure.maxAnimals}
                                            onChange={handleEditChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <input
                                            name="temperature"
                                            type="number"
                                            value={editedEnclosure.temperature}
                                            onChange={handleEditChange}
                                            className="border p-1 rounded w-full"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <select
                                            name="terrainType"
                                            value={editedEnclosure.terrainType}
                                            onChange={handleEditChange}
                                            className="border p-1 rounded w-full"
                                        >
                                            <option value="">Select</option>
                                            {terrainTypes.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                        <button
                                            onClick={() => handleSaveClick(enc.id)}
                                            title="Update enclosure"
                                            className="px-2 py-1 text-green-600 hover:text-green-400 rounded"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button
                                            onClick={() => setEditingEnclosure(null)}
                                            className="px-2 py-1 text-gray-600 hover:text-gray-400 rounded"
                                            title="Cancel update"
                                        >
                                            <X size={16} />
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="whitespace-nowrap px-4 py-3">{enc.insolation}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{enc.isAccessWater ? 'Yes' : 'No'}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{enc.maxAnimals}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{enc.temperature}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{enc.terrainType}</td>
                                    <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                        <button
                                            onClick={() => handleEditClick(enc)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                            title="Edit enclosure"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(enc.id)}
                                            className="px-2 py-1 text-red-600 hover:text-red-400"
                                            title="Delete enclosure"
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
                                    title="Access water"
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
                                    title="Add enclosure"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                                    title="Cancel adding"
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
