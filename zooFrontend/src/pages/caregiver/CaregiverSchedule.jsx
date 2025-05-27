import React, { useEffect, useState } from 'react';
import CaregiverNavbar from '../../components/CaregiverNavbar';
import { getCurrentUser } from '../../services/userService';
import { getPagedWorkSchedules } from '../../services/workScheduleService';

const CaregiverScheduler = () => {
    const [user, setUser] = useState(null);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                const scheduleData = await getPagedWorkSchedules(0, 50, currentUser.id);
                setSchedule(scheduleData.content);
            } catch (err) {
                console.error('Błąd podczas ładowania harmonogramu:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <CaregiverNavbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-xl">
                <h1 className="text-2xl font-bold mb-6">Twój grafik pracy</h1>

                {schedule.length > 0 ? (
                    <table className="w-full table-auto border border-gray-300 text-sm">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Start zmiany</th>
                            <th className="border p-2">Koniec zmiany</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schedule.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">{new Date(item.shiftStart).toLocaleString()}</td>
                                <td className="border p-2">{new Date(item.shiftEnd).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Brak dostępnych danych o harmonogramie.</p>
                )}
            </div>
        </div>
    );
};

export default CaregiverScheduler;