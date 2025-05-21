import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import AdminNavbar from "../../../components/AdminNavbar";
import {getUserWorkSchedule} from '../../../services/adminService';
import {getUser} from "../../../services/userService";





const UserDetails = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pl-PL'); // np. "3.05.2025, 06:00:00"
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(id);
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }


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

    fetchUser();
    fetchSchedule();
  }, [id]);

  return (
      <div>
        <AdminNavbar />
        <div className="bg-white mt-12 mx-auto overflow-x-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dane osobowe</h2>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Imię</th>
                <td className="px-4 py-2">{user.firstName}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Nazwisko</th>
                <td className="px-4 py-2">{user.lastName}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Nazwa użytkownika</th>
                <td className="px-4 py-2">{user.username}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Email</th>
                <td className="px-4 py-2">{user.email}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Data zatrudnienia</th>
                <td className="px-4 py-2">{user.hireDate}</td>
              </tr>
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-800">Rola</th>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
              </tbody>
            </table>
          </div>


          <div className="my-6 w-[20%] mx-auto  h-[1px] bg-gray-400">

          </div>
          <p className="text-2xl font-semibold mb-4">Harmonogram pracy</p>
          {loading ? (
              <p>Ładowanie...</p>
          ) : error ? (
              <p className="text-red-500">{error}</p>
          ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-2 font-medium text-gray-800">Od</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-800">Do</th>
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
