import React from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
const SickAnimalsReports = () => {
  return (
    <div>
      <DirectorNavbar />
      <div className="form-container">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wykaz chorych zwierząt</h2>
        <p>Tu będzie widoczna lista wszystkich chorych zwierząt.</p>
      </div>
    </div>
  );
};

export default SickAnimalsReports;