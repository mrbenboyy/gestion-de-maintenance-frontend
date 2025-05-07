import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";
import { useNavigate } from "react-router-dom";

export const AppareilsSection = ({ isFullPage = false }) => {
  const navigate = useNavigate();
  const [appareils] = useState([
    {
      id: 1,
      image: "/placeholder.png",
      name: "XXXXX",
      famille: "XXXXX",
      numberOfInterventions: 62,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppareils = appareils.filter(
    (appareil) =>
      appareil.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appareil.famille.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold whitespace-nowrap mb-4">Appareils</h2>
        <div className="flex-1 max-w-xl">
          <SearchBar placeholder="Chercher une..." onChange={setSearchQuery} />
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
              <tr key={appareil.id}>
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                    <img src={appareil.image} alt="" className="w-8 h-8" />
                  </div>
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {appareil.name}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {appareil.famille}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {appareil.numberOfInterventions}
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
        <SeeAllButton onClick={() => navigate("/stock/appareils")} />
      )}
    </div>
  );
};
