import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientBadge from "../images/shield.png";
import { loginClient } from "../services/authService";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginClient(email, password);
      localStorage.setItem("token", token); // Stocker SEULEMENT le token
      navigate("/client");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">
        Espace Client
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={ClientBadge}
            alt="Badge client"
            className="h-20 w-20 object-contain animate-pulse"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Accès sécurisé clients
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email professionnel
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@votreentreprise.com"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Code d'accès
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200 shadow-lg"
          >
            Accéder à mon espace
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            <Link
              to="/login"
              className="text-red-600 hover:underline font-medium"
            >
              Vous êtes un employé ?
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            Besoin d'aide ?{" "}
            <Link to="/support" className="text-red-500 hover:underline">
              Contactez notre support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
