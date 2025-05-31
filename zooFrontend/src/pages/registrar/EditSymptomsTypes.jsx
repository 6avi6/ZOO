import React, { useEffect, useState } from 'react';
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
        <div className="relative p-6 min-h-screen bg-gray-100" >
            <RegistrarNavbar />
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Typy Objawów</h1>

            {/* Tabela symptomów */}
            <table className="w-full table-auto border border-gray-300 mb-6">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nazwa</th>
                    <th className="border p-2">Opis</th>
                    <th className="border p-2">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {symptoms.map((symptom, index) => (
                    <tr key={symptom.id}>
                        <td className="border p-2">{symptom.id}</td>
                        <td className="border p-2">
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : symptom.name}
                        </td>
                        <td className="border p-2">
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.description}
                                    onChange={(e) => handleEditChange('description', e.target.value)}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : symptom.description}
                        </td>
                        <td className="border p-2 space-x-2">
                            {editIndex === index ? (
                                <button
                                    onClick={() => saveEdit(symptom.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Zapisz
                                </button>
                            ) : (
                                <button
                                    onClick={() => startEdit(index, symptom)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edytuj
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(symptom.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Dodawanie nowego symptomu */}
            <div className="border p-4 rounded bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">Dodaj nowy objaw</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Nazwa"
                        value={newSymptom.name}
                        onChange={(e) => setNewSymptom(prev => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-2 py-1 w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="Opis"
                        value={newSymptom.description}
                        onChange={(e) => setNewSymptom(prev => ({ ...prev, description: e.target.value }))}
                        className="border rounded px-2 py-1 w-1/2"
                    />
                    <button
                        onClick={handleAddSymptom}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                        Dodaj
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default EditSymptoms;
