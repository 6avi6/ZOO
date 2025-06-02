//logika ktora po zalogowaniu porzekieruje uzytkownika do odpowiedniego dashboardu 
import { Routes, Route } from 'react-router-dom';
/*import Home from '../Home';*/
import Login from '../pages/login/Login';


import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import DirectorDashboard from '../pages/director/dashboard/DirectorDashboard';
import CaregiverDashboard from '../pages/caregiver/dashboard/CaregiverDashboard';
import VeterinarianDashboard from '../pages/veterinarian/dashboard/VeterinarianDashboard';

//Registrar
import RegistrarDashboard from '../pages/registrar/dashboard/RegistrarDashboard';
import EditAnimal from '../pages/registrar/animalRegistration/EditAnimal';
import AnimalDetailsRegistrar from '../pages/registrar/animalRegistration/AnimalDetails';
import EditCaretaker from '../pages/registrar/caretakerManagment/EditCaretaker';
import EditEnclosure from '../pages/registrar/enclosureManagment/EditEnclosure';
import WorkSchedule  from '../pages/registrar/workHours/WorkSchedule';
import UserSchedule from '../pages/registrar/workHours/UserSchedule';
import EditFoodTypes from '../pages/registrar/foodTypesManagment/EditFoodTypes';
import EditSymptomsTypes from '../pages/registrar/symptomsTypesManagment/EditSymptomsTypes';

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
import AnimalsCaregiversReport from '../pages/director/AnimalsCaregiversReport';
import SickAnimalsReport from '../pages/director/SickAnimalsReport';

//Caregiver
import CaregiverAnimals from '../pages/caregiver/caretakersAnimals/CaregiverAnimals';
import CaregiverFeedings from '../pages/caregiver/cagiverFeedings/CaregiverFeedings';
import CaregiverSchedule from '../pages/caregiver/cargiverSchedule/CaregiverSchedule';
import AnimalDetailsCaregiver     from '../pages/caregiver/caretakersAnimals/AnimalDetails';

import RegisterTreatment from '../pages/veterinarian/RegisterTreatment';
import ViewReports from '../pages/veterinarian/ViewReports';
import SickAnimals from '../pages/veterinarian/SickAnimals';
import PrivateRoute from "./PrivateRoute";
import HomeRedirect from "./HomeRedirect";


import UserAccount from '../pages/userAccount';




const AppRouter = () => {
  return (
    <Routes>
        {/*<Route path="/" element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/:role/account" element={<UserAccount />} />

        <Route element={<PrivateRoute requiredRole="REGISTRAR" />}>
            <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
            <Route path="/registrar/edit-animal" element={<EditAnimal />} />
            <Route path="/registrar/edit-caretaker" element={<EditCaretaker />} />
            <Route path="/registrar/edit-enclosure" element={<EditEnclosure />} />
            <Route path="/registrar/animals/:id" element={<AnimalDetailsRegistrar />} />
            <Route path="/registrar/work-schedule" element={<WorkSchedule />} />
            <Route path="/registrar/work-schedule/:id" element={<UserSchedule />} />
            <Route path="/registrar/edit-food-types" element={<EditFoodTypes />} />
            <Route path="/registrar/edit-symptom-types" element={<EditSymptomsTypes />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
            <Route path="/director/reports/assignments" element={<AnimalsCaregiversReport />} />
            <Route path="/director/reports/sick-animals" element={<SickAnimalsReport />} />
          

        </Route>

        <Route element={<PrivateRoute requiredRole="CAREGIVER" />}>
            <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
            <Route path="/caregiver/animals" element={<CaregiverAnimals />} />
            <Route path="/caregiver/feedings" element={<CaregiverFeedings />} />
            <Route path="/caregiver/schedule" element={<CaregiverSchedule />} />
            <Route path="/caregiver/animal/:id" element={<AnimalDetailsCaregiver/>} />
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
