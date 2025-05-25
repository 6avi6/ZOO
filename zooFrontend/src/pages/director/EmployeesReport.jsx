import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DirectorNavbar from '../../components/DirectorNavbar'; 
import { getAllUsers } from '../../services/employeesReportService';

const EmployeesReport = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Nie udało się pobrać użytkowników.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <DirectorNavbar />
      <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300 p-8 relative">
        <div className="flex flex-col items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Lista pracowników</h1>
          <p className="text-gray-500 mt-1">Raport na dzień: {today}</p>
        </div>

        {loading ? (
          <p>Ładowanie...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Imię</th>
                <th className="p-3">Nazwisko</th>
                <th className="p-3">Rola</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
            <p className="mt-4 text-right font-semibold text-gray-700">
  Pracuje {users.length} {users.length === 1 ? 'pracownik' : 'pracowników'}
</p>

          </table>
          
        )}
      </div>
    </div>
  );
};

export default EmployeesReport;