import React, { useEffect, useState } from 'react';
import { Trash2, Pencil,Plus} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import RegistrarNavbar from '../../components/RegistrarNavbar';
import { getAnimalById } from '../../services/animalService';
import { getEnclosureById } from '../../services/enclosureService';
import { getFeedingsByAnimalId, createFeeding, updateFeeding, deleteFeeding } from '../../services/feedingsService';
import { getCaretakersByAnimalId, assignCaretakersToAnimal } from '../../services/caretakerService';
import { getAllUsersPaged } from '../../services/userService';
import { getAllFoodTypes } from '../../services/foodTypeService';

const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [enclosure, setEnclosure] = useState(null);
    const [feedings, setFeedings] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedCaretakers, setSelectedCaretakers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [feedingDateTime, setFeedingTime] = useState('');
    const [foodTypeId, setFoodTypeId] = useState(1);
    const [newFeedingUsers, setNewFeedingUsers] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);

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
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [id]);

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
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [id]);


    const handleEditClick = async () => {
        try {
            const users = await getAllUsersPaged();
            setAllUsers(users);
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
            const updatedCaretakers = allUsers.filter(user => selectedCaretakers.includes(user.id));
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
        console.log("Submitting feeding:", newFeeding);
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

    // Funkcja do rozpoczęcia edycji karmienia
    const startEditFeeding = (feeding) => {
        setEditingFeedingId(feeding.id);
        setEditingFeedingData({
            feedingDateTime: feeding.feedingDateTime,
            foodTypeId: feeding.foodTypeId,
            isCompleted: feeding.isCompleted,
            userIds: [...feeding.userIds]
        });
    };

    // Obsługa zmian formularza edycji karmienia
    const handleEditingChange = (field, value) => {
        setEditingFeedingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Obsługa checkboxów caretakers w edycji karmienia
    const toggleEditingCaretaker = (userId) => {
        setEditingFeedingData(prev => ({
            ...prev,
            userIds: prev.userIds.includes(userId)
                ? prev.userIds.filter(id => id !== userId)
                : [...prev.userIds, userId]
        }));
    };

    // Zatwierdzenie edycji karmienia
    const handleUpdateFeeding = async () => {
        try {
            await updateFeeding(editingFeedingId, {
                feedingDateTime: editingFeedingData.feedingDateTime,
                foodTypeId: Number(editingFeedingData.foodTypeId),
                isCompleted: editingFeedingData.isCompleted,
                userIds: editingFeedingData.userIds,
                animalIds: [parseInt(id)],
            });

            // Odśwież karmienia
            const updatedFeedings = await getFeedingsByAnimalId(id);
            setFeedings(Array.isArray(updatedFeedings) ? updatedFeedings : [updatedFeedings]);

            // Zamknij edycję
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

    // Anulowanie edycji
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
        <div className="min-h-screen bg-gray-100">
            <RegistrarNavbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Szczegóły : {animal.name}</h1>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <div><strong>Gatunek:</strong> {animal.species}</div>
                        <div><strong>Stan:</strong> {animal.condition}</div>
                        <div><strong>Data urodzenia:</strong> {animal.birthDate}</div>

                        <div className="flex items-center justify-between mt-4">
                            <h2 className="text-lg font-semibold">Aktualni opiekunowie:</h2>
                            <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800">
                                <FaEdit />
                            </button>
                        </div>

                        {caretakers.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {caretakers.map((c) => (
                                    <li key={c.id}>{c.username}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Brak przypisanych opiekunów.</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div><strong>Płeć:</strong> {animal.sex}</div>
                        <div><strong>Waga:</strong> {animal.weight} kg</div>
                        <div><strong>Wybieg:</strong> {enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'No data'}</div>
                    </div>
                </div>

                {isEditing && ( //Edycja opiekunów
                    <div className="mt-4 border-t pt-4">
                        <h2 className="text-lg font-semibold mb-2">Przypisz opiekuna:</h2>
                        <div className="max-h-64 overflow-y-auto border p-2 rounded">
                            {allUsers.map(user => (
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
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                )}

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">Karmienia:</h2>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            <Plus size={20}/>
                        </button>
                    </div>


                    {showAddForm && (  //Pop up do dodawania nowych pór karmień
                        <div className="border p-4 rounded mb-4 bg-gray-50">
                            <h3 className="text-lg font-semibold mb-2">Nowe karmienie</h3>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">Data i godzina karmienia:</label>
                                <input
                                    type="datetime-local"
                                    value={feedingDateTime}
                                    onChange={(e) => setFeedingTime(e.target.value)}
                                    className="mt-1 block w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">Typ jedzenia:</label>
                                <select
                                    value={foodTypeId}
                                    onChange={(e) => setFoodTypeId(e.target.value)}
                                    className="mt-1 block w-full border rounded px-2 py-1"
                                >
                                    {foodTypes.map(type => (
                                        <option key={type.id} value={type.id} title={type.description}>
                                            {type.id} | {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium">Przypisz opiekunów:</label>
                                {caretakers.map(c => (
                                    <div key={c.id} className="flex items-center">
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
                            <button
                                onClick={handleAddFeedingSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                            >
                                Dodaj karmienie
                            </button>
                        </div>
                    )}

                    {feedings.length > 0 ? (
                        <table className="w-full mt-2 table-auto border border-gray-300 text-sm">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Czas</th>
                                <th className="border p-2">Typ jedzenia</th>
                                <th className="border p-2">Status karmienia</th>
                                <th className="border p-2">Opiekunowie</th>
                                <th className="border p-2">Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {feedings.map((f) => (
                                <tr key={f.id}>
                                    {editingFeedingId === f.id ? (
                                        <>
                                            <td className="border p-2">
                                                <input
                                                    type="datetime-local"
                                                    value={editingFeedingData.feedingDateTime}
                                                    onChange={e => handleEditingChange('feedingDateTime', e.target.value)}
                                                    className="border rounded px-1 py-0.5"
                                                />
                                            </td>
                                            <td className="border p-2">
                                                <select
                                                    value={editingFeedingData.foodTypeId}
                                                    onChange={(e) => handleEditingChange('foodTypeId', e.target.value)}
                                                    className="border rounded px-1 py-0.5 w-full"
                                                    >
                                                    {foodTypes.map(type => (
                                                        <option key={type.id} value={type.id} title={type.description}>
                                                            {type.id} | {type.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </td>
                                            <td className="border p-2">
                                                <select
                                                    value={editingFeedingData.isCompleted ? 'completed' : 'not_completed'}
                                                    onChange={e => handleEditingChange('isCompleted', e.target.value === 'completed')}
                                                    className="border rounded px-1 py-0.5"
                                                >
                                                    <option value="completed">Nakarmione</option>
                                                    <option value="not_completed">Nie nakarmione</option>
                                                </select>
                                            </td>
                                            <td className="border p-2 max-w-xs">
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
                                            <td className="border p-2 space-x-2">
                                                <button
                                                    onClick={handleUpdateFeeding}
                                                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEditFeeding}
                                                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-2">{formatDateTime(f.feedingDateTime)}</td>
                                            <td className="border p-2" title={
                                                foodTypes.find(ft => ft.id === f.foodTypeId)?.description || 'Brak opisu'
                                            }>
                                                {foodTypes.find(ft => ft.id === f.foodTypeId) ? `${f.foodTypeId} | ${foodTypes.find(ft => ft.id === f.foodTypeId).name}` : `ID ${f.foodTypeId}`}
                                            </td>
                                            <td className="border p-2">{f.isCompleted ? 'Nakarmione' : 'Nie nakarmione'}</td>
                                            <td className="border p-2">
                                                {f.userIds.map((uid) => {
                                                    const user = caretakers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="border p-2 space-x-2">
                                                <button
                                                    onClick={() => startEditFeeding(f)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    <Pencil size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFeeding(f.id)}
                                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No feeding data.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimalDetails;
