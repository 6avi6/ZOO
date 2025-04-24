import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import './Home.css';

const Home = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (role) {
      navigate(`/${role.toLowerCase()}/dashboard`);
    }
  };

  return (
    <div className="home-container">
      <img src={logo} alt="ZOO logo" className="home-logo" />
      <h1 className="home-title">Witaj w systemie zarządzania ZOO</h1>
      <p className="home-subtext">
        Zaloguj się lub zarejestruj, aby rozpocząć pracę
      </p>

      <div className="home-buttons">
        <Link to="/login">Zaloguj się</Link>
        <Link to="/register">Zarejestruj się</Link>
      </div>

      <div style={{ marginTop: '30px' }}>
        <label htmlFor="role-select"><strong>Wybierz rolę testowo:</strong></label>
        <br />
        <select
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ margin: '10px', padding: '8px' }}
        >
          <option value="">-- wybierz rolę --</option>
          <option value="Admin">Admin</option>
          <option value="Dyrektor">Dyrektor</option>
          <option value="Opiekun">Opiekun</option>
          <option value="Rejestrator">Rejestrator</option>
          <option value="Weterynarz">Weterynarz</option>
        </select>
        <button
          onClick={handleRedirect}
          disabled={!role}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2b6cb0',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Przejdź
        </button>
      </div>
    </div>
  );
};

export default Home;
