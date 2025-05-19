import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import {
  ChevronDown,
  Filter,
  X,
  Eye,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const InterventionTracking = () => {
  // Données mockées
  const interventions = [
    {
      id: "00001",
      site: "Christine Brooks",
      address: "089 Kutch Green Apt. 446",
      date: "14 Feb 2019",
      status: "Terminée",
    },
    {
      id: "00002",
      site: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 520",
      date: "14 Feb 2019",
      status: "En cours",
    },
    {
      id: "00003",
      site: "Darnell Caldwell",
      address: "8587 Frida Ports",
      date: "14 Feb 2019",
      status: "Reportée",
    },
    {
      id: "00004",
      site: "Gilbert Johnston",
      address: "786 Destini Lake Suite 800",
      date: "14 Feb 2019",
      status: "Planifiée",
    },
  ];

  // Handlers
  const handleReset = () => console.log("Resetting filters");
  const handleView = (id) => console.log(`Viewing ${id}`);
  const handleDelete = (id) => console.log(`Deleting ${id}`);
  const handlePrev = () => console.log("Previous page");
  const handleNext = () => console.log("Next page");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">Suivi des interventions</h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-500" />
            <span className="text-sm font-medium">Filtrer par</span>
          </div>

          <div className="flex gap-2">
            <button className="h-9 px-3 text-sm border border-gray-300 bg-white rounded-md flex items-center">
              14 Feb 2019
              <ChevronDown size={16} className="ml-2" />
            </button>

            <button className="h-9 px-3 text-sm border border-gray-300 bg-white rounded-md flex items-center">
              Client
              <ChevronDown size={16} className="ml-2" />
            </button>

            <button className="h-9 px-3 text-sm border border-gray-300 bg-white rounded-md flex items-center">
              Statut
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className="text-red-500 flex items-center h-9 px-2 rounded-md hover:bg-gray-100"
          >
            <X size={16} className="mr-1" />
            Réinitialiser
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md overflow-hidden border">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Site
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Adresse
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Statut
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {interventions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-500">{item.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {item.site}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {item.address}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "Terminée"
                          ? "bg-teal-100 text-teal-800"
                          : item.status === "En cours"
                          ? "bg-purple-100 text-purple-800"
                          : item.status === "Reportée"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(item.id)}
                        className="text-red-500 flex items-center h-8 px-2 rounded-md hover:bg-gray-100"
                      >
                        <Eye size={16} className="mr-1" />
                        Voir
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 flex items-center h-8 px-2 rounded-md hover:bg-gray-100"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200">
            <button
              onClick={handlePrev}
              className="flex items-center text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft size={16} className="mr-1" />
              Date précédente
            </button>
            <button
              onClick={handleNext}
              className="flex items-center text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Date suivante
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionTracking;
