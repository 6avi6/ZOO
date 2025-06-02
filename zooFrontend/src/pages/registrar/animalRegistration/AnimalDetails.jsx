import React, { useEffect, useState } from 'react';
import { Pencil, Plus, Save, X,Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import RegistrarNavbar from '../../../components/RegistrarNavbar';
import { getAnimalById } from '../../../services/animalService';
import { getEnclosureById } from '../../../services/enclosureService';
import { getFeedingsByAnimalId, createFeeding, updateFeeding, deleteFeeding } from '../../../services/feedingsService';
import { getCaretakersByAnimalId, assignCaretakersToAnimal,getAllCaregivers } from '../../../services/caretakerService';
import { getAllUsersPaged } from '../../../services/userService';
import { getAllFoodTypes } from '../../../services/foodTypeService';
import {getAllUsers} from "../../../services/adminService";

const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [enclosure, setEnclosure] = useState(null);
    const [feedings, setFeedings] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [careGivers, setAllCaregiver] = useState([]);
    const [assignCaretakers, setAssignedCaregiver] = useState([]);
    const [selectedCaretakers, setSelectedCaretakers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [feedingDateTime, setFeedingTime] = useState('');
    const [foodTypeId, setFoodTypeId] = useState(1);
    const [newFeedingUsers, setNewFeedingUsers] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const modalBackdrop = "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50";
    const modalContent = "bg-white rounded-xl shadow-md p-6 w-full max-w-md";

    const formatDateTime = (isoString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(isoString).toLocaleString('pl-PL', options).replace(',', '');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animalData = await getAnimalById(id);
                setAnimal(animalData);

                if (animalData.enclosureId != null || animalData.enclosure?.id != null) {
                    const enclosureId = animalData.enclosureId || animalData.enclosure.id;
                    const enclosureData = await getEnclosureById(enclosureId);
                    setEnclosure(enclosureData);
                }

                const feedingsData = await getFeedingsByAnimalId(id);
                setFeedings(Array.isArray(feedingsData) ? feedingsData : [feedingsData]);
                const caretakersData = await getCaretakersByAnimalId(id);
                setCaretakers(caretakersData);

                const foodTypesData = await getAllFoodTypes();
                setFoodTypes(foodTypesData);
                const caregivers = await getAllCaregivers();
                const caretakersOfAnimal = await getCaretakersByAnimalId(id);

                const combinedSet = new Map();

                [...caregivers, ...caretakersOfAnimal].forEach(user => {
                    combinedSet.set(user.id, user);
                });

                const uniqueCaregivers = Array.from(combinedSet.values());

                setAssignedCaregiver(caretakersOfAnimal)
                setAllCaregiver(uniqueCaregivers);
                const allUsers= await getAllUsers();
                setAllUsers(allUsers);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [id]);


    const handleEditClick = async () => {
        try {

            const currentIds = caretakers.map((c) => c.id);
            setSelectedCaretakers(currentIds);
            setIsEditing(true);
        } catch (err) {
            console.error("Error loading users:", err);
        }
    };

    const handleCheckboxChange = (userId) => {
        setSelectedCaretakers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAssignCaretakers = async () => {
        try {
            await assignCaretakersToAnimal(id, selectedCaretakers);
            const caretakersOfAnimal = await getCaretakersByAnimalId(id);
            setAssignedCaregiver(caretakersOfAnimal)
            const updatedCaretakers = careGivers.filter(user => selectedCaretakers.includes(user.id));
            setCaretakers(updatedCaretakers);
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to assign caretakers:", err);
        }
    };

    const handleAddFeedingSubmit = async () => {
        const newFeeding = {
            feedingDateTime,
            isCompleted: false,
            foodTypeId: Number(foodTypeId),
            animalIds: [parseInt(id)],
            enclosureId: enclosure?.id,
            userIds: newFeedingUsers
        };
        try {
            await createFeeding(newFeeding);
            const updatedFeedings = await getFeedingsByAnimalId(id);
            setFeedings(Array.isArray(updatedFeedings) ? updatedFeedings : [updatedFeedings]);
            setShowAddForm(false);
            setFeedingTime('');
            setFoodTypeId(1);
            setNewFeedingUsers([]);
        } catch (err) {
            console.error("Failed to add feeding:", err);
        }
    };

    const handleDeleteFeeding = async (feedingId) => {
        try {
            await deleteFeeding(feedingId);
            setFeedings(prev => prev.filter(f => f.id !== feedingId));
        } catch (err) {
            console.error("Failed to delete feeding:", err);
        }
    };

    const [editingFeedingId, setEditingFeedingId] = useState(null);
    const [editingFeedingData, setEditingFeedingData] = useState({
        feedingDateTime: '',
        foodTypeId: 1,
        isCompleted: false,
        userIds: []
    });

    /// Function to start editing feeding
    const startEditFeeding = (feeding) => {
        setEditingFeedingId(feeding.id);
        setEditingFeedingData({
            feedingDateTime: feeding.feedingDateTime,
            foodTypeId: feeding.foodTypeId,
            isCompleted: feeding.isCompleted,
            userIds: [...feeding.userIds]
        });
    };

// Handling changes in feeding edit form
    const handleEditingChange = (field, value) => {
        setEditingFeedingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

// Handling caretakers checkbox in feeding edit
    const toggleEditingCaretaker = (userId) => {
        setEditingFeedingData(prev => ({
            ...prev,
            userIds: prev.userIds.includes(userId)
                ? prev.userIds.filter(id => id !== userId)
                : [...prev.userIds, userId]
        }));
    };

// Confirm feeding edit
    const handleUpdateFeeding = async () => {
        try {
            await updateFeeding(editingFeedingId, {
                feedingDateTime: editingFeedingData.feedingDateTime,
                foodTypeId: Number(editingFeedingData.foodTypeId),
                isCompleted: editingFeedingData.isCompleted,
                userIds: editingFeedingData.userIds,
                animalIds: [parseInt(id)],
            });

            // Refresh feedings
            const updatedFeedings = await getFeedingsByAnimalId(id);
            setFeedings(Array.isArray(updatedFeedings) ? updatedFeedings : [updatedFeedings]);

            // Close edit mode
            setEditingFeedingId(null);
            setEditingFeedingData({
                feedingDateTime: '',
                foodTypeId: 1,
                isCompleted: false,
                userIds: []
            });
        } catch (error) {
            console.error("Failed to update feeding:", error);
        }
    };

// Cancel feeding edit
    const cancelEditFeeding = () => {
        setEditingFeedingId(null);
        setEditingFeedingData({
            feedingDateTime: '',
            foodTypeId: 1,
            isCompleted: false,
            userIds: []
        });
    };

    if (!animal) return <div className="p-8 text-center">Loading animal data...</div>;

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <RegistrarNavbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Details: {animal.name}</h1>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <div><strong>Species:</strong> {animal.species}</div>
                        <div><strong>Condition:</strong> <span
                            className={
                                (animal.condition === 'Good' || animal.condition === 'GOOD')
                                    ? 'text-green-600 font-semibold'
                                    : animal.condition === 'INJURED'
                                        ? 'text-yellow-600 font-semibold'
                                        : 'text-gray-600 font-semibold'
                            }
                        > {animal.condition}</span></div>
                        <div><strong>Date of Birth:</strong> {animal.birthDate}</div>

                        <div className="flex items-center justify-between mt-4">
                            <h2 className="text-lg font-semibold">Current Caretakers:</h2>
                            <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800">
                                <FaEdit />
                            </button>
                        </div>

                        {caretakers.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {assignCaretakers.map((c) => (
                                    <li key={c.id}>{c.username}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No assigned caretakers.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div><strong>Sex:</strong> {animal.sex}</div>
                        <div><strong>Weight:</strong> {animal.weight} kg</div>
                        <div><strong>Enclosure:</strong> {enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'No data'}</div>
                    </div>
                </div>

                {isEditing && ( // Edit caretakers
                    <div className="mt-4 border-t pt-4">
                        <h2 className="text-lg font-semibold mb-2">Assign Caretaker:</h2>
                        <div className="max-h-64 overflow-y-auto border p-2 rounded">
                            {careGivers.map(user => (
                                <div key={user.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCaretakers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                        className="mr-2"
                                    />
                                    <span>{user.username}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleAssignCaretakers}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400 flex items-center gap-1"
                        >
                            <Save size={16} /> Save
                        </button>
                    </div>
                )}

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Feedings:</h2>
                    <div className="overflow-auto rounded-lg bg-white shadow-md">
                    {feedings.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                {['Time', 'Food Type', 'Feeding Status', 'Caretakers', 'Actions'].map((header) => (
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
                            {feedings.map((f) => (
                                <tr key={f.id} className="group hover:bg-gray-50 transition-colors duration-150">
                                    {editingFeedingId === f.id ? (
                                        <>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <input
                                                    type="datetime-local"
                                                    value={editingFeedingData.feedingDateTime}
                                                    onChange={e => handleEditingChange('feedingDateTime', e.target.value)}
                                                    className="border rounded px-1 py-0.5"
                                                />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <select
                                                    value={editingFeedingData.foodTypeId}
                                                    onChange={(e) => handleEditingChange('foodTypeId', e.target.value)}
                                                    className="border rounded px-1 py-0.5"
                                                >
                                                    {foodTypes.map(type => (
                                                        <option key={type.id} value={type.id} title={type.description}>
                                                            {type.id} | {type.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <select
                                                    value={editingFeedingData.isCompleted ? 'completed' : 'not_completed'}
                                                    onChange={e => handleEditingChange('isCompleted', e.target.value === 'completed')}
                                                    className="border rounded px-1 py-0.5"
                                                >
                                                    <option value="completed">Completed</option>
                                                    <option value="not_completed">Not completed</option>
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                {caretakers.map(c => (
                                                    <label key={c.id} className="mr-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={editingFeedingData.userIds.includes(c.id)}
                                                            onChange={() => toggleEditingCaretaker(c.id)}
                                                            className="mr-1"
                                                        />
                                                        {c.username}
                                                    </label>
                                                ))}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <button
                                                    onClick={handleUpdateFeeding}
                                                    className="text-green-600 px-2 py-1 rounded hover:text-green-400"
                                                >
                                                    <Save size={16} />
                                                </button>
                                                <button
                                                    onClick={cancelEditFeeding}
                                                    className="text-gray-600 px-2 py-1 rounded hover:text-gray-400"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="whitespace-nowrap px-4 py-3">{formatDateTime(f.feedingDateTime)}</td>
                                            <td className="whitespace-nowrap px-4 py-3" title={
                                                foodTypes.find(ft => ft.id === f.foodTypeId)?.description || 'No description'
                                            }>
                                                {foodTypes.find(ft => ft.id === f.foodTypeId)
                                                    ? `${f.foodTypeId} | ${foodTypes.find(ft => ft.id === f.foodTypeId).name}`
                                                    : `ID ${f.foodTypeId}`}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">{f.isCompleted ? 'Completed' : 'Not completed'}</td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                {f.userIds.map((uid) => {
                                                    const user = allUsers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <button
                                                    onClick={() => startEditFeeding(f)}
                                                    className="text-blue-600 px-2 py-1 rounded hover:text-blue-400"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFeeding(f.id)}
                                                    className="text-red-600 px-2 py-1 rounded hover:text-red-400"
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
                    ) : (
                        <p>No feeding data available.</p>
                    )}
                </div>
                </div>
                {/* FAB Button */}
                <button
                    onClick={() => setShowAddForm(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-md hover:bg-blue-700 z-50"
                >
                    <Plus size={24} />
                </button>

                {/* Modal Dialog for Adding Feeding */}
                {showAddForm && (
                    <div className={modalBackdrop}>
                        <div className={modalContent}>
                            <h3 className="text-lg font-semibold mb-4">New Feeding</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Feeding Date and Time:</label>
                                <input
                                    type="datetime-local"
                                    value={feedingDateTime}
                                    onChange={(e) => setFeedingTime(e.target.value)}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Food Type:</label>
                                <select
                                    value={foodTypeId}
                                    onChange={(e) => setFoodTypeId(e.target.value)}
                                    className="mt-1 w-full border rounded px-2 py-1"
                                >
                                    {foodTypes.map(type => (
                                        <option key={type.id} value={type.id} title={type.description}>
                                            {type.id} | {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Assign Caretakers:</label>
                                <div className="max-h-40 overflow-y-auto border p-2 rounded">
                                    {careGivers.map(c => (
                                        <div key={c.id} className="flex items-center mb-1">
                                            <input
                                                type="checkbox"
                                                checked={newFeedingUsers.includes(c.id)}
                                                onChange={() => {
                                                    setNewFeedingUsers(prev =>
                                                        prev.includes(c.id)
                                                            ? prev.filter(id => id !== c.id)
                                                            : [...prev, c.id]
                                                    );
                                                }}
                                                className="mr-2"
                                            />
                                            <span>{c.username}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-1"
                                >
                                    <X size={16} /> Cancel
                                </button>
                                <button
                                    onClick={handleAddFeedingSubmit}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
                                >
                                    <Save size={16} /> Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AnimalDetails;
