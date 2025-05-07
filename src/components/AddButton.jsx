import React from "react";

export const AddButton = ({ label, onClick }) => (
  <button
    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
    onClick={onClick}
  >
    {label}
  </button>
);
