import React from "react";
import { Edit, Trash2 } from "lucide-react";

export const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex space-x-3">
    <button
      className="text-gray-400 hover:text-gray-600 transition-colors"
      onClick={onEdit}
    >
      <Edit size={18} />
    </button>
    <button
      className="text-gray-400 hover:text-gray-600 transition-colors"
      onClick={onDelete}
    >
      <Trash2 size={18} />
    </button>
  </div>
);
