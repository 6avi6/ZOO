import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X, Save } from 'lucide-react';
import {
    getAllSymptoms,
    createSymptom,
    updateSymptom,
    deleteSymptom
} from '../../../services/symptomService';
import RegistrarNavbar from "../../../components/RegistrarNavbar";

const EditSymptoms = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [newSymptom, setNewSymptom] = useState({ name: '', description: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ name: '', description: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const data = await getAllSymptoms();
            setSymptoms(data);
        } catch (error) {
            console.error("Error loading symptoms:", error);
        }
    };

    const handleAddSymptom = async () => {
        try {
            await createSymptom(newSymptom);
            setNewSymptom({ name: '', description: '' });
            setIsDialogOpen(false);
            fetchSymptoms();
        } catch (error) {
            console.error("Error adding symptom:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSymptom(id);
            fetchSymptoms();
        } catch (error) {
            console.error("Error deleting symptom:", error);
        }
    };

    const startEdit = (index, symptom) => {
        setEditIndex(index);
        setEditData({ name: symptom.name, description: symptom.description });
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setEditData({ name: '', description: '' });
    };

    const handleEditChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const saveEdit = async (id) => {
        try {
            await updateSymptom(id, editData);
            setEditIndex(null);
            fetchSymptoms();
        } catch (error) {
            console.error("Error updating symptom:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <RegistrarNavbar />

            <h1 className="text-2xl font-bold mb-6">Symptom Types</h1>
            <div className="overflow-auto rounded-lg bg-white shadow-md">
                {/* Symptoms table */}
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {['ID', 'Name', 'Description', 'Actions'].map((header) => (
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
                    {symptoms.map((symptom, index) => (
                        <tr key={symptom.id} className="group hover:bg-gray-50 transition-colors duration-150">
                            <td className="whitespace-nowrap px-4 py-3 font-medium">{symptom.id}</td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : symptom.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : symptom.description}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                {editIndex === index ? (
                                    <>
                                    <button
                                        onClick={() => saveEdit(symptom.id)}
                                        className="px-2 py-1 text-green-600 hover:text-green-400"
                                    >
                                        <Save size={16} />
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className=" px-2 py-1 text-gray-600 hover:text-gray-400"
                                    >
                                        <X size={16} />
                                    </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEdit(index, symptom)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(symptom.id)}
                                            className="px-2 py-1 text-red-600 hover:text-red-400"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50"
            >
                <Plus size={20} />
            </button>

            {/* Add Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Add New Symptom</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newSymptom.name}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, name: e.target.value }))}
                                className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newSymptom.description}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, description: e.target.value }))}
                                className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <X size={16} /> Cancel
                                </button>
                                <button
                                    onClick={handleAddSymptom}
                                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <Save size={16} />Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditSymptoms;