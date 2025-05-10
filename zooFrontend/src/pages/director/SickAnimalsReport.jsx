import React, { useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar'; 
const SickAnimalsReport = () => {
  const [sickAnimals, setSickAnimals] = useState([
    { id: 1, name: 'Zwierzę 1', disease: 'Infekcja', treatment: 'Leczenie' },
    { id: 2, name: 'Zwierzę 2', disease: 'Choroba skóry', treatment: 'Leczenie' },
    // Więcej chorych zwierząt
  ]);

  return (
    <div>
      <DirectorNavbar />
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Wykaz chorych zwierząt</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nazwa</th>
            <th className="px-4 py-2">Choroba</th>
            <th className="px-4 py-2">Leczenie</th>
          </tr>
        </thead>
        <tbody>
          {sickAnimals.map((animal) => (
            <tr key={animal.id} className="border-b">
              <td className="px-4 py-2">{animal.id}</td>
              <td className="px-4 py-2">{animal.name}</td>
              <td className="px-4 py-2">{animal.disease}</td>
              <td className="px-4 py-2">{animal.treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default SickAnimalsReport;
