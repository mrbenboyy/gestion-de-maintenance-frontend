import React, { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";

export const FamillesSection = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [familles, setFamilles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFamille, setSelectedFamille] = useState(null);

  useEffect(() => {
    const fetchFamilles = async () => {
      try {
        const response = await api.get("/familles");
        setFamilles(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Erreur de chargement des familles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFamilles();
  }, []);

  const filteredFamilles = familles.filter((famille) =>
    famille.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleDelete = async () => {
    try {
      await api.delete(`/familles/${selectedFamille.id}`);
      setFamilles((prev) => prev.filter((f) => f.id !== selectedFamille.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la suppression");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-sm ${!isFullPage && "mb-8"}`}
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-bold whitespace-nowrap">Familles</h2>
        <div className="flex-1 max-w-xl min-w-[300px]">
          <SearchBar
            placeholder="Rechercher une famille..."
            onChange={setSearchQuery}
            value={searchQuery}
          />
        </div>
        <AddButton
          label="Ajouter famille"
          onClick={() => navigate("/stock/familles/ajouter")}
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
                Articles
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Appareils
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilles.map((famille) => (
              <tr
                key={famille.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {famille.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${famille.image}`}
                        alt={famille.nom}
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
                  {famille.nom}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {famille.articles_count || 0}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {famille.appareils_count || 0}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <ActionButtons
                    onEdit={() =>
                      navigate(`/stock/familles/${famille.id}/modifier`)
                    }
                    onDelete={() => {
                      setSelectedFamille(famille);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Confirmer la suppression"
            message={`Êtes-vous sûr de vouloir supprimer la famille "${selectedFamille?.nom}" ?`}
          />
        </table>

        {filteredFamilles.length === 0 && !loading && (
          <div className="text-center py-6 text-gray-500">
            {searchQuery
              ? "Aucun résultat trouvé"
              : "Aucune famille enregistrée"}
          </div>
        )}
      </div>

      {!isFullPage && (
        <div className="mt-6 flex justify-end">
          <SeeAllButton onClick={() => navigate("/stock/familles")} />
        </div>
      )}
    </div>
  );
};
