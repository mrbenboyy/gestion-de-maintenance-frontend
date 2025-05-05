import "./App.css";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import ClientLogin from "./components/ClientLogin";
import AdminDashboard from "./components/AdminDashboard";
import ClientDashboard from "./components/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResponsableDashboard from "./components/ResponsableDashboard";
import AssistanteDashboard from "./components/AssistanteDashboard";
import TechnicienDashboard from "./components/TechnicienDashboard";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/client-login" element={<ClientLogin />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
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
