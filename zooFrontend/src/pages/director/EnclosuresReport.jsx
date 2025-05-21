import React, { useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar'; 
const EnclosuresReport = () => {
  const [enclosures, setEnclosures] = useState([
    { id: 1, terrainType: 'Pustynia', maxAnimals: 10, animalsCount: 5 },
    { id: 2, terrainType: 'Tropikalny', maxAnimals: 15, animalsCount: 8 },
    // Więcej wybiegów
  ]);

  return (
    <div>
      <DirectorNavbar />
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Wykaz wybiegów i liczby zwierząt</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Typ terenu</th>
            <th className="px-4 py-2">Maks. zwierząt</th>
            <th className="px-4 py-2">Liczba zwierząt</th>
          </tr>
        </thead>
        <tbody>
          {enclosures.map((enclosure) => (
            <tr key={enclosure.id} className="border-b">
              <td className="px-4 py-2">{enclosure.id}</td>
              <td className="px-4 py-2">{enclosure.terrainType}</td>
              <td className="px-4 py-2">{enclosure.maxAnimals}</td>
              <td className="px-4 py-2">{enclosure.animalsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default EnclosuresReport;
