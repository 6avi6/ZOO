import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsersPaged } from '../../../services/userService';
import RegistrarNavbar from "../../../components/RegistrarNavbar";
import { ArrowRight } from 'lucide-react';

const WorkSchedule = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsersPaged(0, 100);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const displayOrPlaceholder = (value) => value ? value : <span className="text-gray-400 italic">No data</span>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">User List</h1>

            <div className="overflow-auto rounded-lg bg-white shadow-md">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {['ID', 'Username', 'Role', 'First Name', 'Last Name', 'Email', 'Hire Date', 'Actions'].map((header) => (
                            <th
                                key={header}
                                scope="col"
                                className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {users.map(user => (
                        <tr key={user.id} className="group hover:bg-gray-50 transition-colors duration-150">
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">{displayOrPlaceholder(user.id)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.username)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.role)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.firstName)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.lastName)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.email)}</td>
                            <td className="whitespace-nowrap px-4 py-3">{displayOrPlaceholder(user.hireDate)}</td>
                            <td className="whitespace-nowrap px-4 py-3 flex gap-3">
                                <button
                                    onClick={() => navigate(`/registrar/work-schedule/${user.id}`)}
                                    className="text-gray-600 hover:text-gray-400 font-semibold flex items-center gap-1 px-2 py-2"
                                    title="View schedule"
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center px-4 py-4 text-gray-500">
                                No users to display.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSchedule;