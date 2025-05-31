import React, { useEffect, useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import { getAllAnimals, getAnimalCaretakers, addCaretakers, removeCaretakers } from '../../services/animalService';
import { getAllCaregivers } from '../../services/caretakerService';

const ManageAnimalCaregivers = () => {
  const [animals, setAnimals] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [animalCaretakers, setAnimalCaretakers] = useState({});
  const [selectedCaregivers, setSelectedCaregivers] = useState({});

  const fetchData = async () => {
    try {
      const allAnimals = await getAllAnimals();
      setAnimals(allAnimals);

      const caregiverList = await getAllCaregivers();
      setCaregivers(caregiverList);

      const caretakersMap = {};
      for (const animal of allAnimals) {
        const caretakers = await getAnimalCaretakers(animal.id);
        caretakersMap[animal.id] = caretakers;
      }
      setAnimalCaretakers(caretakersMap);

      const selectedInitial = {};
      for (const animalId in caretakersMap) {
        selectedInitial[animalId] = [];
      }
      setSelectedCaregivers(selectedInitial);
    } catch (error) {
      console.error('Błąd podczas ładowania danych:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCaregivers = async (animalId) => {
    try {
      await addCaretakers(animalId, selectedCaregivers[animalId]);
      alert('Dodano opiekunów.');
      fetchData(); // odśwież dane po dodaniu
    } catch (error) {
      console.error('Błąd dodawania opiekunów:', error);
      alert('Błąd dodawania opiekunów.');
    }
  };

  const handleRemoveCaretaker = async (animalId, caregiverId) => {
    try {
      await removeCaretakers(animalId, [caregiverId]);
      alert('Usunięto opiekuna.');
      fetchData(); // odśwież dane po usunięciu
    } catch (error) {
      console.error('Błąd usuwania opiekuna:', error);
      alert('Błąd usuwania opiekuna.');
    }
  };

  return (
    <div>
      <DirectorNavbar />
      <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Zarządzaj opiekunami zwierząt</h2>

        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nazwa Zwierzęcia</th>
              <th className="border border-gray-300 px-4 py-2">Gatunek</th>
              <th className="border border-gray-300 px-4 py-2">Aktualni Opiekunowie</th>
              <th className="border border-gray-300 px-4 py-2">Nowi Opiekunowie</th>
              <th className="border border-gray-300 px-4 py-2">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td className="border border-gray-300 px-4 py-2">{animal.name}</td>
                <td className="border border-gray-300 px-4 py-2">{animal.species}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {animalCaretakers[animal.id]?.length > 0 ? (
                    <ul>
                      {animalCaretakers[animal.id].map(c => (
                        <li key={c.id} className="flex justify-between items-center">
                          {c.username}
                          <button
                            onClick={() => handleRemoveCaretaker(animal.id, c.id)}
                            className="ml-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Usuń
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-red-500">Brak</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    multiple
                    className="w-full border px-3 py-2"
                    value={selectedCaregivers[animal.id] || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
                      setSelectedCaregivers(prev => ({
                        ...prev,
                        [animal.id]: selected
                      }));
                    }}
                  >
                    {caregivers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.username}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleAddCaregivers(animal.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edytuj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAnimalCaregivers;



// import React, { useEffect, useState } from 'react';
// import DirectorNavbar from '../../components/DirectorNavbar';
// import { getAllAnimals, getAnimalCaretakers, assignCaregivers } from '../../services/animalService';
// import { getAllCaregivers } from '../../services/caretakerService';

// const ManageAnimalCaregivers = () => {
//   const [animals, setAnimals] = useState([]);
//   const [caregivers, setCaregivers] = useState([]);
//   const [animalCaretakers, setAnimalCaretakers] = useState({});
//   const [selectedCaregivers, setSelectedCaregivers] = useState({});

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const allAnimals = await getAllAnimals();
//       setAnimals(allAnimals);

//       const caregiverList = await getAllCaregivers();
//       console.log('Caregivers:', caregiverList);
//       setCaregivers(caregiverList);

//       const caretakersMap = {};
//       for (const animal of allAnimals) {
//         const caretakers = await getAnimalCaretakers(animal.id);
//         caretakersMap[animal.id] = caretakers;
//       }
//       setAnimalCaretakers(caretakersMap);


//       const selectedInitial = {};
//       for (const animalId in caretakersMap) {
//         selectedInitial[animalId] = caretakersMap[animalId].map(c => c.id);
//       }
//       setSelectedCaregivers(selectedInitial);

//     } catch (error) {
//       console.error('Błąd podczas ładowania danych:', error);
//     }
//   };

//   fetchData();
// }, []);



//   const handleAssign = async (animalId, selectedCaregiverIds) => {
//     try {
//       await assignCaregivers(animalId, selectedCaregiverIds);
//       alert('Przypisano opiekunów.');
//     } catch (error) {
//       console.error('Błąd przypisywania:', error);
//       alert('Błąd przypisywania opiekunów.');
//     }
//   };

//   return (
//     <div>
//       <DirectorNavbar />
//       <div className="max-w-7xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Zarządzaj opiekunami zwierząt</h2>

//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 px-4 py-2">Nazwa Zwierzęcia</th>
//               <th className="border border-gray-300 px-4 py-2">Gatunek</th>
//               <th className="border border-gray-300 px-4 py-2">Aktualni Opiekunowie</th>
//               <th className="border border-gray-300 px-4 py-2">Nowi Opiekunowie</th>
//               <th className="border border-gray-300 px-4 py-2">Akcja</th>
//             </tr>
//           </thead>
//           <tbody>
//             {animals.map((animal) => (
//               <tr key={animal.id}>
//                 <td className="border border-gray-300 px-4 py-2">{animal.name}</td>
//                 <td className="border border-gray-300 px-4 py-2">{animal.species}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   { animalCaretakers[animal.id]?.length > 0
//   ? animalCaretakers[animal.id].map(c => c.username).join(', ')
//   : <span className="text-red-500"> Brak</span>

//                     }
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <select
//                     multiple
//                     className="w-full border px-3 py-2"
//                     value={selectedCaregivers[animal.id] || []}
//                     onChange={(e) => {
//                       const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
//                       setSelectedCaregivers(prev => ({
//                         ...prev,
//                         [animal.id]: selected
//                       }));
//                     }}
//                   >
//                     {caregivers.map(c => (
//   <option key={c.id} value={c.id}>
//     {c.username}
//   </option>
// ))}

//                   </select>
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <button
//                     onClick={() => handleAssign(animal.id, selectedCaregivers[animal.id] || [])}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//                   >
//                     Zapisz
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageAnimalCaregivers;
