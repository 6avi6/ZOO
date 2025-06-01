
import VeterinarianNavbar from '../../components/VeterinarianNavbar';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  getAllAnimalTreatmentCards,
  createAnimalTreatmentCard,
  updateAnimalTreatmentCard,
  deleteAnimalTreatmentCard,
  getAllAnimals,
  getAllSymptoms
} from '../../services/animalTreatmentCardService'; // <-- Twój serwis

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
  const [editingCard, setEditingCard] = useState(null);
  const [error, setError] = useState(null);

  // Funkcja fetchująca wszystkie dane (karty, zwierzęta, symptomy)
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

  // Fetch danych przy pierwszym załadowaniu komponentu
  useEffect(() => {
    fetchData();
  }, []);

  // Dodawanie nowej karty leczenia
  const handleAdd = async () => {
    const payload = {
      animalId: newCard.animalId,
      description: newCard.description,
      dateTime: dayjs(newCard.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
      symptomIds: newCard.symptomIds,
      veterinarianId: 1 // <-- Sztywne przypisanie weterynarza
    };
    console.log('Payload do CREATE:', payload);

    try {
      await createAnimalTreatmentCard(payload);
      await fetchData(); // <-- odśwież wszystkie dane po dodaniu
      setNewCard({ animalId: '', description: '', dateTime: '', symptomIds: [] }); // Reset formularza
    } catch (err) {
      setError('Błąd podczas dodawania karty leczenia.');
      console.error(err);
    }
  };

  // Aktualizacja istniejącej karty leczenia
  const handleUpdate = async () => {
    const payload = {
      id: editingCard.id,
      animalId: editingCard.animalId,
      description: editingCard.description,
      dateTime: dayjs(editingCard.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
      symptomIds: editingCard.symptomIds,
      veterinarianId: 1 // <-- Sztywne przypisanie weterynarza
    };
    console.log('Payload do UPDATE:', payload);

    try {
      await updateAnimalTreatmentCard(editingCard.id, payload);
      await fetchData(); // <-- odśwież wszystkie dane po edycji
      setEditingCard(null); // Wyłącz tryb edycji
    } catch (err) {
      setError('Błąd podczas aktualizacji karty leczenia.');
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę kartę leczenia?')) {
      return;
    }
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
              editingCard?.id === card.id ? (
                <tr key={card.id} className="border-b bg-yellow-50">
                  <td className="px-4 py-2">{card.id}</td>
                  <td className="px-4 py-2">
                    <select
                      value={editingCard?.animalId || ''}
                      onChange={(e) =>
                        setEditingCard({ ...editingCard, animalId: Number(e.target.value) })
                      }
                      className="w-full border rounded p-1"
                    >
                      <option value="">Wybierz zwierzę</option>
                      {animals.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={editingCard.description}
                      onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="datetime-local"
                      value={editingCard.dateTime}
                      onChange={(e) => setEditingCard({ ...editingCard, dateTime: e.target.value })}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {symptoms.map((s) => (
                      <label key={s.id} className="block">
                        <input
                          type="checkbox"
                          checked={editingCard?.symptomIds?.includes(s.id) || false}
                          onChange={() =>
                            setEditingCard({ ...editingCard, symptomIds: [s.id] })
                          }
                          className="mr-2"
                        />
                        {s.name}
                      </label>
                    ))}
                  </td>
                  <td className="px-4 py-2 flex flex-col">
                    <button
                      onClick={handleUpdate}
                      className="text-blue-600 hover:underline mb-2"
                    >
                      Zapisz
                    </button>
                    <button
                      onClick={() => setEditingCard(null)}
                      className="text-gray-600 hover:underline"
                    >
                      Anuluj
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={card.id} className="border-b">
                  <td className="px-4 py-2">{card.id}</td>
                  <td className="px-4 py-2">{animals.find((a) => a.id === card.animalId)?.name || 'Brak'}</td>
                  <td className="px-4 py-2">{card.description}</td>
                  <td className="px-4 py-2">{new Date(card.dateTime).toLocaleString('pl-PL')}</td>
                  <td className="px-4 py-2">
                    {(card.symptomIds || [])
                      .map((id) => symptoms.find((s) => s.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')}
                  </td>
                  <td className="px-4 py-2 flex flex-col">
                    <button
                      onClick={() => setEditingCard({
                        id: card.id,
                        animalId: card.animalId,
                        description: card.description,
                        dateTime: new Date(card.dateTime).toISOString().slice(0, 16),
                        symptomIds: card.symptomIds || []
                      })}
                      className="text-blue-600 hover:underline mb-2"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="text-red-600 hover:underline"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              )
            ))}

            {/* Nowy wpis */}
            <tr>
              <td className="px-4 py-2">Nowe</td>
              <td className="px-4 py-2">
                <select
                  value={newCard.animalId || ''}
                  onChange={(e) =>
                    setNewCard({ ...newCard, animalId: Number(e.target.value) })
                  }
                  className="w-full border rounded p-1"
                >
                  <option value="">Wybierz zwierzę</option>
                  {animals.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
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
                {symptoms.map((s) => (
                  <label key={s.id} className="block">
                    <input
                      type="checkbox"
                      checked={newCard.symptomIds.includes(s.id)}
                      onChange={() =>
                        setNewCard({ ...newCard, symptomIds: [s.id] })
                      }
                      className="mr-2"
                    />
                    {s.name}
                  </label>
                ))}
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
