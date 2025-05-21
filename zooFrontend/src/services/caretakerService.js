// services/caretakerService.js
// Użyj debilu /api/users/{role}
// role - cargiver
export const getAllCaretakers = async () => {
    // tutaj wywołanie API np. za pomocą fetch/axios
    const response = await fetch('/api/caretakers');
    if (!response.ok) throw new Error('Błąd przy pobieraniu opiekunów');
    return await response.json();
};

export const updateCaretaker = async (id, data) => {
    const response = await fetch(`/api/caretakers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
};

export const deleteCaretaker = async (id) => {
    await fetch(`/api/caretakers/${id}`, { method: 'DELETE' });
};

export const addCaretaker = async (data) => {
    const response = await fetch(`/api/caretakers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
};
