import React, { useState, useEffect, useMemo } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import api from "../utils/api";
import { toast } from "react-toastify";

const InterventionForm = () => {
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [techniciens, setTechniciens] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date_planifiee: "",
    client_id: "",
    site_id: "",
    technicien_id: "",
    type_visite: "premiere",
    region_id: "", // Nouveau champ région
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdIntervention, setCreatedIntervention] = useState(null);

  // Chargement des données initiales
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [clientsResponse, techniciensResponse, regionsResponse] =
          await Promise.all([
            api.get("/clients"),
            api.get("/users/techniciens"),
            api.get("/regions"), // Nouvelle requête pour les régions
          ]);
        setClients(clientsResponse.data);
        setTechniciens(techniciensResponse.data);
        setRegions(regionsResponse.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des données initiales");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Chargement des sites quand le client change
  useEffect(() => {
    const fetchClientSites = async () => {
      if (formData.client_id) {
        try {
          const response = await api.get(`/sites/client/${formData.client_id}`);
          setSites(response.data);
          setFormData((prev) => ({ ...prev, site_id: "", technicien_id: "" }));
        } catch (error) {
          toast.error("Erreur lors du chargement des sites");
        }
      }
    };
    fetchClientSites();
  }, [formData.client_id]);

  // Mise à jour de la région quand le site change
  useEffect(() => {
    const fetchSiteRegion = async () => {
      if (formData.site_id) {
        try {
          const response = await api.get(`/sites/${formData.site_id}`);
          setFormData((prev) => ({
            ...prev,
            region_id: response.data.region_id,
          }));
        } catch (error) {
          toast.error("Erreur lors du chargement de la région du site");
        }
      }
    };
    fetchSiteRegion();
  }, [formData.site_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post("/interventions", {
        ...formData,
        status: "planifiee",
        created_by: userId,
      });
      setCreatedIntervention(response.data);
      setShowSuccessModal(true);
      toast.success("Intervention planifiée avec succès !");
      setFormData({
        date_planifiee: "",
        client_id: "",
        site_id: "",
        technicien_id: "",
        type_visite: "premiere",
        region_id: "",
      });
      setSites([]);
    } catch (error) {
      toast.error(error.response?.data?.error || "Erreur lors de la création");
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

  const handleNotifyTechnicien = async () => {
    try {
      await api.post(`/interventions/${createdIntervention.id}/notify`);
      toast.success("Notification envoyée au technicien !");
      setShowSuccessModal(false);
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la notification");
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          ✅ Intervention créée avec succès
        </h3>
        <p className="mb-4">Que souhaitez-vous faire ensuite ?</p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleNotifyTechnicien}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Notifier le technicien
          </button>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Planifier une intervention
      </h1>
      <div className="bg-white rounded-lg shadow-sm border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date d'intervention */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date d'intervention
            </label>
            <div className="relative">
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
          </div>

          {/* Client concerné */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Client concerné
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.client_id}
                onChange={(e) =>
                  setFormData({ ...formData, client_id: e.target.value })
                }
              >
                <option value="">Sélectionner le client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nom}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Champ Région ajouté */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Région
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.region_id}
                onChange={(e) =>
                  setFormData({ ...formData, region_id: e.target.value })
                }
              >
                <option value="">Sélectionner la région</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.nom}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
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
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.site_id}
                onChange={(e) =>
                  setFormData({ ...formData, site_id: e.target.value })
                }
                disabled={!formData.client_id}
              >
                <option value="">
                  {sites.length === 0
                    ? "Aucun site disponible"
                    : "Sélectionner le site"}
                </option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.nom} - {site.adresse}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Technicien assigné - Plus de filtrage par région */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Technicien assigné
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.technicien_id}
                onChange={(e) =>
                  setFormData({ ...formData, technicien_id: e.target.value })
                }
              >
                <option value="">Sélectionner le technicien</option>
                {techniciens.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.nom}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
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

          {/* Bouton de soumission */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-protec-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Créer l'intervention"}
            </button>
          </div>
        </form>
        {showSuccessModal && <SuccessModal />}
      </div>
    </div>
  );
};

export default InterventionForm;
