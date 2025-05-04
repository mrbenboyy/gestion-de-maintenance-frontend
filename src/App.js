import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ClientLogin from "./components/ClientLogin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
