import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Filter, ArrowLeft, ArrowRight } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";

const SitesList = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await api.get("/sites");
        setSites(response.data);
      } catch (err) {
        console.error("Erreur récupération sites:", err);
      }
    };
    fetchSites();
  }, []);

  const handleDeleteSite = async () => {
    try {
      await api.delete(`/sites/${selectedSiteId}`);
      setSites(sites.filter((site) => site.id !== selectedSiteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteSite}
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer ce site ? Cette action est irréversible."
        />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Sites</h1>
              <button
                onClick={() => navigate("/sites/ajouter")}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
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
                          {site.client_image ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}${site.client_image}`}
                              alt={site.client_nom}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                              Aucune image
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{site.nom}</td>
                      <td>{site.client_nom}</td>
                      <td>{site.type_site}</td>
                      <td>{site.nombre_visites_annuelles}</td>
                      <td className="text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 rounded-md border hover:bg-gray-100">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSiteId(site.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 rounded-md border hover:bg-gray-100 text-red-500"
                          >
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
