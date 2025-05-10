import React, { useState, useEffect } from 'react';
import DirectorNavbar from '../../components/DirectorNavbar';
import axiosInstance from '../../services/axiosInstance';  // Używamy instancji axiosa
import { toast } from 'react-toastify'; // Komunikaty toast

const BuyAnimal = () => {
  //const [animals, setAnimals] = useState([]);
 // const [loading, setLoading] = useState(false);

  //zwierze na sztywno do testowania
  const [animalData, setAnimalData] = useState({
    id: 1,
    name: 'Zwierzę 1',
    species: 'Tygrys',
    condition: 'Zdrowe',
    sex: 'Samiec',
    weight: 100,
    enclosure: 'Wybieg A',
  });

  const [loading, setLoading] = useState(false); 

  // Pobieranie dostępnych zwierząt
  // useEffect(() => {
  //   const fetchAnimals = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.get('/api/animals/available');
  //       setAnimals(response.data);
  //     } catch (error) {
  //       toast.error('Błąd podczas pobierania dostępnych zwierząt');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnimals();
  // }, []);

  //   // Pobieranie wszystkich zwierząt
  // useEffect(() => {
  //   const fetchAnimals = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.get('/api/animals');
  //       // Filtruj zwierzęta, które są dostępne do zakupu
  //       const availableAnimals = response.data.filter(animal => animal.status === 'available');
  //       setAnimals(availableAnimals);
  //     } catch (error) {
  //       toast.error('Błąd podczas pobierania dostępnych zwierząt');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnimals();
  // }, []);

  // Funkcja do "zakupu" zwierzęcia
  const handleBuy = async () => {
    setLoading(true);
    try {
      // Symulacja wysyłania zapytania do backendu
      toast.success('Zwierzę zostało zakupione!');
    } catch (error) {
      toast.error('Wystąpił błąd podczas zakupu zwierzęcia');
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div>
//       <DirectorNavbar />
//       <div className="max-w-4xl mx-auto p-8">
//         <h2 className="text-2xl font-semibold text-center mb-6">Dostępne zwierzęta do kupienia</h2>

//         {loading ? (
//           <p>Ładowanie dostępnych zwierząt...</p>
//         ) : (
//           <div>
//             {animals.length === 0 ? (
//               <p>Brak dostępnych zwierząt do kupienia.</p>
//             ) : (
//               <div>
//                 {animals.map((animal) => (
//                   <div key={animal.id} className="flex items-center justify-between p-4 border-b">
//                     <div>
//                       <h3 className="text-lg font-semibold">{animal.name}</h3>
//                       <p>{animal.species}</p>
//                     </div>
//                     <button
//                       onClick={() => handleBuy(animal.id)}
//                       className="bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md"
//                     >
//                       Kup
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// export default BuyAnimal;
return (
    <div>
      <DirectorNavbar /> {/* Dodajemy DirectorNavbar */}
      
      <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Dostępne zwierzęta do kupienia</h2>

        {/* Wyświetlanie twardo wprowadzonego zwierzęcia */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{animalData.name}</h3>
            <p>Gatunek: {animalData.species}</p>
            <p>Stan: {animalData.condition}</p>
            <p>Płeć: {animalData.sex}</p>
            <p>Waga: {animalData.weight} kg</p>
            <p>Wybieg: {animalData.enclosure}</p>
          </div>
          <button
            onClick={handleBuy}
            className="bg-[#526C43] hover:bg-[#234228] text-white py-2 px-4 rounded-md"
          >
            {loading ? 'Zakup...' : 'Kup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyAnimal;