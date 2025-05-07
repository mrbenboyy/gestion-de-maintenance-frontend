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
import EditFamille from "./pages/EditFamille";
import EditArticle from "./pages/EditArticle";
import EditAppareil from "./pages/EditAppareil";
import Layout from "./components/Layout";
import PlanifierIntervention from "./components/PlannifierIntervention";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLogin />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/admin"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/add-user"
            element={
              <Layout>
                <AddUser />
              </Layout>
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              <Layout>
                <EditUser />
              </Layout>
            }
          />
          <Route
            path="/clients"
            element={
              <Layout>
                <ClientsPage />
              </Layout>
            }
          />
          <Route
            path="/add-client"
            element={
              <Layout>
                <AddClient />
              </Layout>
            }
          />
          <Route
            path="/edit-client/:id"
            element={
              <Layout>
                <EditClient />
              </Layout>
            }
          />
          <Route
            path="/clients/:id"
            element={
              <Layout>
                <ClientDetails />
              </Layout>
            }
          />
          <Route
            path="/sites"
            element={
              <Layout>
                <SitesList />
              </Layout>
            }
          />
          <Route
            path="/sites/ajouter"
            element={
              <Layout>
                <AddSite />
              </Layout>
            }
          />
          <Route
            path="/sites/edit/:id"
            element={
              <Layout>
                <EditSite />
              </Layout>
            }
          />
          <Route
            path="/stock"
            element={
              <Layout>
                <Stock />
              </Layout>
            }
          />
          <Route
            path="/stock/familles"
            element={
              <Layout>
                <FamillesPage />
              </Layout>
            }
          />
          <Route
            path="/stock/articles"
            element={
              <Layout>
                <ArticlesPage />
              </Layout>
            }
          />
          <Route
            path="/stock/appareils"
            element={
              <Layout>
                <AppareilsPage />
              </Layout>
            }
          />
          <Route
            path="/stock/familles/ajouter"
            element={
              <Layout>
                <AddFamille />
              </Layout>
            }
          />
          <Route
            path="/stock/articles/ajouter"
            element={
              <Layout>
                <AddArticle />
              </Layout>
            }
          />
          <Route
            path="/stock/appareils/ajouter"
            element={
              <Layout>
                <AddAppareil />
              </Layout>
            }
          />
          <Route
            path="/stock/familles/:id/modifier"
            element={
              <Layout>
                <EditFamille />
              </Layout>
            }
          />
          <Route
            path="/stock/articles/:code/modifier"
            element={
              <Layout>
                <EditArticle />
              </Layout>
            }
          />
          <Route
            path="/stock/appareils/:id/modifier"
            element={
              <Layout>
                <EditAppareil />
              </Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["technicien"]} />}>
          <Route
            path="/technicien"
            element={
              <Layout>
                <TechnicienDashboard />
              </Layout>
            }
          />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["responsable_planning"]} />}
        >
          <Route
            path="/responsable_planning"
            element={
              <Layout>
                <ResponsableDashboard />
              </Layout>
            }
          />
          <Route
            path="/planifier-intervention"
            element={
              <Layout>
                <PlanifierIntervention />
              </Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["assistante"]} />}>
          <Route
            path="/assistante"
            element={
              <Layout>
                <AssistanteDashboard />
              </Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route
            path="/client"
            element={
              <Layout>
                <ClientDashboard />
              </Layout>
            }
          />
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
