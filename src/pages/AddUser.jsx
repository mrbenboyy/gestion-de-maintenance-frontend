import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // si tu utilises React Router

const AddUser = () => {
  const navigate = useNavigate(); // pour redirection
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 ici tu envoies les données à ton backend
    console.log(form);
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          {/* Retour */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Ajouter nouveau utilisateur
          </button>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto"
          >
            {/* Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                <FiCamera />
              </div>
              <span className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                Upload Photo
              </span>
            </div>

            {/* Champs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Tapez le nom"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Address email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Tapez l’adresse mail"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Tapez le mot de passe"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Numéro téléphone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Tapez le numéro de téléphone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Position</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="Admin">Admin</option>
                  <option value="Responsable planning">
                    Responsable planning
                  </option>
                  <option value="Technicien">Technicien</option>
                  <option value="Assistant">Assistant</option>
                </select>
              </div>
            </div>

            {/* Bouton */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
