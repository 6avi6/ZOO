import React, { useEffect, useState } from 'react';
import {
    getAllFoodTypes,
    createFoodType,
    updateFoodType,
    deleteFoodType
} from '../../services/foodTypeService';
import RegistrarNavbar from "../../components/RegistrarNavbar";
import { Pencil, Save, Trash2, X, Plus } from "lucide-react";

const EditFoodTypes = () => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [newFood, setNewFood] = useState({ name: '', description: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ name: '', description: '' });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchFoodTypes();
    }, []);

    const fetchFoodTypes = async () => {
        try {
            const data = await getAllFoodTypes();
            setFoodTypes(data);
        } catch (error) {
            console.error("Błąd ładowania typów jedzenia:", error);
        }
    };

    const handleAddFoodType = async () => {
        try {
            await createFoodType(newFood);
            setNewFood({ name: '', description: '' });
            setShowModal(false);
            fetchFoodTypes();
        } catch (error) {
            console.error("Błąd przy dodawaniu typu jedzenia:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteFoodType(id);
            fetchFoodTypes();
        } catch (error) {
            console.error("Błąd przy usuwaniu typu jedzenia:", error);
        }
    };

    const startEdit = (index, food) => {
        setEditIndex(index);
        setEditData({ name: food.name, description: food.description });
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
            await updateFoodType(id, editData);
            setEditIndex(null);
            fetchFoodTypes();
        } catch (error) {
            console.error("Błąd przy aktualizacji typu jedzenia:", error);
        }
    };

    return (
        <div className="p-8">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">Typy Jedzenia</h1>
            <div className="overflow-x-auto">

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
                    {foodTypes.map((food, index) => (
                        <tr key={food.id} className="text-center">
                            <td className="border px-4 py-2">{food.id}</td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="border rounded px-3 py-1 w-full"
                                    />
                                ) : food.name}
                            </td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                        className="border  rounded px-3 py-1 w-full"
                                    />
                                ) : food.description}
                            </td>
                            <td className="border px-4 py-2">
                                {editIndex === index ? (
                                    <>
                                        <button
                                            onClick={() => saveEdit(food.id)}
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
                                            onClick={() => startEdit(index, food)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food.id)}
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

            {/* FAB Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
                title="Dodaj typ jedzenia"
            >
                <Plus size={20} />
            </button>

            {/* Modal dodawania */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Nowy Typ Jedzenia</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nazwa"
                                value={newFood.name}
                                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full border rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Opis"
                                value={newFood.description}
                                onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
                            >
                                <X size={16} /> Anuluj
                            </button>
                            <button
                                onClick={handleAddFoodType}
                                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                            >
                                <Save size={16} />Dodaj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditFoodTypes;
