import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from "../../../components/AdminNavbar";
import { getAllUsers } from '../../../services/adminService';
import { MdOutlineDelete } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import {deleteUser} from "../../../services/userService";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import EditUser from './EditUser';
import AddUserModal from './AddUser';



const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);


    const refreshUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch {
            toast.error("Nie udało się odświeżyć listy użytkowników.");
        }
    };


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
            <div className="bg-white relative mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300  p-8">
                <div className="flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Lista użytkowników</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="absolute right-0 top-0 mr-6 mt-6 bg-[#526C43] hover:bg-[#234228] text-white py-3 px-3 rounded-full transition-all duration-150"
                    >
                        <IoPersonAddOutline className="inline-block w-6 sm:mr-4 h-6" />
                        <span className="hidden sm:inline">Dodaj użytkownika</span>
                    </button>


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


                                <td className="text-right">
                                    <AiOutlineEdit
                                        className="inline-block w-6 mr-4 h-6 cursor-pointer hover:text-[#08bf29] transition-all duration-150"
                                        onClick={() => setEditingUserId(user.id)}
                                    />

                                    <MdOutlineDelete className="inline-block mr-3 w-6 h-6 hover:text-[#e30b1e] transition-all duration-150 cursor-pointer"
                                        onClick={() => handleDelete(user.id)}/>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                {editingUserId && (
                    <EditUser
                        userId={editingUserId}
                        onClose={() => setEditingUserId(null)}
                        onUserUpdated={refreshUsers}
                    />
                )}
                {showAddModal && (
                    <AddUserModal
                        onClose={() => setShowAddModal(false)}
                        onUserAdded={refreshUsers}
                    />
                )}



            </div>
        </div>
    );
};

export default ManageUsers;