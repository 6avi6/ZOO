import React, { useEffect, useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import { getAnimalsCaregiversReport } from '../../services/animalsCaregiversReportService';

const AnimalsCaregiversReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnimalsCaregiversReport();
        setData(result);
      } catch (err) {
        setError('Nie udało się pobrać danych o zwierzętach i opiekunach.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DirectorNavbar />
      <div className="bg-white mt-12 mx-auto w-[80%] rounded-lg border shadow-sm border-gray-300 p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">Zwierzęta i ich opiekunowie</h1>
        <p className="text-center text-gray-500 mb-6">Raport na dzień: {today}</p>

        {loading ? (
          <p>Ładowanie...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">ID zwierzęcia</th>
                <th className="p-3">Nazwa zwierzęcia</th>
                <th className="p-3">Opiekunowie</th>
              </tr>
            </thead>
            <tbody>
              {data.map((animal) => (
                <tr key={animal.animalId} className="border-b">
                  <td className="p-3">{animal.animalId}</td>
                  <td className="p-3">{animal.animalName}</td>
                  <td className="p-3">
                    {animal.caregivers.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {animal.caregivers.map((caregiver, index) => (
                          <li key={index}>
                            {caregiver.firstName} {caregiver.lastName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500 italic">Brak opiekuna</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AnimalsCaregiversReport;
