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
    const [veterinarianId, setVeterinarianId] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getMyAnimals();
            setAnimals(data);
        };
        fetchAnimals();

        const fetchEnclosures = async () => {
            const data = await getAllEnclosures();
            setEnclosures(data);
        };
        fetchEnclosures();
    }, []);

    useEffect(() => {
        const fetchAnimalEnclosures = async () => {
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
        };
        if (animals.length) fetchAnimalEnclosures();
    }, [animals]);

    const handleEditClick = (animal) => {
        if( animal ==null){
            setEditingAnimalId(null);
            setEditedAnimal({});
            return;}
        setEditingAnimalId(animal.id);
        setEditedAnimal({ ...animal });
    };

    const handleEditChange = async (e) => {
        const { name, value } = e.target;
        setEditedAnimal(prev => ({ ...prev, [name]: value }));

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
            enclosure: { id: parseInt(editedAnimal.enclosureId) }
        });

        const originalAnimal = animals.find(a => a.id === editedAnimal.id);

        if (editedAnimal.condition === 'INJURED' && originalAnimal.condition !== 'INJURED') {
            await createAnimalTreatmentCard({
                description: treatmentDescription,
                dateTime: new Date(treatmentDateTime).toISOString(),
                animalId: editedAnimal.id,
                veterinarianId: veterinarianId,
                symptomIds: selectedSymptomIds.map(Number)
            });
        }

        const updated = await getMyAnimals();
        setAnimals(updated);
        setEditingAnimalId(null);
        setEditedAnimal({});
    };

    const handleDetailClick = (id) => {
        navigate(`/caregiver/animal/${id}`);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <CaregiverNavbar />
            <h1 className="text-xl font-bold mb-4">Moje zwierzęta</h1>
            <div className="bg-white p-4 rounded shadow overflow-auto">
                <table className="min-w-full text-sm text-left">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">ID</th>
                        <th className="p-2">Nazwa</th>
                        <th className="p-2">Gatunek</th>
                        <th className="p-2">Stan</th>
                        <th className="p-2">Waga</th>
                        <th className="p-2">Wybieg</th>
                        <th className="p-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {animals.map(animal => (
                        <tr key={animal.id} className="hover:bg-gray-50">
                            <td className="p-2">{animal.id}</td>
                            <td className="p-2">{animal.name}</td>
                            <td className="p-2">{animal.species}</td>
                            <td className="p-2">
                                {editingAnimalId === animal.id ? (
                                    <select name="condition" value={editedAnimal.condition} onChange={handleEditChange} className="border rounded p-1">
                                        {conditionOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                ) : animal.condition}
                            </td>
                            <td className="p-2">{animal.weight} kg</td>
                            <td className="p-2">
                                {editingAnimalId === animal.id ? (
                                    <select name="enclosureId" value={editedAnimal.enclosureId} onChange={handleEditChange} className="border rounded p-1">
                                        {enclosures.map(e => <option key={e.id} value={e.id}>{`${e.id} | ${e.terrainType}`}</option>)}
                                    </select>
                                ) : (
                                    animalEnclosures[animal.id]
                                        ? `${animalEnclosures[animal.id].id} | ${animalEnclosures[animal.id].terrainType}`
                                        : 'N/A'
                                )}
                            </td>
                            <td className={`p-2 ${editingAnimalId === animal.id ? 'flex flex-col gap-2 items-start' : 'flex gap-2 items-center'}`}>
                                {editingAnimalId === animal.id ? (
                                    <>
                                        <button onClick={handleSaveClick} className="text-green-600 font-semibold flex items-center gap-1">
                                            <Save size={16} /> Zapisz
                                        </button>
                                        <button onClick={() => handleEditClick(null)} className="text-gray-600 flex items-center gap-1">
                                            <X size={16} /> Anuluj
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(animal)} className="text-blue-600 font-semibold flex items-center gap-1">
                                            <Pencil size={16} /> Edytuj
                                        </button>
                                        <button onClick={() => handleDetailClick(animal.id)} className="text-gray-600 font-semibold flex items-center gap-1">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Uzupełnij kartę leczenia</h2>
                        <label className="block mb-2">Opis</label>
                        <textarea value={treatmentDescription} onChange={e => setTreatmentDescription(e.target.value)} className="w-full p-2 border rounded mb-4" rows="3" />
                        <label className="block mb-2">Data i godzina</label>
                        <input type="datetime-local" value={treatmentDateTime} onChange={e => setTreatmentDateTime(e.target.value)} className="w-full p-2 border rounded mb-4" />
                        <label className="block mb-2">Symptomy</label>
                        <select multiple value={selectedSymptomIds} onChange={e => setSelectedSymptomIds(Array.from(e.target.selectedOptions, o => o.value))} className="w-full p-2 border rounded mb-4">
                            {symptoms.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <label className="block mb-2">Weterynarz</label>
                        <select value={veterinarianId} onChange={e => setVeterinarianId(Number(e.target.value))} className="w-full p-2 border rounded mb-4">
                            {veterinarians.map(v => <option key={v.id} value={v.id}>{v.name} {v.firstName}</option>)}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowVetDialog(false)} className="px-4 py-2 bg-gray-300 rounded">Anuluj</button>
                            <button onClick={() => setShowVetDialog(false)} className="px-4 py-2 bg-blue-600 text-white rounded">Zapisz kartę</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAnimals;