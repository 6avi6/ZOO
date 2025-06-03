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

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [enclosures, setEnclosures] = useState([]);

  const sexOptions = ['MALE', 'FEMALE'];
  const conditionOptions = ['GOOD', 'INJURED']; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const species = await getSpecies();
        console.log('Fetched species:', species);
        setSpeciesOptions(species);
      } catch (error) {
        console.error('Error fetching species:', error);
      }

      try {
        const encl = await getAvailableEnclosures();
        setEnclosures(encl);
      } catch (error) {
        console.error('Error fetching enclosures:', error);
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

    try {
      await createAnimal({ ...formData });
      alert('Animal has been added.');
    } catch (err) {
      console.error('Error adding animal:', err);
      alert('An error occurred while adding the animal.');
    }
  };

  return (
    <div>
      <DirectorNavbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Buy a New Animal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="w-full border px-3 py-2" required onChange={handleChange} />
          <input type="date" name="birthDate" className="w-full border px-3 py-2" required onChange={handleChange} />

          <select name="condition" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Select Health Condition</option>
            {conditionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select name="sex" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Select Sex</option>
            {sexOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <input type="number" name="weight" placeholder="Weight (kg)" className="w-full border px-3 py-2" required step="1" onChange={handleChange} />

          <select name="species" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Select Species</option>
            {speciesOptions.map(sp => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>

          <select name="enclosureId" className="w-full border px-3 py-2" required onChange={handleChange}>
            <option value="">Select Enclosure</option>
            {enclosures.map(e => (
              <option key={e.id} value={e.id}>
                {e.terrainType}
              </option>
            ))}
          </select>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Buy Animal</button>
        </form>
      </div>
    </div>
  );
};

export default BuyAnimal;
