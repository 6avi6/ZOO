import React, { useState, useEffect } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar'; 
import { getEnclosuresReport } from '../../services/enclosuresReportService';

const EnclosuresReport = () => {
  const [enclosures, setEnclosures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnclosuresReport();
        setEnclosures(data);
      } catch (error) {
        console.error("Błąd pobierania danych wybiegów:", error);
      }
    };

    fetchData();
  }, []);

  const today = new Date().toLocaleDateString('pl-PL'); // Dodano datę

  return (
    <div>
      <DirectorNavbar />
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Wykaz wybiegów i liczby zwierząt
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Raport na dzień: {today}
        </p>
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
