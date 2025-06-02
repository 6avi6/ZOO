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
        <div className="p-8">
            <RegistrarNavbar />
            <h1 className="text-2xl font-bold mb-6">User List</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">First Name</th>
                        <th className="px-4 py-2 text-left">Last Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Hire Date</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-t">
                            <td className="px-4 py-2">{displayOrPlaceholder(user.id)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.username)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.role)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.firstName)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.lastName)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.email)}</td>
                            <td className="px-4 py-2">{displayOrPlaceholder(user.hireDate)}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => navigate(`/registrar/work-schedule/${user.id}`)}
                                    className="text-gray-600 hover:text-gray-400 font-semibold flex items-center gap-1"
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