import React from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
const AssignmentsReport = () => {
 return (
    <div>
      <DirectorNavbar />
      <div className="form-container">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wykaz zwierząt </h2>
        <p>Tu będzie widoczna lista zwierzat z przypisanymi odobnikami</p>
      </div>
    </div>
  );
};
export default AssignmentsReport;
