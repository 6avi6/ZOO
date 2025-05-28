import React, { useEffect, useState } from 'react';
import {Trash2, Pencil, ArrowRight, Plus} from 'lucide-react';
import RegistrarNavbar from '../../components/RegistrarNavbar';
import { getAllAnimals, updateAnimal, deleteAnimal, addAnimal } from '../../services/animalService';
import { getAllEnclosures , getEnclosureById } from '../../services/enclosureService';
import { getAllVeterinarians } from '../../services/veterinarianService';
import { createAnimalTreatmentCard } from '../../services/animalTreatmentCardService';
import { getAllSymptoms } from '../../services/symptomService';
const EditAnimal = () => {
    const [animals, setAnimals] = useState([]);
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [editedAnimal, setEditedAnimal] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newAnimalData, setNewAnimalData] = useState({
        name: '',
        birthDate: '',
        species: '',
        condition: '',
        sex: '',
        weight: '',
        enclosure: { id: '' }
    });
    const [enclosures, setEnclosures] = useState([]);
    const [animalEnclosures, setAnimalEnclosures] = useState({});
    const [showVetDialog, setShowVetDialog] = useState(false);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptomIds, setSelectedSymptomIds] = useState([]);
    const [treatmentDescription, setTreatmentDescription] = useState('Domyślny opis przypadłośći');
    const [treatmentDateTime, setTreatmentDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [veterinarianId, setVeterinarianId] = useState(1);
    const [veterinarians, setVeterinarians] = useState([]);

    // Get all animals
    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getAllAnimals();
            setAnimals(data);
        };
        fetchAnimals();
    }, []);

    // TO DO it should be dynamically downloaded
    const speciesOptions = [
        'LION', 'ELEPHANT', 'CROCODILE', 'ZEBRA', 'PARROT',
        'GIRAFFE', 'TIGER', 'HIPPOPOTAMUS', 'PENGUIN', 'MONKEY'
    ];
    // TO DO it should be dynamically downloaded
    const conditionOptions = ['GOOD', 'INJURED', 'DEAD'];

    // Pobierz wszystkie wybiegi
    useEffect(() => {
        const fetchEnclosures = async () => {
            try {
                const allEnclosures = await getAllEnclosures();
                setEnclosures(allEnclosures);
                //console.log(allEnclosures);
            } catch (error) {
                console.error("Błąd przy pobieraniu wybiegów:", error);
            }
        };
        fetchEnclosures();
    }, []);

    // Dla każdego zwierzęcia pobierz wybieg i zapisz do animalEnclosures (mapa)
    useEffect(() => {
        const fetchAnimalEnclosures = async () => {
            //console.log(animals)
            if (!animals.length) return;

            // Mapowanie ID zwierzęcia na obiekt wybiegu
            const enclosureMap = {};

            //Wybiegi dla każdego ze zwierząt
            await Promise.all(animals.map(async (animal) => {

                if (animal && animal.enclosureId) {
                    try {
                        const enclosure = enclosures.find(e => e.id === animal.enclosureId);
                        if (enclosure) {
                            enclosureMap[animal.id] = enclosure;
                        } else {
                            // Alternatywnie pobierz z API
                            const enclosureFromApi = await getEnclosureById(animal.enclosureId);
                            enclosureMap[animal.id] = enclosureFromApi;

                        }
                    } catch (error) {
                        console.error(`Błąd przy pobieraniu wybiegu dla zwierzęcia o ID ${animal.id}:`, error);
                    }
                }
            }));

            setAnimalEnclosures(enclosureMap);
        };

        fetchAnimalEnclosures();
    }, [animals, enclosures]); // uruchom, gdy zmienią się animals lub enclosures



    const handleEditClick = (animal) => {
        setEditingAnimal(animal.id);
        setEditedAnimal({ ...animal });
    };

    const handleEditChange = async (e) => {
        const { name, value } = e.target;

        // Aktualizacja pola
        setEditedAnimal(prev => ({
            ...prev,
            [name]: value
        }));

        // Otwórz dialog, jeśli condition == INJURED
        if (name === 'condition' && value === 'INJURED') {
            try {
                const symptomsData = await getAllSymptoms();
                setSymptoms(symptomsData);
                const vets = await getAllVeterinarians();
                setVeterinarians(vets);
                setShowVetDialog(true);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych do formularza leczenia:", error);
            }
        }

    };

    const handleSaveClick = async (id) => {
        console.log(id);
        await updateAnimal(id, {
            ...editedAnimal,
            weight: parseFloat(editedAnimal.weight),
            enclosure: { id: parseInt(editedAnimal.enclosureId) }
        });
        const updated = await getAllAnimals();
        setAnimals(updated);
        setEditingAnimal(null);

        if (editedAnimal.condition === 'INJURED') {
            await createAnimalTreatmentCard({
                description: treatmentDescription,
                dateTime: new Date(treatmentDateTime).toISOString(),
                animalId: id,
                veterinarianId: veterinarianId,
                symptomIds: selectedSymptomIds.map(Number)
            });
        }

    };

    const handleDeleteClick = async (id) => {
        await deleteAnimal(id);
        setAnimals(animals.filter(a => a.id !== id));
    };

    const handleAddAnimalChange = (e) => {
        const { name, value } = e.target;
        setNewAnimalData(prev => ({
            ...prev,
            [name]: (name === "weight" || name === "enclosureId") ? Number(value) : value
        }));
    };

    const handleAddAnimalSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAnimal({
                ...newAnimalData,
                weight: parseFloat(newAnimalData.weight),
                enclosure: { id: parseInt(newAnimalData.enclosureId) }
            });
            const updated = await getAllAnimals();
            setAnimals(updated);
            setIsAdding(false);
            setNewAnimalData({
                name: '',
                birthDate: '',
                species: '',
                condition: '',
                sex: '',
                weight: '',
                enclosure: { id: '' }
            });
        } catch (err) {
            console.error('Błąd przy dodawaniu zwierzęcia:', err);
            alert('Dodanie zwierzęcia nie powiodło się.');
        }
    };

    const fetchVeterinarians = async () => {
        try {
            const vets = await getAllVeterinarians();
            setVeterinarians(vets);
        } catch (err) {
            console.error("Błąd przy pobieraniu weterynarzy:", err);
        }
    };

    return (

        <div className="relative p-6 min-h-screen bg-gray-100">
            <RegistrarNavbar/>
            {/* Floating Add Button */}
            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                <Plus size={20}/>
            </button>

            {/* Animal Table */}
            <div className="w-full flex mx-auto overflow-x-auto bg-white rounded-lg shadow-md p-6">
            <table className="w-full table-auto text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nazwa</th>
                        <th className="px-4 py-2">Data urodzenia</th>
                        <th className="px-4 py-2">Gatunek</th>
                        <th className="px-4 py-2">Stan</th>
                        <th className="px-4 py-2">Płeć</th>
                        <th className="px-4 py-2">Waga</th>
                        <th className="px-4 py-2">Wybieg</th>
                        <th className="px-4 py-2">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{animal.id}</td>
                            {editingAnimal === animal.id ? (
                                <>
                                    <td><input name="name" value={editedAnimal.name} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="birthDate" value={editedAnimal.birthDate} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><select name="species" value={editedAnimal.species} onChange={handleEditChange} className="p-1 border rounded">
                                        <option value="">Wybierz gatunek</option>
                                        {speciesOptions.map(species => (
                                            <option key={species} value={species}>{species}</option>
                                        ))}
                                    </select></td>
                                    <td><select name="condition" value={editedAnimal.condition} onChange={handleEditChange} className="p-1 border rounded">
                                        <option value="">Wybierz stan zdrowia</option>
                                        {conditionOptions.map(condition => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select></td>
                                    <td><select name="sex" value={editedAnimal.sex} onChange={handleEditChange}  className="p-1 border rounded">
                                        <option value="">Wybierz płeć</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                    </select></td>
                                    <td><input name="weight" value={editedAnimal.weight} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td>
                                        <select
                                            name="enclosureId"
                                            value={editedAnimal.enclosureId || ''}
                                            onChange={handleEditChange}
                                            className="p-1 border rounded"
                                        >
                                            <option value="">Wybierz wybieg</option>
                                            {enclosures.map((e) => (
                                                <option key={e.id} value={e.id}>
                                                    {`${e.id} | ${e.terrainType}`}
                                                </option>
                                            ))}
                                        </select>

                                    </td>


                                    <td className="flex gap-2">
                                        <button onClick={() => handleSaveClick(animal.id)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Zapisz</button>
                                        <button onClick={() => setEditingAnimal(null)} className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">Anuluj</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className="px-4 py-2">{animal.name}</td>
                                    <td className="px-4 py-2">{animal.birthDate}</td>
                                    <td className="px-4 py-2">{animal.species}</td>
                                    <td className="px-4 py-2">{animal.condition}</td>
                                    <td className="px-4 py-2">{animal.sex}</td>
                                    <td className="px-4 py-2">{animal.weight}</td>
                                    <td className="px-4 py-2">
                                        {animalEnclosures[animal.id]
                                            ? `${animalEnclosures[animal.id].id} | ${animalEnclosures[animal.id].terrainType}`
                                            : ''}
                                    </td>

                                    <td className="flex gap-2">
                                        <button onClick={() => handleEditClick(animal)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"><Pencil size={20} /></button>
                                        <button onClick={() => handleDeleteClick(animal.id)} className="p-1 text-red-600 hover:text-red-800"><Trash2 size={20} /></button>
                                        <button onClick={() => window.location.href = `animals/${animal.id}`} className="p-1 text-blue-600 hover:text-blue-800" title="Szczegóły"><ArrowRight size={20} /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Add Animal Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-center mb-6">Dodaj nowe zwierzę</h2>
                        <form onSubmit={handleAddAnimalSubmit} className="flex flex-col gap-4">
                            <input name="name" placeholder="Nazwa" value={newAnimalData.name} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input
                                type="date"
                                name="birthDate"
                                value={newAnimalData.birthDate}
                                onChange={handleAddAnimalChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            />
                            <select name="species" value={newAnimalData.species} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm">
                                <option value="">Wybierz gatunek</option>
                                {speciesOptions.map(species => (
                                    <option key={species} value={species}>{species}</option>
                                ))}
                            </select>

                            <select name="condition" value={newAnimalData.condition} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm">
                                <option value="">Wybierz stan zdrowia</option>
                                {conditionOptions.map(condition => (
                                    <option key={condition} value={condition}>{condition}</option>
                                ))}
                            </select>
                            <select name="sex" value={newAnimalData.sex} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm">
                                <option value="">Wybierz płeć</option>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                            </select>
                            <input name="weight" type="number" placeholder="Waga" value={newAnimalData.weight} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <select
                                name="enclosureId"
                                value={newAnimalData.enclosureId}
                                onChange={handleAddAnimalChange}
                                required
                                className="p-4 border rounded-lg shadow-sm"
                            >
                                <option value="">Wybierz wybieg</option>
                                {enclosures.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {`${e.id} | ${e.terrainType}`}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Dodaj</button>
                                <button type="button" onClick={() => setIsAdding(false)} className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all">Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showVetDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Uzupełnij kartę leczenia</h2>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Opis</label>
                        <textarea
                            value={treatmentDescription}
                            onChange={(e) => setTreatmentDescription(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            rows="3"
                        />
                        <label className="block mb-2 text-sm font-medium text-gray-700">Data i godzina</label>
                        <input
                            type="datetime-local"
                            value={treatmentDateTime}
                            onChange={(e) => setTreatmentDateTime(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <label className="block mb-2 text-sm font-medium text-gray-700">Symptomy</label>
                        <select
                            multiple
                            value={selectedSymptomIds}
                            onChange={(e) =>
                                setSelectedSymptomIds(
                                    Array.from(e.target.selectedOptions, (option) => option.value)
                                )
                            }
                            className="w-full p-2 border rounded mb-4"
                        >
                            {symptoms.map((symptom) => (
                                <option key={symptom.id} value={symptom.id}>
                                    {symptom.name}
                                </option>
                            ))}
                        </select>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Weterynarz</label>
                        <select
                            value={veterinarianId}
                            onChange={(e) => setVeterinarianId(Number(e.target.value))}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">Wybierz weterynarza</option>
                            {veterinarians.map(vet => (
                                <option key={vet.id} value={vet.id}>
                                    {vet.name} {vet.firstName}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowVetDialog(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={() => setShowVetDialog(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Zapisz kartę
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EditAnimal;
