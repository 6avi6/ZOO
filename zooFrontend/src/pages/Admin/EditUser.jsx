import React, { useState } from 'react';

const EditUser = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Aktualizacja danych:', formData);
    // userService.updateUser(formData.id, formData)
  };

  return (
    <div className="form-container">
      <h2>Edytuj użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <label>ID użytkownika:</label>
        <input type="text" name="id" onChange={handleChange} required />

        <label>Nowe imię:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Nowy email:</label>
        <input type="email" name="email" onChange={handleChange} />

        <label>Nowa rola:</label>
        <select name="role" onChange={handleChange}>
          <option value="">Nie zmieniaj</option>
          <option value="rejestrator">Rejestrator</option>
          <option value="weterynarz">Weterynarz</option>
          <option value="opiekun">Opiekun</option>
          <option value="dyrektor">Dyrektor</option>
          <option value="admin">Administrator</option>
        </select>

        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default EditUser;
