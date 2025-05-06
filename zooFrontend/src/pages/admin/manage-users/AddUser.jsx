import React, { useState } from 'react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Tutaj będzie wysyłanie danych na backend (np. userService.addUser(formData))
    console.log('Dane do dodania:', formData);
  };

  return (
    <div className="form-container">
      <h2>Dodaj użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <label>Imię:</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Rola:</label>
        <select name="role" onChange={handleChange} required>
          <option value="">Wybierz rolę</option>
          <option value="rejestrator">Rejestrator</option>
          <option value="weterynarz">Weterynarz</option>
          <option value="opiekun">Opiekun</option>
          <option value="dyrektor">Dyrektor</option>
        
        </select>

        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default AddUser;
