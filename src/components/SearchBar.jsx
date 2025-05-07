import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ placeholder, onChange }) => (
  <div className="flex items-center gap-2 mb-4">
    <Search className="text-gray-400" size={20} />
    <input
      type="text"
      className="w-full sm:w-64 pl-3 py-2 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-600"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
