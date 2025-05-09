// FicheVerification.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import { Plus, Trash2 } from "lucide-react";

const FicheVerification = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Fiche de vérification
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <VerificationHeader />

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Détails des équipements contrôlés
            </h2>
            <EquipmentTable />
          </div>

          <div className="mt-8 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Matériel utilisé lors de l'intervention
            </h2>
            <MaterialTable />
          </div>

          <div className="flex justify-center">
            <button className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Soumettre la fiche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerificationHeader = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Technicien en charge
          </label>
          <p className="font-medium text-gray-900">John Doe</p>
          <p className="text-sm text-gray-500">john_doe@gmail.com</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Site concerné
          </label>
          <p className="font-medium text-gray-900">Station Casa</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Date de l'intervention
          </label>
          <p className="font-medium text-gray-900">12 Nov 2025</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Statut
          </label>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
            En cours
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Type de visite
          </label>
          <p className="font-medium text-gray-900">2ème visite</p>
        </div>
      </div>
    </div>
  );
};

const EquipmentTable = () => {
  const [equipments] = useState([
    {
      id: "SN-2025-001",
      name: "Extincteur CO2 6kg",
      quantity: 2,
      observation: "Bon état",
      hasObservation: true,
    },
    {
      id: "SN-2025-002",
      name: "Extincteur CO2 9kg",
      quantity: null,
      observation: "",
      hasObservation: false,
    },
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase border-b">
            <th className="pb-3 px-4">N° série</th>
            <th className="pb-3 px-4">Appareil vérifié</th>
            <th className="pb-3 px-4">Quantité</th>
            <th className="pb-3 px-4">Observation</th>
            <th className="pb-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id} className="border-b">
              <td className="py-4 px-4 text-sm">{equipment.id}</td>
              <td className="py-4 px-4 text-sm">{equipment.name}</td>
              <td className="py-4 px-4">
                {equipment.quantity || (
                  <input
                    type="number"
                    className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Quantité"
                  />
                )}
              </td>
              <td className="py-4 px-4">
                {equipment.hasObservation ? (
                  <span className="text-sm">{equipment.observation}</span>
                ) : (
                  <input
                    className="w-36 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Observation"
                  />
                )}
              </td>
              <td className="py-4 px-4">
                <button className="p-1 hover:bg-gray-100 rounded">
                  {equipment.hasObservation ? (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  ) : (
                    <Plus className="h-4 w-4 text-green-500" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MaterialTable = () => {
  const [materials] = useState([
    {
      code: "ART-101",
      designation: "Joint",
      quantity: 3,
      hasQuantity: true,
    },
    {
      code: "ART-201",
      designation: "Gaz CO2",
      quantity: null,
      hasQuantity: false,
    },
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase border-b">
            <th className="pb-3 px-4">Code article</th>
            <th className="pb-3 px-4">Désignation</th>
            <th className="pb-3 px-4">Quantité utilisée</th>
            <th className="pb-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.code} className="border-b">
              <td className="py-4 px-4 text-sm">{material.code}</td>
              <td className="py-4 px-4 text-sm">{material.designation}</td>
              <td className="py-4 px-4">
                {material.hasQuantity ? (
                  <span className="text-sm">{material.quantity}</span>
                ) : (
                  <input
                    type="number"
                    className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Quantité"
                  />
                )}
              </td>
              <td className="py-4 px-4">
                <button className="p-1 hover:bg-gray-100 rounded">
                  {material.hasQuantity ? (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  ) : (
                    <Plus className="h-4 w-4 text-green-500" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FicheVerification;
