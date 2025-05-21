//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
/*import Home from '../Home';*/
import Login from '../pages/login/Login';


import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import DirectorDashboard from '../pages/director/dashboard/DirectorDashboard';
import CaregiverDashboard from '../pages/caregiver/dashboard/CaregiverDashboard';
import RegistrarDashboard from '../pages/registrar/dashboard/RegistrarDashboard';
import VeterinarianDashboard from '../pages/veterinarian/dashboard/VeterinarianDashboard';

import EditAnimal from '../pages/registrar/EditAnimal';
import EditCaretaker from '../pages/registrar/EditCaretaker';
import EditEnclosure from '../pages/registrar/EditEnclosure';

import ManageUsers from '../pages/admin/manage-users/ManageUsers';
import ManageDictionary from '../pages/admin/manage-dictionary/ManageDictionary';
import AddUser from '../pages/admin/manage-users/AddUser';
import EditUser from '../pages/admin/manage-users/EditUser';
import UserDetails from '../pages/admin/manage-users/UserDetails';
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
import AdminAccount from "../pages/admin/account/AdminAccount";
import HomeRedirect from "./HomeRedirect";






const AppRouter = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeRedirect />} />

        <Route element={<PrivateRoute requiredRole="REGISTRAR" />}>
            <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
            <Route path="/registrar/edit-animal" element={<EditAnimal />} />
            <Route path="/registrar/edit-caretaker" element={<EditCaretaker />} />
            <Route path="/registrar/edit-enclosure" element={<EditEnclosure />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/account" element={<AdminAccount />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-dictionary" element={<ManageDictionary />} />
            <Route path="/admin/manage-users/add" element={<AddUser />} />
            <Route path="/admin/manage-users/edit/:id" element={<EditUser />} />
            <Route path="/admin/manage-users/:id" element={<UserDetails />} />
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
