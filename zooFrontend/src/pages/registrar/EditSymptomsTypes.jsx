import React, { useEffect, useState } from 'react';
import {Pencil, Trash2, Plus, X, Save} from 'lucide-react';
import {
    getAllSymptoms,
    createSymptom,
    updateSymptom,
    deleteSymptom
} from '../../services/symptomService';
import RegistrarNavbar from "../../components/RegistrarNavbar";

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
            console.error("Błąd ładowania symptomów:", error);
        }
    };

    const handleAddSymptom = async () => {
        try {
            await createSymptom(newSymptom);
            setNewSymptom({ name: '', description: '' });
            setIsDialogOpen(false);
            fetchSymptoms();
        } catch (error) {
            console.error("Błąd przy dodawaniu symptomu:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSymptom(id);
            fetchSymptoms();
        } catch (error) {
            console.error("Błąd przy usuwaniu symptomu:", error);
        }
    };

    const startEdit = (index, symptom) => {
        setEditIndex(index);
        setEditData({ name: symptom.name, description: symptom.description });
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
            console.error("Błąd przy aktualizacji symptomu:", error);
        }
    };

    return (
        <div className="p-8">
            <RegistrarNavbar />

            <h1 className="text-2xl font-bold mb-6">Typy Objawów</h1>
            <div className="overflow-x-auto">
                {/* Tabela symptomów */}
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nazwa</th>
                        <th className="border px-4 py-2">Opis</th>
                        <th className="border px-4 py-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {symptoms.map((symptom, index) => (
                        <tr key={symptom.id} className="text-center">
                            <td className="border px-4 py-2">{symptom.id}</td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="border rounded-lg px-3 py-1 w-full"
                                    />
                                ) : symptom.name}
                            </td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                        className="border rounded-lg px-3 py-1 w-full"
                                    />
                                ) : symptom.description}
                            </td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <button
                                        onClick={() => saveEdit(symptom.id)}
                                        className="px-2 py-1 text-green-600 hover:text-green-400"
                                    >
                                        <Pencil size={16} />
                                    </button>
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

            {/* Dialog dodawania */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Dodaj nowy objaw</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nazwa"
                                value={newSymptom.name}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, name: e.target.value }))}
                                className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                placeholder="Opis"
                                value={newSymptom.description}
                                onChange={(e) => setNewSymptom(prev => ({ ...prev, description: e.target.value }))}
                                className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <X size={16} /> Anuluj
                                </button>
                                <button
                                    onClick={handleAddSymptom}
                                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <Save size={16} />Dodaj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsDialogOpen(true)}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
            >
                <Plus size={20}/>
            </button>
        </div>
    );
};

export default EditSymptoms;
