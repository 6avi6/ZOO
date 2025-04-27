//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
import DirectorDashboard from '../pages/Director/Dashboard/DirectorDashboard';
import CaregiverDashboard from '../pages/Caregiver/Dashboard/CaregiverDashboard';
import RegistrarDashboard from '../pages/Registrar/Dashboard/RegistrarDashboard';
import VeterinarianDashboard from '../pages/Veterinarian/Dashboard/VeterinarianDashboard';

import AddAnimal from '../pages/Registrar/AddAnimal';
import EditAnimal from '../pages/Registrar/EditAnimal';
import AddCaretaker from '../pages/Registrar/AddCaretaker';
import EditEnclosure from '../pages/Registrar/EditEnclosure';

import ManageUsers from '../pages/Admin/ManageUsers';
import DictionaryManagement from '../pages/Admin/DictionaryManagement';
import AddUser from '../pages/Admin/AddUser';
import DeleteUser from '../pages/Admin/DeleteUser';
import EditUser from '../pages/Admin/EditUser';
import ViewUsers from '../pages/Admin/ViewUsers';
import AddAnimalSpecies from '../pages/Admin/AddAnimalSpecies';
import AddFoodType from '../pages/Admin/AddFoodType';
import AddEnclosureType from '../pages/Admin/AddEnclosureType';


import ReportsOverview from '../pages/Director/ReportsOverview';
import BuyAnimal from '../pages/Director/BuyAnimal';
import EmployeesReport from '../pages/Director/EmployeesReport';
import EnclosuresReport from '../pages/Director/EnclosuresReport';
import AssignmentsReport from '../pages/Director/AssignmentsReport';
import SickAnimalsReport from '../pages/Director/SickAnimalsReport';

import AnimalUpdate from '../pages/Caregiver/AnimalUpdate';
import FeedingUpdate from '../pages/Caregiver/FeedingUpdate';

import RegisterTreatment from '../pages/Veterinarian/RegisterTreatment';
import ViewReports from '../pages/Veterinarian/ViewReports';
import SickAnimals from '../pages/Veterinarian/SickAnimals';






const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/director/dashboard" element={<DirectorDashboard />} />
      <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
      <Route path="/rejestrator/dashboard" element={<RegistrarDashboard />} />
      <Route path="/veterinarian/dashboard" element={<VeterinarianDashboard />} />

      <Route path="/rejestrator/add-animal" element={<AddAnimal />} />
      <Route path="/rejestrator/edit-animal" element={<EditAnimal />} />
      <Route path="/rejestrator/add-caretaker" element={<AddCaretaker />} />
      <Route path="/rejestrator/edit-enclosure" element={<EditEnclosure />} />

      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/dictionary-management" element={<DictionaryManagement />} />
      <Route path="/admin/manage-users/add" element={<AddUser />} />
      <Route path="/admin/manage-users/delete" element={<DeleteUser />} />
      <Route path="/admin/manage-users/edit" element={<EditUser />} />
      <Route path="/admin/manage-users/view" element={<ViewUsers />} />
      <Route path="/admin/add-animal-species" element={<AddAnimalSpecies />} />
      <Route path="/admin/add-food-type" element={<AddFoodType />} />
      <Route path="/admin/add-enclosure-type" element={<AddEnclosureType />} />



      <Route path="/director/reports" element={<ReportsOverview />} />
      <Route path="/director/buy-animal" element={<BuyAnimal />} />
      <Route path="/director/reports/employees" element={<EmployeesReport />} />
      <Route path="/director/reports/enclosures" element={<EnclosuresReport />} />
      <Route path="/director/reports/assignments" element={<AssignmentsReport />} />
      <Route path="/director/reports/sick-animals" element={<SickAnimalsReport />} />
      
      <Route path="/caregiver/update-animal" element={<AnimalUpdate />} />
      <Route path="/caregiver/update-feeding" element={<FeedingUpdate />} />

      <Route path="/veterinarian/register-treatment" element={<RegisterTreatment />} />
      <Route path="/veterinarian/reports" element={<ViewReports />} />
      <Route path="/veterinarian/sick-animals" element={<SickAnimals />} />






    </Routes>
  );
};

export default AppRouter;
