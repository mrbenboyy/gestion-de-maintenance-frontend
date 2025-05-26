import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import api from "../utils/api";
import DashboardHeader from "../components/DashboardHeader";
import ConfirmationModal from "../components/ConfirmationModal";

const EditIntervention = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    date_planifiee: "",
    client_id: "",
    site_id: "",
    technicien_id: "",
    type_visite: "premiere",
    region_id: "",
    status: "planifiee",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          interventionResponse,
          clientsResponse,
          techniciensResponse,
          regionsResponse,
        ] = await Promise.all([
          api.get(`/interventions/${id}`),
          api.get("/clients"),
          api.get("/users/techniciens"),
          api.get("/regions"),
        ]);

        const intervention = interventionResponse.data;
        setOriginalData(intervention);

        // Charger les sites du client
        const sitesResponse = await api.get(
          `/sites/client/${intervention.client_id}`
        );
        setSites(sitesResponse.data);

        // Mettre à jour le state
        setFormData({
          date_planifiee: intervention.date_planifiee.split("T")[0],
          client_id: intervention.client_id,
          site_id: intervention.site_id,
          technicien_id: intervention.technicien_id,
          type_visite: intervention.type_visite,
          region_id: intervention.region_id,
          status: intervention.status,
        });

        setClients(clientsResponse.data);
        setTechniciens(techniciensResponse.data);
        setRegions(regionsResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/interventions/${id}`, formData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleClientChange = async (clientId) => {
    try {
      const response = await api.get(`/sites/client/${clientId}`);
      setSites(response.data);
      setFormData((prev) => ({
        ...prev,
        client_id: clientId,
        site_id: "",
        region_id: "",
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des sites:", error);
    }
  };

  const handleSiteChange = async (siteId) => {
    try {
      const response = await api.get(`/sites/${siteId}`);
      setFormData((prev) => ({
        ...prev,
        site_id: siteId,
        region_id: response.data.region_id,
      }));
    } catch (error) {
      console.error("Erreur lors du chargement de la région:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-protec-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Modifier l'intervention #{originalData?.id}
        </h1>

        <div className="bg-white rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Date d'intervention */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date d'intervention
              </label>
              <input
                type="date"
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.date_planifiee}
                onChange={(e) =>
                  setFormData({ ...formData, date_planifiee: e.target.value })
                }
              />
            </div>

            {/* Client concerné */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Client concerné
              </label>
              <div className="relative">
                <select
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                  value={formData.client_id}
                  onChange={(e) => handleClientChange(e.target.value)}
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nom}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Site concerné */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Site concerné
              </label>
              <div className="relative">
                <select
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                  value={formData.site_id}
                  onChange={(e) => handleSiteChange(e.target.value)}
                >
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.nom} - {site.adresse}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Technicien assigné */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Technicien assigné
              </label>
              <div className="relative">
                <select
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                  value={formData.technicien_id}
                  onChange={(e) =>
                    setFormData({ ...formData, technicien_id: e.target.value })
                  }
                >
                  {techniciens.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.nom}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Type de visite */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Type de visite
              </label>
              <div className="flex gap-2 flex-wrap justify-evenly">
                {["premiere", "deuxieme", "curative"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type_visite: type })
                    }
                    className={`px-4 py-2 rounded-md border ${
                      formData.type_visite === type
                        ? "bg-protec-red text-white border-protec-red"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {type === "premiere" && "1ère visite"}
                    {type === "deuxieme" && "2ème visite"}
                    {type === "curative" && "Visite curative"}
                  </button>
                ))}
              </div>
            </div>

            {/* Statut */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <div className="relative">
                <select
                  required
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="planifiee">Planifiée</option>
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                  <option value="reportee">Reportée</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-protec-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>

        <ConfirmationModal
          isOpen={showSuccessModal}
          onClose={() => navigate(`/responsable/intervention/${id}`)}
          onConfirm={() => navigate(`/responsable/intervention/${id}`)}
          title="Modification réussie"
          message="L'intervention a été mise à jour avec succès"
          confirmText="OK"
        />
      </div>
    </div>
  );
};

export default EditIntervention;
