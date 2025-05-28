import React, { useEffect, useState } from 'react';
import VeterinarianNavbar from '../../components/VeterinarianNavbar';
import axiosInstance from '../../services/axiosInstance';

const SickAnimals = () => {
  const [sickAnimals, setSickAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/reports/sick-animals');
        setSickAnimals(response.data);
      } catch (err) {
        setError('Nie udało się pobrać danych o chorych zwierzętach.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <VeterinarianNavbar />
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Wykaz chorych zwierząt</h2>
        <p className="text-center text-gray-500 mb-6">Raport na dzień: {today}</p>

        {loading ? (
          <p>Ładowanie...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
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
                  <tr key={animal.animalId} className="border-b">
                    <td className="px-4 py-2">{animal.animalId}</td>
                    <td className="px-4 py-2">{animal.animalName}</td>
                    <td className="px-4 py-2">{animal.disease}</td>
                    <td className="px-4 py-2">{animal.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-right font-semibold text-gray-700">
              Aktualnie chorych zwierząt: {sickAnimals.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SickAnimals;
