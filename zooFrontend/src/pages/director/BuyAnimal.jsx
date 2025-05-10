import React from 'react';
import { Link } from 'react-router-dom';
import DirectorNavbar from '../../components/DirectorNavbar';



const BuyAnimal = () => {
  return (
    <div>
      <DirectorNavbar />
      <div className="form-container">
        <h2>Kup nowe zwierzę</h2>
        <p>Tu będzie możliwość dodania nowego zwierzęcia zakupionego przez dyrektora.</p>
      </div>
    </div>
  );
};

export default BuyAnimal;
