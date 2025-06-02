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
        <div className="min-h-screen bg-gray-50 p-6">
            <CaregiverNavbar />

            <h1 className="text-2xl font-bold mb-6">Mój grafik pracy</h1>
            <div className="overflow-auto rounded-lg bg-white shadow-md">
                {schedule.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Start zmiany</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700">Koniec zmiany</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {schedule.map((item) => (
                            <tr key={item.id}>
                                <td className="whitespace-nowrap px-4 py-3">
                                    {new Date(item.shiftStart).toLocaleString()}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3">
                                    {new Date(item.shiftEnd).toLocaleString()}
                                </td>
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