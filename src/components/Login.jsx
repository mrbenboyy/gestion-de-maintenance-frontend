import React from "react";
import Extincteur from "../images/extincteur.png";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">
        Gestion de maintenance
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-2">
          Se connecter à votre compte
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Veuillez entrer votre email et votre mot de passe pour continuer
        </p>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Adresse email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Connexion
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <img src={Extincteur} alt="Extincteur" className="h-24" />
        </div>
      </div>
    </div>
  );
};

export default Login;
