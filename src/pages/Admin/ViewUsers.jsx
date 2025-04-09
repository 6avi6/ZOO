import React, { useEffect, useState } from 'react';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    setUsers([
      { id: 1, name: 'Jan Kowalski', email: 'jan@zoo.pl', role: 'weterynarz' },
      
    ]);
  }, []);

  return (
    <div className="form-container">
      <h2>Lista użytkowników</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Imię</th><th>Email</th><th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
