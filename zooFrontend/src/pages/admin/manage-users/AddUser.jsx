import React, { useState } from 'react';
import Navbar from "../Navbar";
import { Slide, ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../../services/adminService";
import { IoMdClose } from "react-icons/io";



const AddUser = () => {
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
      } else {
        toast.error(response);
      }
    } catch (error) {
      console.error('Błąd przy rejestracji użytkownika:', error);
      toast.error('Wystąpił błąd podczas rejestracji.');
    }
  };

  return (
      <div>
        <Navbar />
        <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300 p-8 relative">
          <h1 className="mb-6 mx-auto font-semibold text-2xl text-gray-800">Dodaj użytkownika</h1>
          <form className="flex flex-col justify-between gap-2" onSubmit={handleRegisterUser}>
            <div>
              <label className="block text-gray-700 text-md">Nazwa użytkownika</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border w-full p-1 border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-md">Hasło</label>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border w-full p-1 border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-md">Rola</label>
              <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border w-full p-1 border-gray-300 rounded-lg"
              >
                <option value="">Wybierz rolę</option>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <button
                type="submit"
                className="mt-4 mx-auto w-1/3 bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md transition-all duration-150"
            >
              Zapisz
            </button>

          </form>

          <IoMdClose
              onClick={() => window.history.back()}
              size={36}
              className="absolute top-6 right-7 text-gray-800 rounded-md cursor-pointer underline hover:text-[#e30b1e] transition-all duration-150"/>



          <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              theme="light"
              transition={Slide}
              pauseOnHover={false}
              toastClassName="bg-white text-black border border-gray-200 shadow"
              progressClassName="bg-green-500"
          />
        </div>
      </div>
  );
};

export default AddUser;
