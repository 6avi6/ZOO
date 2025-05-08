import React, { useState } from 'react';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Usuwam użytkownika o ID:', userId);
    
  };

  return (
    <div className="form-container">
      <h2>Usuń użytkownika</h2>
      <form onSubmit={handleSubmit}>
        <label>ID użytkownika:</label>
        <input
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <button type="submit">Usuń</button>
      </form>
    </div>
  );
};

export default DeleteUser;
