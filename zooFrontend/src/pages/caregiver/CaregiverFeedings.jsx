import React, { useEffect, useState } from 'react';
import CaregiverNavbar from '../../components/CaregiverNavbar';
import { getMyFeedings } from '../../services/caretakerService';
import { updateFeeding } from '../../services/feedingsService';
import { getAllEnclosures, getEnclosureById } from '../../services/enclosureService';
import { getAnimalById } from '../../services/animalService';
import { Pencil, Save, X } from 'lucide-react';

const CaregiverFeedings = () => {
    const [feedings, setFeedings] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ feedingTime: '', foodTypeId: 1, isCompleted: false });
    const [animalMap, setAnimalMap] = useState({});
    const [enclosureMap, setEnclosureMap] = useState({});

    useEffect(() => {
        const fetchFeedings = async () => {
            try {
                const data = await getMyFeedings();
                setFeedings(data);

                const animalIds = [...new Set(data.flatMap(f => f.animalIds))];
                const enclosureIds = [...new Set(data.map(f => f.enclosureId))];

                const animals = await Promise.all(animalIds.map(id => getAnimalById(id)));
                const enclosures = await Promise.all(enclosureIds.map(id => getEnclosureById(id)));

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
            feedingTime: feeding.feedingTime,
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
                feedingTime: editData.feedingTime,
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
                                            type="time"
                                            value={editData.feedingTime}
                                            onChange={e => setEditData({ ...editData, feedingTime: e.target.value })}
                                            className="border rounded p-1"
                                        />
                                    ) : f.feedingTime}
                                </td>
                                <td className="border p-2">
                                    {editingId === f.id ? (
                                        <input
                                            type="number"
                                            min={1}
                                            max={5}
                                            value={editData.foodTypeId}
                                            onChange={e => setEditData({ ...editData, foodTypeId: e.target.value })}
                                            className="border rounded p-1 w-20"
                                        />
                                    ) : f.foodTypeId}
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
                                    ) : f.isCompleted ? 'Nakarmione' : 'Nie nakarmione'}
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
