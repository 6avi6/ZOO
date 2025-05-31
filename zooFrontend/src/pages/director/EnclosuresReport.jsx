import React, { useState, useEffect } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import { getEnclosuresReport } from '../../services/enclosuresReportService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const EnclosuresReport = () => {
  const [enclosures, setEnclosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnclosuresReport();
        setEnclosures(data);
      } catch (error) {
        console.error("Błąd pobierania danych wybiegów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Wykaz wybiegów i liczby zwierząt', 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Raport na dzień: ${today}`, 14, 28);

    const tableColumn = ['ID', 'Typ terenu', 'Maks. zwierząt', 'Liczba zwierząt'];
    const tableRows = enclosures.map((enclosure) => [
      enclosure.id,
      enclosure.terrainType,
      enclosure.maxAnimals,
      enclosure.animalCount, // <-- poprawione
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    doc.text(
      `Liczba wybiegów: ${enclosures.length}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save('raport_wybiegow.pdf');
  };

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

        {loading ? (
          <p>Ładowanie...</p>
        ) : (
          <>
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
                    <td className="px-4 py-2">{enclosure.animalCount}</td> {/* <-- poprawione */}
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 text-right font-semibold text-gray-700">
              Liczba wybiegów: {enclosures.length}
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

export default EnclosuresReport;
