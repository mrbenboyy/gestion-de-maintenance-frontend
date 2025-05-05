import React from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const userExample = {
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold">Utilisateurs</h2>
          <button
            onClick={() => navigate("/add-user")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Ajouter utilisateur
          </button>
        </div>

        {/* Barre de recherche + filtre */}
        <div className="flex items-center gap-4 px-6 mb-4">
          <input
            type="text"
            placeholder="Chercher utilisateur"
            className="border rounded px-4 py-2 w-full max-w-md"
          />
        </div>

        {/* Grille des utilisateurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-10">
          <UserCard user={userExample} />
          {/* Map ici pour afficher tous les utilisateurs */}
        </div>
      </div>
    </div>
  );
};

export default Users;
