import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const today = new Date().toLocaleDateString('pl-PL');

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
      <div className="bg-white mt-12 mx-auto min-h-[300px] w-[80%] rounded-lg border shadow-sm border-gray-300 p-8 relative">
        <div className="flex flex-col items-center justify-between mb-6">
           <h1 className="text-2xl font-semibold text-gray-800">Employee List</h1>
          <p className="text-gray-500 mt-1">Report as of: {today}</p>
        </div>

        <div id="report-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-3">ID</th>
                    <th className="p-3">First Name</th>
                    <th className="p-3">Last Name</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.firstName}</td>
                      <td className="p-3">{user.lastName}</td>
                      <td className="p-3">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-right font-semibold text-gray-700">
                There are {users.length} {users.length === 1 ? 'employee' : 'employees'} working
              </p>
            </>
          )}
        </div>

        {!loading && !error && (
          <div className="flex justify-end mt-6">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Download PDF Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesReport;
