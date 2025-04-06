import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';
import './Home.css';

const Home = () => {
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
    </div>
  );
};

export default Home;
