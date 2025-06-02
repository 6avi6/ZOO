import React, { useEffect, useState } from 'react';
import { Pencil, ArrowRight, Save, X } from 'lucide-react';
import CaregiverNavbar from '../../components/CaregiverNavbar';
import { getMyAnimals } from '../../services/caretakerService';
import { updateAnimal } from '../../services/animalService';
import { getAllEnclosures, getEnclosureById } from '../../services/enclosureService';
import { createAnimalTreatmentCard } from '../../services/animalTreatmentCardService';
import { getAllVeterinarians } from '../../services/veterinarianService';
import { getAllSymptoms } from '../../services/symptomService';
import { useNavigate } from 'react-router-dom';

const conditionOptions = ['GOOD', 'INJURED', 'DEAD'];

const MyAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [animalEnclosures, setAnimalEnclosures] = useState({});
    const [enclosures, setEnclosures] = useState([]);
    const [editingAnimalId, setEditingAnimalId] = useState(null);
    const [editedAnimal, setEditedAnimal] = useState({});
    const [showVetDialog, setShowVetDialog] = useState(false);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptomIds, setSelectedSymptomIds] = useState([]);
    const [treatmentDescription, setTreatmentDescription] = useState('Opis leczenia');
    const [treatmentDateTime, setTreatmentDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [veterinarians, setVeterinarians] = useState([]);
    const [assignedUserId, setVeterinarianId] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getMyAnimals();
            setAnimals(data);
            const encls = await getAllEnclosures();
            setEnclosures(encls);
        })();
    }, []);

    useEffect(() => {
        if (!animals.length) return;
        (async () => {
            const map = {};
            await Promise.all(
                animals.map(async (animal) => {
                    if (animal.enclosureId) {
                        const enclosure = await getEnclosureById(animal.enclosureId);
                        map[animal.id] = enclosure;
                    }
                })
            );
            setAnimalEnclosures(map);
        })();
    }, [animals]);

    const handleEditClick = (animal) => {
        if (!animal) {
            setEditingAnimalId(null);
            setEditedAnimal({});
            return;
        }
        setEditingAnimalId(animal.id);
        setEditedAnimal({ ...animal });
    };

    const handleEditChange = async (e) => {
        const { name, value } = e.target;
        setEditedAnimal((prev) => ({ ...prev, [name]: value }));

        if (name === 'condition' && value === 'INJURED' && editedAnimal.condition !== 'INJURED') {
            const sym = await getAllSymptoms();
            setSymptoms(sym);
            const vets = await getAllVeterinarians();
            setVeterinarians(vets);
            setShowVetDialog(true);
        }
    };

    const handleSaveClick = async () => {
        await updateAnimal(editedAnimal.id, {
            ...editedAnimal,
            weight: parseFloat(editedAnimal.weight),
            enclosure: { id: parseInt(editedAnimal.enclosureId, 10) },
        });

        const originalAnimal = animals.find((a) => a.id === editedAnimal.id);

        if (editedAnimal.condition === 'INJURED' && originalAnimal.condition !== 'INJURED') {
            await createAnimalTreatmentCard({
                description: treatmentDescription,
                dateTime: new Date(treatmentDateTime).toISOString(),
                animalId: editedAnimal.id,
                assignedUserId,
                symptomIds: selectedSymptomIds.map(Number),
            });
        }

        const updated = await getMyAnimals();
        setAnimals(updated);
        setEditingAnimalId(null);
        setEditedAnimal({});
        setShowVetDialog(false);
        setSelectedSymptomIds([]);
        setTreatmentDescription('Opis leczenia');
        setTreatmentDateTime(new Date().toISOString().slice(0, 16));
    };

    const handleDetailClick = (id) => {
        navigate(`/caregiver/animal/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <CaregiverNavbar />
            <h1 className="text-2xl font-bold mb-6">Moje zwierzęta</h1>

            <div className="overflow-auto rounded-lg bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {['ID', 'Nazwa', 'Gatunek', 'Stan', 'Waga', 'Wybieg', 'Akcje'].map((header) => (
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
                    {animals.map((animal) => (
                        <tr
                            key={animal.id}
                            className="group hover:bg-gray-50 transition-colors duration-150"
                        >
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">{animal.id}</td>
                            <td className="whitespace-nowrap px-4 py-3">{animal.name}</td>
                            <td className="whitespace-nowrap px-4 py-3">{animal.species}</td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editingAnimalId === animal.id ? (
                                    <select
                                        name="condition"
                                        value={editedAnimal.condition}
                                        onChange={handleEditChange}
                                        className="w-full rounded border border-gray-300 px-2 py-1 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        {conditionOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span
                                        className={
                                            (animal.condition === 'Good' || animal.condition === 'GOOD')
                                                ? 'text-green-600 font-semibold'
                                                : animal.condition === 'INJURED'
                                                    ? 'text-yellow-600 font-semibold'
                                                    : 'text-red-600 font-semibold'
                                        }
                                    >
                      {animal.condition}
                    </span>
                                )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">{animal.weight.toFixed(2)} kg</td>
                            <td className="whitespace-nowrap px-4 py-3">
                                {editingAnimalId === animal.id ? (
                                    <select
                                        name="enclosureId"
                                        value={editedAnimal.enclosureId}
                                        onChange={handleEditChange}
                                        className="w-full rounded border border-gray-300 px-2 py-1 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        {enclosures.map((e) => (
                                            <option key={e.id} value={e.id}>
                                                {`${e.id} | ${e.terrainType}`}
                                            </option>
                                        ))}
                                    </select>
                                ) : animalEnclosures[animal.id] ? (
                                    `${animalEnclosures[animal.id].id} | ${animalEnclosures[animal.id].terrainType}`
                                ) : (
                                    <span className="text-gray-400 italic">Brak danych</span>
                                )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                {editingAnimalId === animal.id ? (
                                    <>
                                        <button
                                            onClick={handleSaveClick}
                                            className="px-2 py-1d text-green-600  hover:text-green-400"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(null)}
                                            className="px-2 py-1  text-gray-600 hover:text-gray-400"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(animal)}
                                            className="px-2 py-1 text-blue-600 hover:text-blue-400"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDetailClick(animal.id)}
                                            className="px-2 py-1  text-gray-600 hover:text-gray-400"
                                            aria-label="Szczegóły"
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showVetDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">Uzupełnij kartę leczenia</h2>

                        <label className="mb-1 block font-medium text-gray-700">Opis</label>
                        <textarea
                            value={treatmentDescription}
                            onChange={(e) => setTreatmentDescription(e.target.value)}
                            rows={4}
                            className="mb-5 w-full rounded border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Opis leczenia zwierzęcia"
                        />

                        <label className="mb-1 block font-medium text-gray-700">Data i godzina</label>
                        <input
                            type="datetime-local"
                            value={treatmentDateTime}
                            onChange={(e) => setTreatmentDateTime(e.target.value)}
                            className="mb-5 w-full rounded border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />

                        <label className="mb-1 block font-medium text-gray-700">Symptomy</label>
                        <div className="mb-5 max-h-40 overflow-y-auto rounded border border-gray-300 p-3">
                            {symptoms.map((s) => (
                                <div key={s.id} className="mb-2 flex items-center">
                                    <input
                                        id={`symptom-${s.id}`}
                                        type="checkbox"
                                        checked={selectedSymptomIds.includes(s.id)}
                                        onChange={() =>
                                            setSelectedSymptomIds((prev) =>
                                                prev.includes(s.id) ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                                            )
                                        }
                                        className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={`symptom-${s.id}`} className="text-gray-700">
                                        {s.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <label className="mb-1 block font-medium text-gray-700">Weterynarz</label>
                        <select
                            value={assignedUserId}
                            onChange={(e) => setVeterinarianId(Number(e.target.value))}
                            className="mb-6 w-full rounded border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            {veterinarians.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {`${v.firstName} ${v.lastName}`}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowVetDialog(false)}
                                className="rounded border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={handleSaveClick}
                                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                Zapisz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAnimals;