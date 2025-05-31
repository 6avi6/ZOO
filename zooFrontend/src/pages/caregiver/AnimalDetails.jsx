import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useParams } from 'react-router-dom';
import CaregiverNavbar from '../../components/CaregiverNavbar';
import { getAnimalById } from '../../services/animalService';
import { getEnclosureById } from '../../services/enclosureService';
import { getFeedingsByAnimalId, updateFeeding } from '../../services/feedingsService';
import { getCaretakersByAnimalId } from '../../services/caretakerService';
import { getAllFoodTypes } from '../../services/foodTypeService';

const AnimalDetails = () => {
    const { id } = useParams();
    const [animal, setAnimal] = useState(null);
    const [enclosure, setEnclosure] = useState(null);
    const [feedings, setFeedings] = useState([]);
    const [caretakers, setCaretakers] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);

    const [editingFeedingId, setEditingFeedingId] = useState(null);
    const [editingFeedingData, setEditingFeedingData] = useState({
        feedingDateTime: '',
        foodTypeId: 1,
        isCompleted: false,
        userIds: []
    });

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
            const animalData = await getAnimalById(id);
            setAnimal(animalData);

            if (animalData.enclosureId || animalData.enclosure?.id) {
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
        };

        fetchData();
    }, [id]);

    const startEditFeeding = (feeding) => {
        setEditingFeedingId(feeding.id);
        setEditingFeedingData({
            feedingDateTime: feeding.feedingDateTime,
            foodTypeId: feeding.foodTypeId,
            isCompleted: feeding.isCompleted,
            userIds: feeding.userIds || []
        });
    };

    const handleEditingChange = (field, value) => {
        setEditingFeedingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdateFeeding = async () => {
        await updateFeeding(editingFeedingId, {
            feedingDateTime: editingFeedingData.feedingDateTime,
            foodTypeId: Number(editingFeedingData.foodTypeId),
            isCompleted: editingFeedingData.isCompleted,
            animalIds: [parseInt(id)],
            userIds: editingFeedingData.userIds
        });

        const updatedFeedings = await getFeedingsByAnimalId(id);
        setFeedings(Array.isArray(updatedFeedings) ? updatedFeedings : [updatedFeedings]);

        setEditingFeedingId(null);
        setEditingFeedingData({
            feedingDateTime: '',
            foodTypeId: 1,
            isCompleted: false,
            userIds: []
        });
    };

    const cancelEditFeeding = () => {
        setEditingFeedingId(null);
        setEditingFeedingData({
            feedingDateTime: '',
            foodTypeId: 1,
            isCompleted: false,
            userIds: []
        });
    };

    if (!animal) return <div className="p-8 text-center">Ładowanie danych zwierzęcia...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <CaregiverNavbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Szczegóły: {animal.name}</h1>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <div><strong>Gatunek:</strong> {animal.species}</div>
                        <div><strong>Stan:</strong> {animal.condition}</div>
                        <div><strong>Data urodzenia:</strong> {animal.birthDate}</div>

                        <h2 className="text-lg font-semibold mt-4">Opiekunowie:</h2>
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
                        <div><strong>Wybieg:</strong> {enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'Brak danych'}</div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Karmienia:</h2>

                    {feedings.length > 0 ? (
                        <table className="w-full mt-2 table-auto border border-gray-300 text-sm">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Czas karmienia</th>
                                <th className="border p-2">Typ jedzenia</th>
                                <th className="border p-2">Wybieg</th>
                                <th className="border p-2">Status</th>
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
                                                    onChange={e => handleEditingChange('foodTypeId', e.target.value)}
                                                    className="border rounded px-1 py-0.5 w-full"
                                                >
                                                    {foodTypes.map(type => (
                                                        <option key={type.id} value={type.id} title={type.description}>
                                                            {type.id} | {type.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="border p-2">{enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'Brak danych'}</td>
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
                                            <td className="border p-2">
                                                {f.userIds.map((uid) => {
                                                    const user = caretakers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="border p-2 space-x-2">
                                                <button
                                                    onClick={handleUpdateFeeding}
                                                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                                                >
                                                    Zapisz
                                                </button>
                                                <button
                                                    onClick={cancelEditFeeding}
                                                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                                                >
                                                    Anuluj
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border p-2">{formatDateTime(f.feedingDateTime)}</td>
                                            <td className="border p-2" title={foodTypes.find(ft => ft.id === f.foodTypeId)?.description || ''}>
                                                {foodTypes.find(ft => ft.id === f.foodTypeId) ? `${f.foodTypeId} | ${foodTypes.find(ft => ft.id === f.foodTypeId).name}` : `ID ${f.foodTypeId}`}
                                            </td>
                                            <td className="border p-2">{enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'Brak danych'}</td>
                                            <td className="border p-2">{f.isCompleted ? 'Nakarmione' : 'Nie nakarmione'}</td>
                                            <td className="border p-2">
                                                {f.userIds.map((uid) => {
                                                    const user = caretakers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="border p-2">
                                                <button
                                                    onClick={() => startEditFeeding(f)}
                                                    className="text-blue-600 font-semibold flex items-center gap-1"
                                                >
                                                    <Pencil size={20} /> Edytuj
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Brak danych o karmieniach.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimalDetails;
