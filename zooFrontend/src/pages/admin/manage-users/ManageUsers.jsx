import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from "../../../components/AdminNavbar";
import { getAllUsers } from '../../../services/adminService';
import { MdOutlineDelete } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { deleteUser } from "../../../services/userService";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import EditUser from './EditUser';
import AddUserModal from './AddUser';
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";


const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const roleDisplayNames = {
        ADMIN: "Administrator",
        DIRECTOR: "Director",
        VETERINARIAN: "Veterinarian",
        REGISTRAR: "Registrar",
        CAREGIVER: "Caregiver"
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);

                const token = localStorage.getItem("accessToken");
                if (token) {
                    const payload = token.split('.')[1];
                    const decodedPayload = JSON.parse(atob(payload));
                    setCurrentUserId(parseInt(decodedPayload.sub)); // lub decodedPayload.id jeśli sub nie działa
                    console.log("Zalogowany user ID:", decodedPayload.sub);
                }
            } catch (err) {
                setError('Failed to load users.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    const refreshUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch {
            toast.error("Failed to refresh user list.");
        }
    };

    const handleDelete = async (id) => {
        if (id === currentUserId) {
            toast.warning("You cannot delete your own account.");
            return;
        }
        setLoading(true);
        try {
            await deleteUser(id);
            await refreshUsers();
            toast.success("User deleted successfully.");
        } catch (err) {
            setError('Failed to delete user.');
            toast.error(err.message || "Deletion failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="bg-white relative mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300 p-8">
                <div className="flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">User List</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="absolute right-0 top-0 mr-6 mt-6 bg-[#526C43] hover:bg-[#234228] text-white py-3 px-3 rounded-full transition-all duration-150"
                    >
                        <IoPersonAddOutline className="inline-block w-6 sm:mr-4 h-6" />
                        <span className="hidden sm:inline">Add User</span>
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b">
                            <th className="p-3">ID</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">
                                    <Link to={`/admin/manage-users/${user.id}`} className="underline hover:text-[#234228] transition-all duration-150">
                                        {user.username}
                                    </Link>
                                </td>
                                <td className="p-3">{roleDisplayNames[user.role] || user.role}</td>
                                <td className="text-right">
                                    {user.id !== currentUserId && (
                                        <>
                                            <Pencil
                                                className="inline-block w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-800 transition-all"
                                                onClick={() => setEditingUserId(user.id)}
                                            />
                                            <Trash2
                                                className="inline-block w-5 ml-3 mr-3 h-5 text-red-600 cursor-pointer hover:text-red-800 transition-all"
                                                onClick={() => handleDelete(user.id)}
                                            />
                                        </>
                                    )}
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
