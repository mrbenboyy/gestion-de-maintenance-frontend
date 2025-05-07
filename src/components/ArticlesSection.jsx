import React, { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";

export const ArticlesSection = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles");
        setArticles(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || "Erreur de chargement des articles"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.famille_nom &&
        article.famille_nom.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = async () => {
    try {
      await api.delete(`/articles/${selectedArticle.code}`);
      setArticles((prev) =>
        prev.filter((a) => a.code !== selectedArticle.code)
      );
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
        <h2 className="text-xl font-bold whitespace-nowrap mb-4">Articles</h2>
        <div className="flex-1 max-w-xl">
          <SearchBar
            placeholder="Chercher un article..."
            onChange={setSearchQuery}
          />
        </div>
        <AddButton
          label="Ajouter article"
          onClick={() => navigate("/stock/articles/ajouter")}
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
                Code
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Désignation
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Famille
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Stock
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr
                key={article.code}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {article.image ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${article.image}`}
                        alt={article.designation}
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
                  {article.code}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.designation}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.famille_nom || "Non spécifiée"}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.stock}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <ActionButtons
                    onEdit={() =>
                      navigate(`/stock/articles/${article.code}/modifier`)
                    }
                    onDelete={() => {
                      setSelectedArticle(article);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Confirmer la suppression"
          message={`Êtes-vous sûr de vouloir supprimer l'article "${selectedArticle?.designation}" ?`}
        />

        {filteredArticles.length === 0 && !loading && (
          <div className="text-center py-6 text-gray-500">
            {searchQuery ? "Aucun résultat trouvé" : "Aucun article enregistré"}
          </div>
        )}
      </div>

      {!isFullPage && (
        <div className="mt-6 flex justify-end">
          <SeeAllButton onClick={() => navigate("/stock/articles")} />
        </div>
      )}
    </div>
  );
};
