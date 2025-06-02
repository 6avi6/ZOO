import React, { useEffect, useState } from 'react';
import { Pencil,Save,X } from 'lucide-react';
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
                        <div><strong>Stan:</strong>
                            <span
                            className={
                                (animal.condition === 'Good' || animal.condition === 'GOOD')
                                    ? 'text-green-600 font-semibold'
                                    : animal.condition === 'INJURED'
                                        ? 'text-yellow-600 font-semibold'
                                        : 'text-red-600 font-semibold'
                            }
                        > {animal.condition}</span></div>
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
                    <div className="overflow-auto rounded-lg bg-white shadow-md">
                    {feedings.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Czas karmienia</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Typ jedzenia</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Wybieg</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Opiekunowie</th>
                                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Akcje</th>
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
                                            <td className="whitespace-nowrap px-4 py-3">{enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'Brak danych'}</td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <select
                                                    value={editingFeedingData.isCompleted ? 'completed' : 'not_completed'}
                                                    onChange={e => handleEditingChange('isCompleted', e.target.value === 'completed')}
                                                    className="border rounded px-1 py-0.5"
                                                >
                                                    <option value="completed">Nakarmione</option>
                                                    <option value="not_completed">Nie nakarmione</option>
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                {f.userIds.map((uid) => {
                                                    const user = caretakers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                                <button
                                                    onClick={handleUpdateFeeding}
                                                    className="text-green-600 px-2 py-1 hover:text-green-400"
                                                >
                                                    <Save size={20}/>
                                                </button>
                                                <button
                                                    onClick={cancelEditFeeding}
                                                    className="text-gray-600 px-2 py-1 hover:text-gray-400"
                                                >
                                                    <X size={16}/>
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="whitespace-nowrap px-4 py-3">{formatDateTime(f.feedingDateTime)}</td>
                                            <td className="whitespace-nowrap px-4 py-3" title={foodTypes.find(ft => ft.id === f.foodTypeId)?.description || ''}>
                                                {foodTypes.find(ft => ft.id === f.foodTypeId) ? `${f.foodTypeId} | ${foodTypes.find(ft => ft.id === f.foodTypeId).name}` : `ID ${f.foodTypeId}`}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">{enclosure ? `${enclosure.id} | ${enclosure.terrainType}` : 'Brak danych'}</td>
                                            <td className="whitespace-nowrap px-4 py-3">{f.isCompleted ? 'Nakarmione' : 'Nie nakarmione'}</td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                {f.userIds.map((uid) => {
                                                    const user = caretakers.find((c) => c.id === uid);
                                                    return user ? user.username : `ID ${uid}`;
                                                }).join(', ')}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                                <button
                                                    onClick={() => startEditFeeding(f)}
                                                    className="text-blue-600 px-2 py-1 hover:text-blue-400"
                                                >
                                                    <Pencil size={16} />
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
        </div>
    );
};

export default AnimalDetails;
