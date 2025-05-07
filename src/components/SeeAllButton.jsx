import React from "react";

export const SeeAllButton = ({ onClick }) => (
  <button
    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mx-auto block mt-4"
    onClick={onClick}
  >
    Voir plus
  </button>
);
