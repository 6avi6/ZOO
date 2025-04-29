//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../pages/login/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import DirectorDashboard from '../pages/director/dashboard/DirectorDashboard';
import CaregiverDashboard from '../pages/caregiver/dashboard/CaregiverDashboard';
import RegistrarDashboard from '../pages/registrar/dashboard/RegistrarDashboard';
import VeterinarianDashboard from '../pages/veterinarian/dashboard/VeterinarianDashboard';

import AddAnimal from '../pages/registrar/AddAnimal';
import EditAnimal from '../pages/registrar/EditAnimal';
import AddCaretaker from '../pages/registrar/AddCaretaker';
import EditEnclosure from '../pages/registrar/EditEnclosure';

import ManageUsers from '../pages/admin/manage-users/ManageUsers';
import ManageDictionary from '../pages/admin/manage-dictionary/ManageDictionary';
import AddUser from '../pages/admin/manage-users/AddUser';
import DeleteUser from '../pages/admin/manage-users/DeleteUser';
import EditUser from '../pages/admin/manage-users/EditUser';
import ViewUsers from '../pages/admin/manage-users/ViewUsers';
import AddAnimalSpecies from '../pages/admin/manage-dictionary/AddAnimalSpecies';
import AddFoodType from '../pages/admin/manage-dictionary/AddFoodType';
import AddEnclosureType from '../pages/admin/manage-dictionary/AddEnclosureType';


import ReportsOverview from '../pages/director/ReportsOverview';
import BuyAnimal from '../pages/director/BuyAnimal';
import EmployeesReport from '../pages/director/EmployeesReport';
import EnclosuresReport from '../pages/director/EnclosuresReport';
import AssignmentsReport from '../pages/director/AssignmentsReport';
import SickAnimalsReport from '../pages/director/SickAnimalsReport';

import AnimalUpdate from '../pages/caregiver/AnimalUpdate';
import FeedingUpdate from '../pages/caregiver/FeedingUpdate';

import RegisterTreatment from '../pages/veterinarian/RegisterTreatment';
import ViewReports from '../pages/veterinarian/ViewReports';
import SickAnimals from '../pages/veterinarian/SickAnimals';
import PrivateRoute from "./PrivateRoute";






const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<PrivateRoute requiredRole="REGISTRAR" />}>
            <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
            <Route path="/registrar/add-animal" element={<AddAnimal />} />
            <Route path="/registrar/edit-animal" element={<EditAnimal />} />
            <Route path="/registrar/add-caretaker" element={<AddCaretaker />} />
            <Route path="/registrar/edit-enclosure" element={<EditEnclosure />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-dictionary" element={<ManageDictionary />} />
            <Route path="/admin/manage-users/add" element={<AddUser />} />
            <Route path="/admin/manage-users/delete" element={<DeleteUser />} />
            <Route path="/admin/manage-users/edit" element={<EditUser />} />
            <Route path="/admin/manage-users/view" element={<ViewUsers />} />
            <Route path="/admin/add-animal-species" element={<AddAnimalSpecies />} />
            <Route path="/admin/add-food-type" element={<AddFoodType />} />
            <Route path="/admin/add-enclosure-type" element={<AddEnclosureType />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="DIRECTOR" />}>
            <Route path="/director/dashboard" element={<DirectorDashboard />} />
            <Route path="/director/reports" element={<ReportsOverview />} />
            <Route path="/director/buy-animal" element={<BuyAnimal />} />
            <Route path="/director/reports/employees" element={<EmployeesReport />} />
            <Route path="/director/reports/enclosures" element={<EnclosuresReport />} />
            <Route path="/director/reports/assignments" element={<AssignmentsReport />} />
            <Route path="/director/reports/sick-animals" element={<SickAnimalsReport />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="CAREGIVER" />}>
            <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
            <Route path="/caregiver/update-animal" element={<AnimalUpdate />} />
            <Route path="/caregiver/update-feeding" element={<FeedingUpdate />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="VETERINARIAN" />}>
            <Route path="/veterinarian/dashboard" element={<VeterinarianDashboard />} />
            <Route path="/veterinarian/register-treatment" element={<RegisterTreatment />} />
            <Route path="/veterinarian/reports" element={<ViewReports />} />
            <Route path="/veterinarian/sick-animals" element={<SickAnimals />} />
        </Route>
    </Routes>
  );
};

export default AppRouter;
