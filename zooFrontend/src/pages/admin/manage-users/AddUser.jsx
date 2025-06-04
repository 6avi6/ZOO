import React, { useState } from 'react';
import { toast } from "react-toastify";
import { registerUser } from "../../../services/adminService";
import { IoMdClose } from "react-icons/io";
import {FaSave} from "react-icons/fa";



const AddUser = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const roles = ['ADMIN', 'CAREGIVER', 'DIRECTOR', 'REGISTRAR', 'VETERINARIAN'];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.role) {
      toast.error('Wszystkie pola muszą być wypełnione.');
      return;
    }

    try {
      const response = await registerUser(formData);

      if (response === "Registration successfully completed") {
        toast.success('Użytkownik został dodany!');
        setFormData({ username: '', password: '', role: '' });
        onUserAdded(); // odśwież listę użytkowników
        onClose();     // zamknij modal
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error('Błąd przy rejestracji użytkownika:', error);
      toast.error('Wystąpił błąd podczas rejestracji.');
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-lg p-6 relative shadow-lg">
          <IoMdClose
              onClick={onClose}
              size={36}
              className="absolute top-5 right-5 text-gray-800 cursor-pointer underline hover:text-[#e30b1e] rounded-full p-1 hover:bg-red-100 transition-all duration-150"/>

          <h2 className="text-xl font-semibold mb-4">Add user</h2>

          <form className="flex flex-col gap-3" onSubmit={handleRegisterUser}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border w-full p-2 rounded"
              >
                <option value="DIRECTOR">Director</option>
                <option value="VETERINARIAN">Veterinarian</option>
                <option value="REGISTRAR">Registrar</option>
                <option value="CAREGIVER">Caregiver</option>
              </select>
            </div>
            <button
                type="submit"
                className="bg-[#526C43] text-white w-[50%] mx-auto py-2 rounded-full hover:bg-[#234228] transition-colors flex items-center justify-center gap-2"
            >
              <FaSave />

              Save
            </button>

          </form>

        </div>
      </div>
  );
};

export default AddUser;
