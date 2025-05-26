import React from "react";
import { ArrowLeft, Bell, Pencil, Trash2 } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

const InterventionDetail = () => {
  // Données statiques pour la démo
  const intervention = {
    id: "INT-2023-45",
    technicien: {
      nom: "John Doe",
      email: "john_doe@gmail.com",
    },
    site: {
      nom: "Station casa",
      type: "Total",
    },
    date: "12 Nov 2023",
    status: "en cours",
    typeVisite: "2ème visite",
  };

  const handleBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <button
            onClick={handleBack}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-medium">Détails intervention</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
            {/* Section Technicien */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Technicien en charge :
              </h3>
              <p className="font-medium">{intervention.technicien.nom}</p>
              <p className="text-sm text-gray-600">
                {intervention.technicien.email}
              </p>
            </div>

            {/* Section Site */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Site concerné :</h3>
              <p className="font-medium">{intervention.site.nom}</p>
              <p className="text-sm text-gray-600">{intervention.site.type}</p>
            </div>

            {/* Section Date */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Date de l'intervention :
              </h3>
              <p className="font-medium">{intervention.date}</p>
            </div>

            {/* Type de visite */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Type de visite :</h3>
              <p className="font-medium">{intervention.typeVisite}</p>
            </div>

            {/* Statut */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Statut :</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600 border border-orange-200">
                {intervention.status}
              </span>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t my-6" />

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1">
              <Bell className="w-4 h-4" />
              Notifier le technicien
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex-1">
              <Pencil className="w-4 h-4" />
              Modifier
            </button>

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-1">
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionDetail;
