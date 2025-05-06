import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Filter, ArrowLeft, ArrowRight } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/SideBar";

const SitesList = () => {
  const [sites] = useState([
    {
      id: 1,
      name: "Station Casa",
      client: "Total Energies",
      type: "Agence",
      annualVisits: 2,
      imageUrl: "/lovable-uploads/dbb8833c-1ca0-4730-82e4-89cb1f8642a3.png",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Sites</h1>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
                Ajouter site
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm">Filtrer par:</span>
              </div>

              <select className="w-40 border rounded-md px-3 py-2 text-sm">
                <option>Clients</option>
                <option value="total">Total Energies</option>
                <option value="shell">Shell</option>
              </select>

              <select className="w-40 border rounded-md px-3 py-2 text-sm">
                <option>Type</option>
                <option value="agence">Agence</option>
                <option value="bureau">Bureau</option>
              </select>

              <input
                placeholder="Chercher site"
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="w-24 pb-3">Image</th>
                    <th className="pb-3">Nom</th>
                    <th className="pb-3">Client associé</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Visites annuelles</th>
                    <th className="text-right pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site) => (
                    <tr key={site.id} className="border-t border-gray-200">
                      <td className="py-4">
                        <div className="w-12 h-12 overflow-hidden">
                          <img
                            src={site.imageUrl}
                            alt={site.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td>{site.name}</td>
                      <td>{site.client}</td>
                      <td>{site.type}</td>
                      <td>{site.annualVisits}</td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 rounded-md border hover:bg-gray-100">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 rounded-md border hover:bg-gray-100 text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <div>Showing 1-1 of 1</div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md border hover:bg-gray-100">
                  <ArrowLeft size={16} />
                </button>
                <button className="p-2 rounded-md border hover:bg-gray-100">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SitesList;
