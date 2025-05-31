import React, { useEffect, useState } from 'react';
import CaregiverNavbar from '../../components/CaregiverNavbar';
import { getMyFeedings } from '../../services/caretakerService';
import { updateFeeding } from '../../services/feedingsService';
import { getAllEnclosures, getEnclosureById } from '../../services/enclosureService';
import { getAnimalById } from '../../services/animalService';
import { getAllFoodTypes } from '../../services/foodTypeService';
import { Pencil, Save, X } from 'lucide-react';

const CaregiverFeedings = () => {
    const [feedings, setFeedings] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ feedingDateTime: '', foodTypeId: 1, isCompleted: false });
    const [animalMap, setAnimalMap] = useState({});
    const [enclosureMap, setEnclosureMap] = useState({});
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
        const fetchFeedings = async () => {
            try {
                const data = await getMyFeedings();
                setFeedings(data);

                const animalIds = [...new Set(data.flatMap(f => f.animalIds))];
                const enclosureIds = [...new Set(data.map(f => f.enclosureId))];

                const animals = await Promise.all(animalIds.map(id => getAnimalById(id)));
                const enclosures = await Promise.all(enclosureIds.map(id => getEnclosureById(id)));
                const foodTypesData = await getAllFoodTypes();
                setFoodTypes(foodTypesData);

                const animalMapData = {};
                animals.forEach(animal => { animalMapData[animal.id] = animal; });
                setAnimalMap(animalMapData);

                const enclosureMapData = {};
                enclosures.forEach(enc => { enclosureMapData[enc.id] = enc; });
                setEnclosureMap(enclosureMapData);

            } catch (error) {
                console.error('Błąd podczas pobierania karmień:', error);
            }
        };
        fetchFeedings();
    }, []);

    const handleEditClick = (feeding) => {
        setEditingId(feeding.id);
        setEditData({
            feedingDateTime: feeding.feedingDateTime,
            foodTypeId: feeding.foodTypeId,
            isCompleted: feeding.isCompleted,
            enclosureId: feeding.enclosureId,
            animalIds: feeding.animalIds,
            userIds: feeding.userIds
        });
    };

    const handleSave = async (id) => {
        try {
            await updateFeeding(id, {
                feedingDateTime: editData.feedingDateTime,
                foodTypeId: Number(editData.foodTypeId),
                isCompleted: editData.isCompleted,
                enclosureId: editData.enclosureId,
                animalIds: editData.animalIds,
                userIds: editData.userIds
            });
            const updated = await getMyFeedings();
            setFeedings(updated);
            setEditingId(null);
        } catch (error) {
            console.error('Błąd podczas zapisu zmian:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <CaregiverNavbar />
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-xl">
                <h1 className="text-2xl font-bold mb-6">Twoje karmienia</h1>
                {feedings.length > 0 ? (
                    <table className="w-full table-auto border border-gray-300 text-sm">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Godzina karmienia</th>
                            <th className="border p-2">Typ jedzenia</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Wybieg</th>
                            <th className="border p-2">Zwierzęta</th>
                            <th className="border p-2">Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedings.map(f => (
                            <tr key={f.id}>
                                <td className="border p-2">
                                    {editingId === f.id ? (
                                        <input
                                            type="datetime-local"
                                            value={editData.feedingDateTime}
                                            onChange={e => setEditData({ ...editData, feedingDateTime: e.target.value })}
                                            className="border rounded p-1"
                                        />
                                    ) : formatDateTime(f.feedingDateTime)}
                                </td>
                                <td className="border p-2">
                                    {editingId === f.id ? (
                                        <select
                                            value={editData.foodTypeId}
                                            onChange={e => setEditData({ ...editData, foodTypeId: e.target.value })}
                                            className="border rounded p-1 w-full"
                                        >
                                            {foodTypes.map(type => (
                                                <option key={type.id} value={type.id} title={type.description}>
                                                    {type.id} | {type.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span title={foodTypes.find(ft => ft.id === f.foodTypeId)?.description || ''}>
                                           {foodTypes.find(ft => ft.id === f.foodTypeId) ? `${f.foodTypeId} | ${foodTypes.find(ft => ft.id === f.foodTypeId).name}` : `ID ${f.foodTypeId}`}
                                        </span>
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingId === f.id ? (
                                        <select
                                            value={editData.isCompleted ? 'completed' : 'not_completed'}
                                            onChange={e => setEditData({ ...editData, isCompleted: e.target.value === 'completed' })}
                                            className="border rounded p-1"
                                        >
                                            <option value="completed">Nakarmione</option>
                                            <option value="not_completed">Nie nakarmione</option>
                                        </select>
                                    ) : (
                                        <span>
                                            {f.isCompleted ? 'Nakarmione' : 'Nie nakarmione'}
                                        </span>
                                    )}
                                </td>
                                <td className="border p-2">
                                    {enclosureMap[f.enclosureId] ? `${f.enclosureId} | ${enclosureMap[f.enclosureId].terrainType}` : 'N/A'}
                                </td>
                                <td className="border p-2">
                                    {f.animalIds.map(id => animalMap[id] ? `${id} | ${animalMap[id].name}` : `ID ${id}`).join(', ')}
                                </td>
                                <td className="border p-2">
                                    {editingId === f.id ? (
                                        <>
                                            <button onClick={() => handleSave(f.id)} className="text-green-600 font-semibold mr-2 flex items-center gap-1">
                                                <Save size={16} /> Zapisz
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-600 flex items-center gap-1">
                                                <X size={16} /> Anuluj
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditClick(f)} className="text-blue-600 font-semibold flex items-center gap-1">
                                            <Pencil size={16} /> Edytuj
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Brak dostępnych karmień.</p>
                )}
            </div>
        </div>
    );
};

export default CaregiverFeedings;
