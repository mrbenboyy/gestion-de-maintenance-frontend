import React from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />
        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold mb-6">Détails</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo + infos */}
            <div className="bg-white rounded-xl shadow p-6 w-full md:w-1/2 lg:w-1/3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="user"
                className="w-40 h-40 object-cover rounded-xl mb-4 mx-auto"
              />
              <div className="space-y-1">
                <p>
                  <strong>Nom:</strong> Jason Price
                </p>
                <p>
                  <strong>Adresse email:</strong> janick_parisian@yahoo.com
                </p>
                <p>
                  <strong>Téléphone:</strong> 06 55 82 02 70
                </p>
                <p>
                  <strong>Région:</strong> Casablanca
                </p>
                <p>
                  <strong>Dépôt:</strong> XXXX
                </p>
              </div>

              <div className="flex gap-2 mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                  Modifier
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">
                  Supprimer
                </button>
              </div>
            </div>

            {/* Stats + activités */}
            <div className="flex-1 space-y-6">
              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-500 text-white text-center p-4 rounded-lg">
                  <p className="text-2xl font-bold">150</p>
                  <p className="text-sm">Nombre total d'interventions</p>
                </div>
                <div className="bg-blue-500 text-white text-center p-4 rounded-lg">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm">Interventions en cours</p>
                </div>
                <div className="bg-orange-500 text-white text-center p-4 rounded-lg">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm">Intervention planifiée</p>
                </div>
              </div>

              {/* Interventions récentes */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Interventions récentes</h3>
                  <button
                    onClick={() => navigate("/techniciens/id/interventions")}
                    className="text-sm text-red-500"
                  >
                    Voir tous
                  </button>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    Intervention chez Site X
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    Intervention chez Site Y
                  </li>
                </ul>
              </div>

              {/* Bons de commande */}
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Bons de commandes</h3>
                  <button className="text-sm text-red-500">Voir tous</button>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    Bon de commande #BC142 approuvé
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                    Bon de commande #BC152 en cours de traitement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
