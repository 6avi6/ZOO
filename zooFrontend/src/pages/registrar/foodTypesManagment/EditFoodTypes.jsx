import React, { useEffect, useState } from 'react';
import {
    getAllFoodTypes,
    createFoodType,
    updateFoodType,
    deleteFoodType
} from '../../../services/foodTypeService';
import RegistrarNavbar from "../../../components/RegistrarNavbar";
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
            console.error("Error loading food types:", error);
        }
    };

    const handleAddFoodType = async () => {
        try {
            await createFoodType(newFood);
            setNewFood({ name: '', description: '' });
            setShowModal(false);
            fetchFoodTypes();
        } catch (error) {
            console.error("Error adding food type:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteFoodType(id);
            fetchFoodTypes();
        } catch (error) {
            console.error("Error deleting food type:", error);
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
            console.error("Error updating food type:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-0 pr-6 pb-6 pl-6">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">Food Types</h1>
            <div className="overflow-auto rounded-lg bg-white shadow-md">

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
                    {foodTypes.map((food, index) => (
                        <tr key={food.id} className="group hover:bg-gray-50 transition-colors duration-150">
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">{food.id}</td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editIndex === index ? (
                                    <input
                                        placeholder="Name"
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : food.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editIndex === index ? (
                                    <input
                                        placeholder="Description"
                                        type="text"
                                        value={editData.description}
                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : food.description}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                {editIndex === index ? (
                                    <>
                                        <button
                                            onClick={() => saveEdit(food.id)}
                                            title="Update food type"
                                            className="px-2 py-1 text-green-600 hover:text-green-400"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className=" px-2 py-1 text-gray-600 hover:text-gray-400"
                                            title="Cancel edit"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEdit(index, food)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                            title="Edit food type"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food.id)}
                                            className="px-2 py-1 text-red-600 hover:text-red-400"
                                            title="Delete food type"
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
                title="Add food type"
            >
                <Plus size={20} />
            </button>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4 text-center">New Food Type</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newFood.name}
                                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full border rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newFood.description}
                                onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
                                title="Cancel adding"
                            >
                                <X size={16} /> Cancel
                            </button>
                            <button
                                onClick={handleAddFoodType}
                                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                title={"Add food type"}
                            >
                                <Save size={16} />Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditFoodTypes;