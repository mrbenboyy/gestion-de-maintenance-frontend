// Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p className="text-gray-600 mb-4">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette
          page
        </p>
        <Link to="/login" className="text-red-600 hover:underline font-medium">
          Retour à la page de connexion
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
