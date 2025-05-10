import React, { useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar'; 
const AssignmentsReport = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, animalName: 'Zwierzę 1', caregiver: 'Anna Nowak' },
    { id: 2, animalName: 'Zwierzę 2', caregiver: 'Piotr Zieliński' },
    // Więcej przypisań
  ]);

  return (
    <div>
      <DirectorNavbar />
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Zwierzęta z opiekunami</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Zwierzę</th>
            <th className="px-4 py-2">Opiekun</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="border-b">
              <td className="px-4 py-2">{assignment.id}</td>
              <td className="px-4 py-2">{assignment.animalName}</td>
              <td className="px-4 py-2">{assignment.caregiver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AssignmentsReport;
