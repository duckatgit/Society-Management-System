import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./componets/layout/AdminLayout";

import Login from "./Pages/Auth/Login";
import Forget from "./Pages/Auth/Forget";
import Reset from "./Pages/Auth/Reset";

import SuperAdminDashboard from "./Pages/SuperAdmin/Dashboard/SuperAdminDashboard";
import SuperAdminResident from "./Pages/SuperAdmin/Resident/SuperAdminResident";
import AddResident from "./Pages/SuperAdmin/Resident/AddResident";
import ResidentSuccess from "./Pages/SuperAdmin/Resident/ResidentSucces";

import SuperAdminSociety from "./Pages/SuperAdmin/Society/SuperAdminSociety";

import Successfull from "./Pages/SuperAdmin/Society/Successfull";

import { SuperAdminRevenue } from "./Pages/SuperAdmin/Revenue/SuperAdminRevenue";
import { SuperAdminComplain } from "./Pages/SuperAdmin/Comaplaints/SuperAdminComplaint";
import { SuperAdminSetting } from "./Pages/SuperAdmin/Settings/SuperAdminSetting";

import { Announcement } from "./Pages/SuperAdmin/Announcement/Announcement";
import CreateAnnouncement from "./Pages/SuperAdmin/Announcement/CreateAnnouncement";
import AnnouncementSuccess from "./Pages/SuperAdmin/Announcement/AnnouncementSuccess";

import { SocietyDasboard } from "./Pages/SocietyAdmin/Dashboard/SocietyDasboard";

import ProtectedRoute from "./componets/layout/ProtectedRoute";
import { SocietyBuilding } from "./Pages/SocietyAdmin/Building/SocietyBuilding";
import { CreateBuilding } from "./Pages/SocietyAdmin/Building/CreateBuilding";
import { SuperAdminBuilding } from "./Pages/SuperAdmin/Buildings/SuperAdminBuilding";
import CreateSociety from "./Pages/SuperAdmin/Society/CreateSociety";
import { BuildingCreate } from "./Pages/SuperAdmin/Buildings/BuildingCreate";
import { BuildingSuccessfully } from "./Pages/SuperAdmin/Buildings/BuildingSuccessfully";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/super-admin/forget" element={<Forget />} />
        <Route path="/society-admin/forget" element={<Forget />} />
        <Route path="/super-admin/reset/:token" element={<Reset />} />
        <Route path="/society-admin/reset/:token" element={<Reset />} />

        <Route element={<ProtectedRoute allowedRole="super_admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/super-admin/dash" element={<SuperAdminDashboard />} />
            <Route
              path="/super-admin/Societies"
              element={<SuperAdminSociety />}
            />
            <Route
              path="/super-admin/Societies/Create"
              element={<CreateSociety />}
            />
            <Route
              path="/super-admin/Societies/Create/Successfully"
              element={<Successfull />}
            />
            <Route
              path="/super-admin/Buildings"
              element={<SuperAdminBuilding />}
            />
            <Route
              path="/super-admin/buildings/create"
              element={<BuildingCreate />}
            />
            <Route
              path="/super-admin/buildings/Create/Successfully"
              element={<BuildingSuccessfully />}
            />

            <Route
              path="/super-admin/Residents"
              element={<SuperAdminResident />}
            />
            <Route
              path="/super-admin/Residents/Add"
              element={<AddResident />}
            />
            <Route
              path="/super-admin/Residents/Success"
              element={<ResidentSuccess />}
            />
            <Route
              path="/super-admin/Revenue"
              element={<SuperAdminRevenue />}
            />
            <Route
              path="/super-admin/Complaints"
              element={<SuperAdminComplain />}
            />
            <Route
              path="/super-admin/Settings"
              element={<SuperAdminSetting />}
            />
            <Route
              path="/super-admin/Announcement"
              element={<Announcement />}
            />
            <Route
              path="/super-admin/Announcement/Create"
              element={<CreateAnnouncement />}
            />
            <Route
              path="/super-admin/Announcement/create-success"
              element={<AnnouncementSuccess />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="society_admin" />}>
          <Route element={<AdminLayout />}>
            <Route path="/society-admin/dash" element={<SocietyDasboard />} />
            <Route
              path="/society-admin/buildings"
              element={<SocietyBuilding />}
            />
            <Route
              path="/society-admin/buildings/create"
              element={<CreateBuilding />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
