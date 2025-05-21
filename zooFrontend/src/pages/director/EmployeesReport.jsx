import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DirectorNavbar from '../../components/DirectorNavbar'; 
import { getAllUsers } from '../../services/employeesReportService';  // Importujemy nasz serwis


const EmployeesReport = () => {
   const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);      // Błąd

  // Pobieranie danych o pracownikach
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
            <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8 relative">
                <div className="flex flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Lista pracowników</h1>

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
                            <th className="p-3">Login</th>
                            <th className="p-3">Rola</th>
                            <th className=""></th>
                            <th className=""></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (

                            <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">
                                        <Link to={`/director/${user.id}`} className=" underline hover:text-[#234228] transition-all duration-150">
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td className="p-3">{user.role}</td>

                               
                               
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
};

export default EmployeesReport;
