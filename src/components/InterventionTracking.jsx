import React, { useState, useEffect } from "react";
import api from "../utils/api";
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
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    client: "",
  });

  // Handlers manquants
  const handleReset = () => {
    setFilters({ status: "", date: "", client: "" });
  };

  const handleView = (id) => {
    // Navigation vers la vue détaillée
    console.log(`/intervention/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/interventions/${id}`);
      setInterventions((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError("Échec de la suppression");
    }
  };

  const handlePrev = () => {
    // Implémenter la logique de pagination
    console.log("Previous page");
  };

  const handleNext = () => {
    // Implémenter la logique de pagination
    console.log("Next page");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.date) params.date = filters.date;
        if (filters.client) params.client = filters.client;

        const response = await api.get("/interventions", { params });
        setInterventions(response.data);
        setError("");
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const statusMap = {
    planifiee: "Planifiée",
    en_cours: "En cours",
    terminee: "Terminée",
    annulee: "Annulée",
    reportee: "Reportée",
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

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
                    {item.site_nom}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {item.site?.adresse || "Non renseignée"}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(item.date_planifiee).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "terminee"
                          ? "bg-teal-100 text-teal-800"
                          : item.status === "en_cours"
                          ? "bg-purple-100 text-purple-800"
                          : item.status === "reportee"
                          ? "bg-red-100 text-red-800"
                          : item.status === "annulee"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {statusMap[item.status]}
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
