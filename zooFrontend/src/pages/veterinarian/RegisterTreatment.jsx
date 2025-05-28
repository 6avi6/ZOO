import React, { useEffect, useState } from 'react';
import VeterinarianNavbar from '../../components/VeterinarianNavbar';
import {
  getAllAnimalTreatmentCards,
  createAnimalTreatmentCard,
  deleteAnimalTreatmentCard,
  getAllAnimals,
  getAllSymptoms
} from '../../services/animalTreatmentCardService';

const RegisterTreatment = () => {
  const [cards, setCards] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [newCard, setNewCard] = useState({
    animalId: '',
    description: '',
    dateTime: '',
    symptomIds: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCards, fetchedAnimals, fetchedSymptoms] = await Promise.all([
          getAllAnimalTreatmentCards(),
          getAllAnimals(),
          getAllSymptoms()
        ]);
        setCards(fetchedCards);
        setAnimals(fetchedAnimals);
        setSymptoms(fetchedSymptoms);
      } catch (e) {
        setError('Błąd podczas pobierania danych.');
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const payload = {
      ...newCard,
      dateTime: new Date(newCard.dateTime).toISOString()
    };
    try {
      const created = await createAnimalTreatmentCard(payload);
      setCards([...cards, created]);
      setNewCard({ animalId: '', description: '', dateTime: '', symptomIds: [] });
    } catch (err) {
      setError('Błąd podczas dodawania karty leczenia.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnimalTreatmentCard(id);
      setCards(cards.filter((card) => card.id !== id));
    } catch (err) {
      setError('Błąd podczas usuwania karty leczenia.');
      console.error(err);
    }
  };

  return (
    <div>
      <VeterinarianNavbar />
      <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Rejestruj leczenie</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Zwierzę</th>
              <th className="px-4 py-2">Choroba</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Symptomy</th>
              <th className="px-4 py-2">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className="border-b">
                <td className="px-4 py-2">{card.id}</td>
                <td className="px-4 py-2">{animals.find(a => a.id == card.animalId)?.name || 'Brak'}</td>
                <td className="px-4 py-2">{card.description}</td>
                <td className="px-4 py-2">{new Date(card.dateTime).toLocaleString('pl-PL')}</td>
                <td className="px-4 py-2">
                  {(card.symptomIds || [])
                    .map(id => symptoms.find(s => s.id === id)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-red-600 hover:underline"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}

            {/* Nowy wpis */}
            <tr>
              <td className="px-4 py-2">Nowe</td>
              <td className="px-4 py-2">
                <select
                  value={newCard.animalId}
                  onChange={(e) => setNewCard({ ...newCard, animalId: Number(e.target.value) })}
                >
                  <option value="">Wybierz zwierzę</option>
                  {animals.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  value={newCard.description}
                  onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                  placeholder="Opis choroby"
                  className="w-full border rounded p-1"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="datetime-local"
                  value={newCard.dateTime}
                  onChange={(e) => setNewCard({ ...newCard, dateTime: e.target.value })}
                  className="w-full border rounded p-1"
                />
              </td>
              <td className="px-4 py-2">
                <select
                  multiple
                  value={newCard.symptomIds}
                  onChange={(e) =>
                    setNewCard({
                      ...newCard,
                      symptomIds: Array.from(e.target.selectedOptions, opt => Number(opt.value))
                    })
                  }
                  className="w-full border rounded p-1"
                >
                  {symptoms.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                <button onClick={handleAdd} className="text-green-600 hover:underline">
                  Dodaj
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterTreatment;
