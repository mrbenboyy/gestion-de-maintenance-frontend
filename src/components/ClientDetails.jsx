import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import api from "../utils/api";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import ConfirmationModal from "../components/ConfirmationModal";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement du client");
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/clients/${id}`);
      navigate("/clients");
    } catch (err) {
      setError("Erreur lors de la suppression");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer définitivement ce client ?"
        />

        <div className="px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:underline"
            >
              ← Retour à la liste
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/edit-client/${id}`)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-48 h-48 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                {client.image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${client.image}`}
                    alt={`${client.nom} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-gray-400 text-lg">Aucun logo</div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{client.nom}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Email" value={client.email} />
              <DetailItem label="Téléphone" value={client.telephone} />
              <DetailItem label="Adresse" value={client.adresse} />
              <DetailItem label="Fax" value={client.fax} />
              <DetailItem label="Type de contrat" value={client.contrat} />
              <DetailItem
                label="Sous-type de contrat"
                value={client.sous_type_contrat}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="border-b pb-2">
    <span className="text-sm text-gray-500">{label}:</span>
    <p className="font-medium">{value || "Non spécifié"}</p>
  </div>
);

export default ClientDetails;
