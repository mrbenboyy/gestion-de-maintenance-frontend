import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";

const ClientCard = ({
  name,
  email,
  logoSrc,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Section cliquable pour les détails */}
      <div
        className="p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onViewDetails}
      >
        <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${name} logo`}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="text-gray-400 text-sm">Aucun logo</div>
          )}
        </div>

        <div className="text-center">
          <h3 className="font-medium text-gray-900">{name}</h3>
          {email && (
            <p className="text-sm text-gray-500 mt-1 break-all">{email}</p>
          )}
        </div>
      </div>

      {/* Barre d'actions */}
      <div className="border-t border-gray-100 px-6 py-3 flex justify-center space-x-6">
        <button
          onClick={onViewDetails}
          className="text-gray-500 hover:text-blue-500 transition-colors"
          aria-label="Détails"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Modifier"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Supprimer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
