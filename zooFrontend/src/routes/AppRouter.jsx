//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import DyrektorDashboard from '../pages/Dashboard/DyrektorDashboard';
import OpiekunDashboard from '../pages/Dashboard/OpiekunDashboard';
import RejestratorDashboard from '../pages/Dashboard/RejestratorDashboard';
import WeterynarzDashboard from '../pages/Dashboard/WeterynarzDashboard';

import AddAnimal from '../pages/Rejestrator/AddAnimal';
import EditAnimal from '../pages/Rejestrator/EditAnimal';
import AddCaretaker from '../pages/Rejestrator/AddCaretaker';
import EditEnclosure from '../pages/Rejestrator/EditEnclosure';

import ManageUsers from '../pages/Admin/ManageUsers';
import DictionaryManagement from '../pages/Admin/DictionaryManagement';
import AddUser from '../pages/Admin/AddUser';
import DeleteUser from '../pages/Admin/DeleteUser';
import EditUser from '../pages/Admin/EditUser';
import ViewUsers from '../pages/Admin/ViewUsers';
import AddAnimalSpecies from '../pages/Admin/AddAnimalSpecies';
import AddFoodType from '../pages/Admin/AddFoodType';
import AddEnclosureType from '../pages/Admin/AddEnclosureType';


import ReportsOverview from '../pages/Dyrektor/ReportsOverview';
import BuyAnimal from '../pages/Dyrektor/BuyAnimal';
import EmployeesReport from '../pages/Dyrektor/EmployeesReport';
import EnclosuresReport from '../pages/Dyrektor/EnclosuresReport';
import AssignmentsReport from '../pages/Dyrektor/AssignmentsReport';
import SickAnimalsReport from '../pages/Dyrektor/SickAnimalsReport';

import AnimalUpdate from '../pages/Opiekun/AnimalUpdate';
import FeedingUpdate from '../pages/Opiekun/FeedingUpdate';

import RegisterTreatment from '../pages/Weterynarz/RegisterTreatment';
import ViewReports from '../pages/Weterynarz/ViewReports';
import SickAnimals from '../pages/Weterynarz/SickAnimals';






const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/dyrektor/dashboard" element={<DyrektorDashboard />} />
      <Route path="/opiekun/dashboard" element={<OpiekunDashboard />} />
      <Route path="/rejestrator/dashboard" element={<RejestratorDashboard />} />
      <Route path="/weterynarz/dashboard" element={<WeterynarzDashboard />} />

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



      <Route path="/dyrektor/reports" element={<ReportsOverview />} />
      <Route path="/dyrektor/buy-animal" element={<BuyAnimal />} />
      <Route path="/dyrektor/reports/employees" element={<EmployeesReport />} />
      <Route path="/dyrektor/reports/enclosures" element={<EnclosuresReport />} />
      <Route path="/dyrektor/reports/assignments" element={<AssignmentsReport />} />
      <Route path="/dyrektor/reports/sick-animals" element={<SickAnimalsReport />} />
      
      <Route path="/opiekun/update-animal" element={<AnimalUpdate />} />
      <Route path="/opiekun/update-feeding" element={<FeedingUpdate />} />

      <Route path="/weterynarz/register-treatment" element={<RegisterTreatment />} />
      <Route path="/weterynarz/reports" element={<ViewReports />} />
      <Route path="/weterynarz/sick-animals" element={<SickAnimals />} />






    </Routes>
  );
};

export default AppRouter;
