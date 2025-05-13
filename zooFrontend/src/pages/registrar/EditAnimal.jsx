import React, { useEffect, useState } from 'react';
import RegistrarNavbar from '../../components/RegistrarNavbar'
import { getAllAnimals, updateAnimal, deleteAnimal, addAnimal } from '../../services/animalService';

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

    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getAllAnimals();
            setAnimals(data);
        };
        fetchAnimals();
    }, []);

    const handleEditClick = (animal) => {
        setEditingAnimal(animal.id);
        setEditedAnimal({ ...animal });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (name === 'enclosure.id') {
            setEditedAnimal(prev => ({
                ...prev,
                enclosure: { id: value }
            }));
        } else {
            setEditedAnimal(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSaveClick = async (id) => {
        await updateAnimal(id, {
            ...editedAnimal,
            weight: parseFloat(editedAnimal.weight),
            enclosure: { id: parseInt(editedAnimal.enclosure.id) }
        });
        const updated = await getAllAnimals();
        setAnimals(updated);
        setEditingAnimal(null);
    };

    const handleDeleteClick = async (id) => {
        await deleteAnimal(id);
        setAnimals(animals.filter(a => a.id !== id));
    };

    const handleAddAnimalChange = (e) => {
        const { name, value } = e.target;
        if (name === 'enclosure.id') {
            setNewAnimalData(prev => ({
                ...prev,
                enclosure: { id: value }
            }));
        } else {
            setNewAnimalData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddAnimalSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAnimal({
                ...newAnimalData,
                weight: parseFloat(newAnimalData.weight),
                enclosure: { id: parseInt(newAnimalData.enclosure.id) }
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

    return (

        <div className="relative p-6 min-h-screen bg-gray-100">
            <RegistrarNavbar/>
            {/* Floating Add Button */}
            <button
                onClick={() => setIsAdding(true)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm"
            >
                +
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
                                    <td><input name="species" value={editedAnimal.species} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="condition" value={editedAnimal.condition} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="sex" value={editedAnimal.sex} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="weight" value={editedAnimal.weight} onChange={handleEditChange} className="p-1 border rounded" /></td>
                                    <td><input name="enclosure.id" value={editedAnimal.enclosure.id} onChange={handleEditChange} className="p-1 border rounded" /></td>
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
                                    <td className="px-4 py-2">{animal.enclosure.id}</td>
                                    <td className="flex gap-2">
                                        <button onClick={() => handleEditClick(animal)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edytuj</button>
                                        <button onClick={() => handleDeleteClick(animal.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Usuń</button>
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
                            <input name="birthDate" placeholder="Data urodzenia (YYYY-MM-DD)" value={newAnimalData.birthDate} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="species" placeholder="Gatunek" value={newAnimalData.species} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="condition" placeholder="Stan zdrowia" value={newAnimalData.condition} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="sex" placeholder="Płeć" value={newAnimalData.sex} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="weight" type="number" placeholder="Waga" value={newAnimalData.weight} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <input name="enclosure.id" type="number" placeholder="ID wybiegu" value={newAnimalData.enclosure.id} onChange={handleAddAnimalChange} required className="p-4 border rounded-lg shadow-sm" />
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Dodaj</button>
                                <button type="button" onClick={() => setIsAdding(false)} className="p-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all">Anuluj</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditAnimal;
