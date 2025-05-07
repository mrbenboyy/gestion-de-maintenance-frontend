import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";
import { useNavigate } from "react-router-dom";

export const ArticlesSection = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [articles] = useState([
    {
      id: 1,
      image: "/placeholder.png",
      name: "XXXXX",
      famille: "XXXXX",
      designation: "XXXXXX",
    },
    {
      id: 2,
      image: "/placeholder.png",
      name: "XXXXX",
      famille: "XXXXX",
      designation: "XXXXXX",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.famille.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold whitespace-nowrap mb-4">Articles</h2>
        <div className="flex-1 max-w-xl">
          <SearchBar placeholder="Chercher une..." onChange={setSearchQuery} />
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
                Nom
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Famille
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Désignation
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                    <img src={article.image} alt="" className="w-8 h-8" />
                  </div>
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.name}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.famille}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {article.designation}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <ActionButtons onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isFullPage && (
        <SeeAllButton onClick={() => navigate("/stock/articles")} />
      )}
    </div>
  );
};
