import React, { useState, useEffect } from "react";
import { ArrowLeft, Bell, Pencil, Trash2 } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmationModal from "../components/ConfirmationModal";

const InterventionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [intervention, setIntervention] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userRole, setUserRole] = useState("");

  const statusMap = {
    planifiee: { text: "Planifiée", color: "bg-orange-100 text-orange-600" },
    en_cours: { text: "En cours", color: "bg-purple-100 text-purple-800" },
    terminee: { text: "Terminée", color: "bg-teal-100 text-teal-800" },
    annulee: { text: "Annulée", color: "bg-gray-100 text-gray-800" },
    reportee: { text: "Reportée", color: "bg-red-100 text-red-800" },
  };

  useEffect(() => {
    const fetchIntervention = async () => {
      try {
        const response = await api.get(`/interventions/${id}`);
        setIntervention(response.data);
        const user = JSON.parse(localStorage.getItem("user"));
        setUserRole(user?.role);
      } catch (err) {
        setError("Erreur lors du chargement de l'intervention");
      } finally {
        setLoading(false);
      }
    };

    fetchIntervention();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handleNotify = async () => {
    try {
      await api.post(`/interventions/${id}/notify`);
      alert("Technicien notifié avec succès");
    } catch (err) {
      setError("Échec de la notification");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/interventions/${id}`);
      navigate(-1);
    } catch (err) {
      setError("Échec de la suppression");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!intervention) return <div className="p-6">Intervention non trouvée</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer l'intervention"
        message="Êtes-vous sûr de vouloir supprimer définitivement cette intervention ?"
      />

      <div className="mx-auto p-6">
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <button
            onClick={handleBack}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-medium">
            Détails intervention #{intervention.id}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Technicien en charge :
              </h3>
              <p className="font-medium">{intervention.technicien_nom}</p>
              <p className="text-sm text-gray-600">{intervention.client_nom}</p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Site concerné :</h3>
              <p className="font-medium">{intervention.site_nom}</p>
              <p className="text-sm text-gray-600">
                {intervention.site_adresse}
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">
                Date de l'intervention :
              </h3>
              <p className="font-medium">
                {new Date(intervention.date_planifiee).toLocaleDateString(
                  "fr-FR"
                )}
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Type de visite :</h3>
              <p className="font-medium capitalize">
                {intervention.type_visite}
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500 mb-1">Statut :</h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  statusMap[intervention.status].color
                }`}
              >
                {statusMap[intervention.status].text}
              </span>
            </div>

            {intervention.region && (
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Région :</h3>
                <p className="font-medium">{intervention.region}</p>
              </div>
            )}
          </div>

          <div className="border-t my-6" />

          <div className="flex gap-4">
            {userRole === "responsable_planning" && (
              <>
                <button
                  onClick={handleNotify}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1"
                >
                  <Bell className="w-4 h-4" />
                  Notifier le technicien
                </button>

                <button
                  onClick={() => navigate(`/intervention/${id}/edit`)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex-1"
                >
                  <Pencil className="w-4 h-4" />
                  Modifier
                </button>
              </>
            )}

            {(userRole === "responsable_planning" || userRole === "admin") && (
              <button
                onClick={() =>
                  intervention.status !== "en_cours" && setShowDeleteModal(true)
                }
                className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md flex-1 ${
                  intervention.status === "en_cours"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={intervention.status === "en_cours"}
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionDetail;
