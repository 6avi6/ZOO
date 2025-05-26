import React, { useEffect, useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import { getSickAnimalsReport } from '../../services/sickAnimalsReportService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SickAnimalsReport = () => {
  const [sickAnimals, setSickAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSickAnimalsReport();
        setSickAnimals(data);
      } catch (err) {
        setError('Nie udało się pobrać danych o chorych zwierzętach.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Wykaz chorych zwierzat', 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Raport na dzien: ${today}`, 14, 28);

    const tableColumn = ['ID', 'Nazwa', 'Choroba', 'Leczenie'];
    const tableRows = sickAnimals.map((animal) => [
      animal.animalId,
      animal.animalName,
      animal.disease,
      animal.treatment,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    doc.text(
      `Aktualnie chorych zwierzat: ${sickAnimals.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save('raport_chorych_zwierzat.pdf');
  };

  return (
    <div>
      <DirectorNavbar />
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
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

            <div className="flex justify-end mt-6">
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Pobierz raport w formacie PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SickAnimalsReport;
