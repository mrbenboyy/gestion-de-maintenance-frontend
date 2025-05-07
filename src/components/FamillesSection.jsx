import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { AddButton } from "./AddButton";
import { ActionButtons } from "./ActionButtons";
import { SeeAllButton } from "./SeeAllButton";

export const FamillesSection = () => {
  const [familles] = useState([
    {
      id: 1,
      image: "/placeholder.png",
      name: "XXXXX",
      numberOfArticles: 15,
      numberOfDevices: 62,
    },
    {
      id: 2,
      image: "/placeholder.png",
      name: "XXXXX",
      numberOfArticles: 15,
      numberOfDevices: 11,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFamilles = familles.filter((famille) =>
    famille.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Familles</h2>
        <AddButton label="Ajouter famille" onClick={() => {}} />
      </div>

      <SearchBar placeholder="Chercher une..." onChange={setSearchQuery} />

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
                Articles associés
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Appareils associés
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilles.map((famille) => (
              <tr key={famille.id}>
                <td className="px-4 py-3 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                    <img src={famille.image} alt="" className="w-8 h-8" />
                  </div>
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {famille.name}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {famille.numberOfArticles}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  {famille.numberOfDevices}
                </td>
                <td className="px-4 py-3 border-t border-gray-200">
                  <ActionButtons onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SeeAllButton onClick={() => {}} />
    </div>
  );
};
