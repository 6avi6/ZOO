import React, { useEffect, useState } from 'react';
import {
    getAllFoodTypes,
    createFoodType,
    updateFoodType,
    deleteFoodType
} from '../../services/foodTypeService';
import RegistrarNavbar from "../../components/RegistrarNavbar";

const EditFoodTypes = () => {
    const [foodTypes, setFoodTypes] = useState([]);
    const [newFood, setNewFood] = useState({ name: '', description: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ name: '', description: '' });

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
        <div className="relative p-6 min-h-screen bg-gray-100" >
            <RegistrarNavbar />
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Typy Jedzenia</h1>

            {/* Tabela typów jedzenia */}
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
                {foodTypes.map((food, index) => (
                    <tr key={food.id}>
                        <td className="border p-2">{food.id}</td>
                        <td className="border p-2">
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : food.name}
                        </td>
                        <td className="border p-2">
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editData.description}
                                    onChange={(e) => handleEditChange('description', e.target.value)}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : food.description}
                        </td>
                        <td className="border p-2 space-x-2">
                            {editIndex === index ? (
                                <button
                                    onClick={() => saveEdit(food.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Zapisz
                                </button>
                            ) : (
                                <button
                                    onClick={() => startEdit(index, food)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edytuj
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(food.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Dodawanie nowego typu */}
            <div className="border p-4 rounded bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">Dodaj nowy typ</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Nazwa"
                        value={newFood.name}
                        onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-2 py-1 w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="Opis"
                        value={newFood.description}
                        onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
                        className="border rounded px-2 py-1 w-1/2"
                    />
                    <button
                        onClick={handleAddFoodType}
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

export default EditFoodTypes;
