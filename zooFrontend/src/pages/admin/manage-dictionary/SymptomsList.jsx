import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X, Save } from 'lucide-react';
import {
    getAllSymptoms,
    createSymptom,
    updateSymptom,
    deleteSymptom
} from '../../../services/symptomService';
import AdminNavbar from "../../../components/AdminNavbar";
import { toast } from "react-toastify";


const SymptomsList = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [newSymptom, setNewSymptom] = useState({ name: '', description: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const data = await getAllSymptoms();
            setSymptoms(data);
        } catch (error) {
            toast.error("Failed to fetch symptoms.");
        }
    };

    const handleAddSymptom = async () => {
        try {
            await createSymptom(newSymptom);
            setNewSymptom({ name: '', description: '' });
            setShowModal(false);
            toast.success("Symptom added successfully!");
            fetchSymptoms();
        } catch (error) {
            toast.error("Failed to add symptom.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSymptom(id);
            toast.success("Symptom deleted successfully!");
            fetchSymptoms();
        } catch (error) {
            toast.error("Failed to delete symptom.");
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
            toast.success("Symptom updated successfully!");
            fetchSymptoms();
        } catch (error) {
            toast.error("Failed to update symptom.");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="bg-white relative mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300 p-8">
                <div className="flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Symptom Types</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="absolute right-0 top-0 mr-6 mt-6 bg-[#526C43] hover:bg-[#234228] text-white py-3 px-3 rounded-full transition-all duration-150"
                    >
                        <Plus className="inline-block w-6 sm:mr-4 h-6" />
                        <span className="hidden sm:inline">Add Symptom</span>
                    </button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b">
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Description</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {symptoms.map((symptom, index) => (
                        <tr key={symptom.id} className="hover:bg-gray-50">
                            <td className="p-3">{symptom.id}</td>
                            <td className="p-3">
                                {editIndex === index ? (
                                    <input
                                        value={editData.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="border rounded p-1 w-full"
                                    />
                                ) : (
                                    symptom.name
                                )}
                            </td>
                            <td className="p-3">
                                {editIndex === index ? (
                                    <input
                                        value={editData.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                        className="border rounded p-1 w-full"
                                    />
                                ) : (
                                    symptom.description
                                )}
                            </td>
                            <td className="p-3 text-right space-x-3">
                                {editIndex === index ? (
                                    <>
                                        <Save
                                            onClick={() => saveEdit(symptom.id)}
                                            className="inline-block w-5 h-5 text-green-600 cursor-pointer hover:text-green-800 transition-all"
                                        />
                                        <X
                                            onClick={cancelEdit}
                                            className="inline-block w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-all"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Pencil
                                            onClick={() => startEdit(index, symptom)}
                                            className="inline-block w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition-all"
                                        />
                                        <Trash2
                                            onClick={() => handleDelete(symptom.id)}
                                            className="inline-block w-5 h-5 text-red-600 cursor-pointer hover:text-red-800 transition-all"
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Add New Symptom</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newSymptom.name}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, name: e.target.value }))}
                                className="border rounded w-full p-2 mb-4"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newSymptom.description}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, description: e.target.value }))}
                                className="border rounded w-full p-2 mb-4"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddSymptom}
                                    className="px-4 py-2 bg-[#526C43] text-white rounded hover:bg-[#234228] transition-all"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SymptomsList;