import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Navbar from "../Navbar";
import {getUserWorkSchedule} from '../../../services/adminService';





const UserDetails = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pl-PL'); // np. "3.05.2025, 06:00:00"
  };


  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getUserWorkSchedule(id);
        setSchedule(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  return (
      <div>
        <Navbar />
        <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dane użytkownika</h1>
          <p className="text-xl font-semibold">Harmonogram pracy</p>
          {loading ? (
              <p>Ładowanie...</p>
          ) : error ? (
              <p className="text-red-500">{error}</p>
          ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b">
                  <th className="p-3">Od</th>
                  <th className="p-3">Do</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((s) => (

                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="p-3">{formatDate(s.shiftStart)}</td>
                      <td className="p-3">{formatDate(s.shiftEnd)}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </div>
  );
};

export default UserDetails;
