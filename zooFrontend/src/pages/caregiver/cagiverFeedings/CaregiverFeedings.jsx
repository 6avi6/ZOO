import React, { useEffect, useState } from 'react';
import CaregiverNavbar from '../../../components/CaregiverNavbar';
import { getMyFeedings } from '../../../services/caretakerService';
import { updateFeeding } from '../../../services/feedingsService';
import { getAllEnclosures, getEnclosureById } from '../../../services/enclosureService';
import { getAnimalById } from '../../../services/animalService';
import { getAllFoodTypes } from '../../../services/foodTypeService';
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
        return new Date(isoString).toLocaleString('en-GB', options).replace(',', '');
    };

    useEffect(() => {
        const fetchFeedings = async () => {
            try {
                const data = await getMyFeedings();
                setFeedings(data);

                const animalIds = [...new Set(data.flatMap(f => f.animalIds))];
                const enclosureIds = [...new Set(data.map(f => f.enclosureId).filter(id => id !== null))];

                const animals = await Promise.all(animalIds.map(id => getAnimalById(id)));
                const enclosures = await Promise.all(enclosureIds.map(id => getEnclosureById(id)));
                const foodTypesData = await getAllFoodTypes();
                setFoodTypes(foodTypesData);

                const animalMapData = {};
                animals.forEach(animal => { animalMapData[animal.id] = animal; });
                setAnimalMap(animalMapData);

                const enclosureMapData = {};
                enclosures.forEach(enc => {
                    if (enc && enc.id !== null) {
                        enclosureMapData[enc.id] = enc;
                    }
                });
                setEnclosureMap(enclosureMapData);

            } catch (error) {
                console.error('Error fetching feedings:', error);
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
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <CaregiverNavbar />
            <h1 className="text-2xl font-bold mb-6">My Feedings</h1>
            <div className="overflow-auto rounded-lg bg-white shadow-md">

                {feedings.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Feeding Time</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Food Type</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Enclosure</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Animals</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {feedings.map(f => (
                            <tr key={f.id} className="group hover:bg-gray-50 transition-colors duration-150">
                                <td className="whitespace-nowrap px-4 py-3">
                                    {editingId === f.id ? (
                                        <input
                                            type="datetime-local"
                                            value={editData.feedingDateTime}
                                            onChange={e => setEditData({ ...editData, feedingDateTime: e.target.value })}
                                            className="border rounded p-1"
                                        />
                                    ) : formatDateTime(f.feedingDateTime)}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
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
                                <td className="whitespace-nowrap px-4 py-3">
                                    {editingId === f.id ? (
                                        <select
                                            value={editData.isCompleted ? 'completed' : 'not_completed'}
                                            onChange={e => setEditData({ ...editData, isCompleted: e.target.value === 'completed' })}
                                            className="border rounded p-1"
                                        >
                                            <option value="completed">Fed</option>
                                            <option value="not_completed">Not Fed</option>
                                        </select>
                                    ) : (
                                        <span>
                                            {f.isCompleted ? 'Fed' : 'Not Fed'}
                                        </span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    {enclosureMap[f.enclosureId] ? `${f.enclosureId} | ${enclosureMap[f.enclosureId].terrainType}` : 'N/A'}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    {f.animalIds.map(id => animalMap[id] ? `${id} | ${animalMap[id].name}` : `ID ${id}`).join(', ')}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    {editingId === f.id ? (
                                        <>
                                            <button onClick={() => handleSave(f.id)} className="px-2 py-1 text-green-600 hover:text-green-400">
                                                <Save size={16} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="px-2 py-1 text-gray-600 hover:text-gray-400">
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditClick(f)} className="px-2 py-1 text-blue-600 hover:text-blue-400">
                                            <Pencil size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No feedings available.</p>
                )}
            </div>
        </div>
    );
};

export default CaregiverFeedings;
