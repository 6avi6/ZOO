import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/userService';
import {
    getPagedWorkSchedules,
    createWorkSchedule,
    updateWorkSchedule,
    deleteWorkSchedule
} from '../../services/workScheduleService';
import RegistrarNavbar from "../../components/RegistrarNavbar";
import { Pencil, Plus, Trash2, Save, X } from 'lucide-react';


const UserSchedule = () => {
    const { id } = useParams();
    const userId = parseInt(id, 10);

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        shiftStart: '',
        shiftEnd: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchSchedules();
        fetchUsername();
    },  [userId]);

    const fetchUsername = async () => {
        try {
            const user = await getUser(userId);
            setUsername(user.username);
        } catch (err) {
            console.error('Błąd podczas ładowania danych użytkownika:', err);
            setUsername(`Użytkownik #${userId}`);
        }
    };

    const fetchSchedules = async () => {
        try {
            const data = await getPagedWorkSchedules(0, 100, userId);
            setSchedules(data.content);
        } catch (err) {
            setError('Błąd podczas ładowania harmonogramu pracy.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            await createWorkSchedule({
                shiftStart: formData.shiftStart,
                shiftEnd: formData.shiftEnd,
                userIds: [userId]
            });
            setFormData({ shiftStart: '', shiftEnd: '' });
            setDialogVisible(false);
            fetchSchedules();
        } catch (err) {
            console.error("Błąd przy dodawaniu:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Czy na pewno chcesz usunąć ten wpis?")) {
            try {
                await deleteWorkSchedule(id);
                fetchSchedules();
            } catch (err) {
                console.error("Błąd przy usuwaniu:", err);
            }
        }
    };

    const handleEdit = (schedule) => {
        setEditingId(schedule.id);
        setFormData({
            shiftStart: schedule.shiftStart,
            shiftEnd: schedule.shiftEnd
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ shiftStart: '', shiftEnd: '' });
    };

    const handleSaveClick = async () => {
        try {
            await updateWorkSchedule(editingId, {
                shiftStart: formData.shiftStart,
                shiftEnd: formData.shiftEnd,
                userIds: [userId]
            });
            setEditingId(null);
            setFormData({ shiftStart: '', shiftEnd: '' });
            fetchSchedules();
        } catch (err) {
            console.error("Błąd przy aktualizacji:", err);
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateWorkSchedule(editingId, {
                shiftStart: formData.shiftStart,
                shiftEnd: formData.shiftEnd,
                userIds: [userId]
            });
            setEditingId(null);
            setFormData({ shiftStart: '', shiftEnd: '' });
            setDialogVisible(false);
            fetchSchedules();
        } catch (err) {
            console.error("Błąd przy aktualizacji:", err);
        }
    };

    if (loading) return <div className="p-8">Ładowanie...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;

    return (
        <div className="relative p-8">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">Harmonogram pracy: {username}</h1>

            {/* Dialog modal */}
            {dialogVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <form onSubmit={editingId ? handleUpdate : handleAddSchedule} className="space-y-4">
                            <input
                                name="shiftStart"
                                type="datetime-local"
                                value={formData.shiftStart}
                                onChange={handleInputChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                            <input
                                name="shiftEnd"
                                type="datetime-local"
                                value={formData.shiftEnd}
                                onChange={handleInputChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setDialogVisible(false);
                                        setFormData({ shiftStart: '', shiftEnd: '' });
                                    }}
                                    className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <X size={16} /> Anuluj
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <Save size={16} /> {editingId ? 'Zapisz zmiany' : 'Dodaj'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {schedules.length === 0 ? (
                <p className="text-gray-500">Brak harmonogramów pracy dla tego użytkownika.</p>
            ) : (
                <div className="overflow-x-auto relative">
                    <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Start</th>
                            <th className="px-4 py-2">Koniec</th>
                            <th className="px-4 py-2">Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.id} className="border-t">
                                <td className="px-4 py-2">{schedule.id}</td>

                                <td className="px-4 py-2">
                                    {editingId === schedule.id ? (
                                        <input
                                            type="datetime-local"
                                            name="shiftStart"
                                            value={formData.shiftStart}
                                            onChange={handleInputChange}
                                            className="border rounded p-1"
                                        />
                                    ) : (
                                        new Date(schedule.shiftStart).toLocaleString()
                                    )}
                                </td>

                                <td className="px-4 py-2">
                                    {editingId === schedule.id ? (
                                        <input
                                            type="datetime-local"
                                            name="shiftEnd"
                                            value={formData.shiftEnd}
                                            onChange={handleInputChange}
                                            className="border rounded p-1"
                                        />
                                    ) : (
                                        new Date(schedule.shiftEnd).toLocaleString()
                                    )}
                                </td>

                                <td className={`p-2 flex justify-center gap-2`}>
                                    {editingId === schedule.id ? (
                                        <>
                                            <button onClick={handleSaveClick} className="text-green-600 hover:text-green-400 px-2 py-2">
                                                <Save size={16} />
                                            </button>
                                            <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-400 px-2 py-2">
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(schedule)} className="text-blue-600 hover:text-blue-400 px-2 py-">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(schedule.id)} className="text-red-600 hover:text-red-400 px-2 py-">
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>


                </div>
            )}
            {/* Floating Add Button */}
            <button
                onClick={() => setDialogVisible(true)}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-all"
            >
                <Plus size={24} />
            </button>
        </div>
    );
};

export default UserSchedule;
