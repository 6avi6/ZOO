import React, { useEffect, useState } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import { createAnimal, getSpecies, getAvailableEnclosures } from '../../services/animalService';

const BuyAnimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    condition: '',
    sex: '',
    weight: '',
    species: '',
    enclosureId: '',
  });

  const [customCondition, setCustomCondition] = useState('');
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [enclosures, setEnclosures] = useState([]);

  const sexOptions = ['MALE', 'FEMALE'];
  const conditionOptions = ['GOOD', 'COUGHING', 'FATIGUE', 'LOSS_OF_APPETITE', 'OTHER'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const species = await getSpecies();
        console.log('Species pobrane:', species);
        setSpeciesOptions(species);
      } catch (error) {
        console.error('Błąd podczas pobierania gatunków:', error);
      }

      try {
        const encl = await getAvailableEnclosures();
        setEnclosures(encl);
      } catch (error) {
        console.error('Błąd podczas pobierania wybiegów:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const condition = formData.condition === 'OTHER' ? customCondition : formData.condition;

    try {
      await createAnimal({ ...formData, condition });
      alert('Zwierzę zostało dodane.');
    } catch (err) {
      console.error('Błąd dodawania zwierzęcia:', err);
      alert('Wystąpił błąd podczas dodawania zwierzęcia.');
    }
  };

  return (
    <div>
      <DirectorNavbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Kup nowe zwierzę</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Imię" className="w-full border px-3 py-2" required onChange={handleChange} />
          <input type="date" name="birthDate" className="w-full border px-3 py-2" required onChange={handleChange} />

          <select name="condition" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Wybierz stan zdrowia</option>
            {conditionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          {formData.condition === 'OTHER' && (
            <input type="text" placeholder="Wpisz chorobę" className="w-full border px-3 py-2" required onChange={(e) => setCustomCondition(e.target.value)} />
          )}

          <select name="sex" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Wybierz płeć</option>
            {sexOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <input type="number" name="weight" placeholder="Waga" className="w-full border px-3 py-2" required step="1" onChange={handleChange} />

          <select name="species" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Wybierz gatunek</option>
            {speciesOptions.map(sp => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>

          <select name="enclosureId" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Wybierz wybieg</option>
            {enclosures.map(e => (
              <option key={e.id} value={e.id}>
                {e.terrainType}
              </option>
            ))}
          </select>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Kup zwierzę</button>
        </form>
      </div>
    </div>
  );
};

export default BuyAnimal;

// import React, { useEffect, useState } from 'react';
// import DirectorNavbar from '../../components/DirectorNavbar';
// import {
//   createAnimal,
//   assignCaregivers,
//   getSpecies,
//   getAvailableEnclosures,
//   getAllUsers
// } from '../../services/animalService';
// import { getAllCaregivers } from '../../services/caretakerService';


// const BuyAnimal = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     birthDate: '',
//     condition: '',
//     sex: '',
//     weight: '',
//     species: '',
//     enclosureId: '',
//   });

//   const [customCondition, setCustomCondition] = useState('');
//   const [speciesOptions, setSpeciesOptions] = useState([]);
//   const [enclosures, setEnclosures] = useState([]);
//   const [caregivers, setCaregivers] = useState([]);
//   const [selectedCaregivers, setSelectedCaregivers] = useState([]);

//   const sexOptions = ['MALE', 'FEMALE'];
//   const conditionOptions = ['GOOD', 'COUGHING', 'FATIGUE', 'LOSS_OF_APPETITE', 'OTHER'];

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const species = await getSpecies();
//       console.log('Species pobrane:', species);
//       setSpeciesOptions(species);
//     } catch (error) {
//       console.error('Błąd podczas pobierania gatunków:', error);
//     }

//     try {
//       const encl = await getAvailableEnclosures();
//       setEnclosures(encl);
//     } catch (error) {
//       console.error('Błąd podczas pobierania wybiegów:', error);
//     }

//     try {
//       const caregivers = await getAllCaregivers();
//       setCaregivers(caregivers);
//     } catch (error) {
//       console.error('Błąd podczas pobierania opiekunów:', error);
//     }
//   };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedCaregivers.length === 0) {
//       alert('Zwierzę musi mieć przypisanego co najmniej jednego opiekuna.');
//       return;
//     }

//     const condition = formData.condition === 'OTHER' ? customCondition : formData.condition;

//     try {
//       const created = await createAnimal({ ...formData, condition });
//       await assignCaregivers(created.id, selectedCaregivers);
//       alert('Zwierzę zostało dodane.');
//     } catch (err) {
//       console.error('Błąd dodawania zwierzęcia:', err);
//       alert('Wystąpił błąd podczas dodawania zwierzęcia.');
//     }
//   };

//   return (
//     <div>
//       <DirectorNavbar />
//       <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Kup nowe zwierzę</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="name" placeholder="Imię" className="w-full border px-3 py-2" required onChange={handleChange} />
//           <input type="date" name="birthDate" className="w-full border px-3 py-2" required onChange={handleChange} />

//           <select name="condition" className="w-full border px-3 py-2" required onChange={handleChange}>
//             <option value="">Wybierz stan zdrowia</option>
//             {conditionOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>

//           {formData.condition === 'OTHER' && (
//             <input type="text" placeholder="Wpisz chorobę" className="w-full border px-3 py-2" required onChange={(e) => setCustomCondition(e.target.value)} />
//           )}

//           <select name="sex" className="w-full border px-3 py-2" required onChange={handleChange}>
//             <option value="">Wybierz płeć</option>
//             {sexOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>

//           <input type="number" name="weight" placeholder="Waga" className="w-full border px-3 py-2" required step="1" onChange={handleChange} />

//           <select name="species" className="w-full border px-3 py-2" required onChange={handleChange}>
//             <option value="">Wybierz gatunek</option>
//             {speciesOptions.map(sp => (
//               <option key={sp} value={sp}>{sp}</option>
//             ))}
//           </select>

//           <select name="enclosureId" className="w-full border px-3 py-2" required onChange={handleChange}>
//          <option value="">Wybierz wybieg</option>
//             {enclosures.map(e => (
//             <option key={e.id} value={e.id}>
//               {e.terrainType}
//             </option>
//             ))}
//           </select>

//           <label className="font-semibold">Opiekunowie:</label>
// <label className="font-semibold">Opiekunowie:</label>
// <select
//   multiple
//   className="w-full border px-3 py-2 h-32"
//   value={selectedCaregivers.map(id => String(id))}
//   onChange={(e) => {
//     const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
//     setSelectedCaregivers(selected);
//   }}
// >
//   {caregivers.map(c => (
//     <option key={c.id} value={String(c.id)}>
//       {c.firstName} {c.lastName}
//     </option>
//   ))}
// </select>




//           <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Kup zwierzę</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BuyAnimal;

