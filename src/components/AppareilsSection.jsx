import React, { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";

export const AppareilsSection = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [appareils, setAppareils] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppareil, setSelectedAppareil] = useState(null);

  useEffect(() => {
    const fetchAppareils = async () => {
      try {
        const response = await api.get("/appareils");
        setAppareils(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Erreur de chargement des appareils"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppareils();
  }, []);

  const filteredAppareils = appareils.filter(
    (appareil) =>
      appareil.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appareil.famille_nom?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await api.delete(`/appareils/${selectedAppareil.id}`);
      setAppareils((prev) => prev.filter((a) => a.id !== selectedAppareil.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la suppression");
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center py-8">
        Chargement en cours...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold whitespace-nowrap mb-4">Appareils</h2>
        <div className="flex-1 max-w-xl">
          <SearchBar
            placeholder="Chercher un appareil..."
            onChange={setSearchQuery}
          />
        </div>
        <AddButton
          label="Ajouter appareil"
          onClick={() => navigate("/stock/appareils/ajouter")}
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Nom
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Famille
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Interventions
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAppareils.map((appareil) => (
              <tr
                key={appareil.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {appareil.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${appareil.image}`}
                        alt={appareil.nom}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Aucune image
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 border-t border-gray-200 font-medium">
                  {appareil.nom}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {appareil.famille_nom || "Non classé"}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {appareil.interventions_count || 0}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <ActionButtons
                    onEdit={() =>
                      navigate(`/stock/appareils/${appareil.id}/modifier`)
                    }
                    onDelete={() => {
                      setSelectedAppareil(appareil);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppareils.length === 0 && !loading && (
          <div className="text-center py-6 text-gray-500">
            {searchQuery
              ? "Aucun résultat trouvé"
              : "Aucun appareil enregistré"}
          </div>
        )}

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirmer la suppression"
          message={`Êtes-vous sûr de vouloir supprimer l'appareil "${selectedAppareil?.nom}" ?`}
        />
      </div>

      {!isFullPage && (
        <div className="mt-6 flex justify-end">
          <SeeAllButton onClick={() => navigate("/stock/appareils")} />
        </div>
      )}
    </div>
  );
};
