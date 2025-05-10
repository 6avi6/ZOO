import React from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';

const EmployeesReport = () => {
  return (
    <div>
      <DirectorNavbar />
      <div className="form-container">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wykaz pracowników</h2>
        <p>Tu będzie widoczna lista wszystkich pracowników z ich rolami.</p>
      </div>
    </div>
  );
};

export default EmployeesReport;
