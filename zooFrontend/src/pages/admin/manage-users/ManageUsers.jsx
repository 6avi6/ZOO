import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from "../../../components/AdminNavbar";
import { getAllUsers } from '../../../services/adminService';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import {deleteUser} from "../../../services/userService";
import { toast } from "react-toastify";
import AppToast from "../../../components/AppToast";
import { AiOutlineEdit } from "react-icons/ai";






const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteUser(id);
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
            toast.success("Użytkownik został usunięty")
        } catch (err) {
            setError('Nie udało się usunąć użytkownika.');
            toast.error(err)
        } finally {
            setLoading(false);
        }
    };


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
            <AdminNavbar />
            <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8 relative">
                <div className="flex flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Lista użytkowników</h1>
                    <Link to="/admin/manage-users/add">
                        <button className="hidden bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md transition-all duration-150">
                            Dodaj użytkownika
                        </button>
                    </Link>

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
                                        <Link to={`/admin/manage-users/${user.id}`} className=" underline hover:text-[#234228] transition-all duration-150">
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td className="p-3">{user.role}</td>

                                <td className="">
                                    <Link to={`/admin/manage-users/edit/${user.id}`} className="text-black hover:text-[#08bf29] transition-all duration-150">
                                        <AiOutlineEdit className="inline-block w-6 h-6" />
                                    </Link>
                                </td>
                                <td className="">
                                        <MdOutlineDelete className="inline-block w-6 h-6 hover:text-[#e30b1e] transition-all duration-150 cursor-pointer"
                                        onClick={() => handleDelete(user.id)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                <Link to="/admin/manage-users/add">
                    <IoPersonAddOutline
                        size={32}
                        className="absolute top-7 right-8 text-gray-800 rounded-md cursor-pointer hover:text-[#08bf29] transition-all duration-150"
                    />
                </Link>

                <AppToast />


            </div>
        </div>
    );
};

export default ManageUsers;
