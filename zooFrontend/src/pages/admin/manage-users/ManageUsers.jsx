import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar";
import { getAllUsers } from '../../../services/AdminService';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";




const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <Navbar />
            <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Lista użytkowników</h1>

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
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="">
                                    <Link to={`/admin/manage-users/edit/${user.id}`} className="text-[#526C43] hover:text-[#234228] transition-all duration-150">
                                        <MdDriveFileRenameOutline className="inline-block w-6 h-6" />
                                    </Link>
                                </td>
                                <td className="">
                                    <Link to={`/admin/manage-users/edit/${user.id}`} className="text-[#C2680D] hover:text-[#A54C02] transition-all duration-150">
                                        <MdOutlineDelete className="inline-block w-6 h-6 " />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
