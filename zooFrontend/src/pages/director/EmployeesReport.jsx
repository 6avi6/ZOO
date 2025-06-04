import React, { useEffect, useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar'; 
import { getAllUsers } from '../../services/employeesReportService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const EmployeesReport = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toLocaleDateString('pl-PL');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Employee List', 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Report as of: ${today}`, 14, 28);

    const tableColumn = ['ID', 'First Name', 'Last Name', 'Role'];
    const tableRows = users.map((user) => [
      user.id,
      user.firstName,
      user.lastName,
      user.role,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    doc.text(
      `There are ${users.length} ${users.length === 1 ? 'employee' : 'employees'} working`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save('employee_report.pdf');
  };

  return (
    <div>
      <DirectorNavbar />
      <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Employee List
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Report as of: {today}
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.firstName}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 text-right font-semibold text-gray-700">
              There are {users.length} {users.length === 1 ? 'employee' : 'employees'} working
            </p>

            <div className="flex justify-end mt-6">
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Download PDF Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeesReport;
