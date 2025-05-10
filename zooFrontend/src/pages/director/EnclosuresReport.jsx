import React from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
const EnclosuresReport = () => {
  return (
    <div>
      <DirectorNavbar />
      <div className="form-container">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wykaz wybiegów i liczby zwierząt</h2>
        <p>Tu będzie lista wybiegów oraz liczba zwierząt przebywających na każdym z nich.</p>
      </div>
    </div>
  );
};

export default EnclosuresReport;
