import "./App.css";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import ClientLogin from "./components/ClientLogin";
import ClientDashboard from "./components/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResponsableDashboard from "./components/ResponsableDashboard";
import AssistanteDashboard from "./components/AssistanteDashboard";
import TechnicienDashboard from "./components/TechnicienDashboard";
import Unauthorized from "./components/Unauthorized";
import Dashboard from "./pages/Dashboard";
import Users from "./components/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ClientsPage from "./components/ClientsPage";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";
import ClientDetails from "./components/ClientDetails";
import SitesList from "./components/SitesList";
import AddSite from "./pages/AddSite";
import EditSite from "./pages/EditSite";
import Stock from "./components/Stock";
import FamillesPage from "./pages/FamillesPage";
import ArticlesPage from "./pages/ArticlesPage";
import AppareilsPage from "./pages/AppareilsPage";
import AddFamille from "./pages/AddFamille";
import AddArticle from "./pages/AddArticle";
import AddAppareil from "./pages/AddAppareil";

function App() {
  return (
    <div className="App ml-64">
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLogin />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/edit-client/:id" element={<EditClient />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/sites" element={<SitesList />} />
          <Route path="/sites/ajouter" element={<AddSite />} />
          <Route path="/sites/edit/:id" element={<EditSite />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/familles" element={<FamillesPage />} />
          <Route path="/stock/articles" element={<ArticlesPage />} />
          <Route path="/stock/appareils" element={<AppareilsPage />} />
          <Route path="/stock/familles/ajouter" element={<AddFamille />} />
          <Route path="/stock/articles/ajouter" element={<AddArticle />} />
          <Route path="/stock/appareils/ajouter" element={<AddAppareil />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["technicien"]} />}>
          <Route path="/technicien" element={<TechnicienDashboard />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["responsable_planning"]} />}
        >
          <Route
            path="/responsable_planning"
            element={<ResponsableDashboard />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["assistante"]} />}>
          <Route path="/assistante" element={<AssistanteDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route path="/client" element={<ClientDashboard />} />
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
