import React, { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";

const InterventionForm = () => {
  const [formData, setFormData] = useState({
    date_planifiee: "",
    client_id: "",
    site_id: "",
    technicien_id: "",
    type_visite: "premiere",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission ici
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Planifier une intervention
      </h1>
      <div className="bg-white rounded-lg shadow-sm border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date d'intervention */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date d'intervention
            </label>
            <div className="relative">
              <input
                type="date"
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md"
                value={formData.date_planifiee}
                onChange={(e) =>
                  setFormData({ ...formData, date_planifiee: e.target.value })
                }
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Client concerné */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Client concerné
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.client_id}
                onChange={(e) =>
                  setFormData({ ...formData, client_id: e.target.value })
                }
              >
                <option value="">Sélectionner le client</option>
                <option value="1">Client 1</option>
                <option value="2">Client 2</option>
                <option value="3">Client 3</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Site concerné */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Site concerné
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.site_id}
                onChange={(e) =>
                  setFormData({ ...formData, site_id: e.target.value })
                }
              >
                <option value="">Sélectionner le site</option>
                <option value="1">Site 1</option>
                <option value="2">Site 2</option>
                <option value="3">Site 3</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Technicien assigné */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Technicien assigné
            </label>
            <div className="relative">
              <select
                required
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md appearance-none"
                value={formData.technicien_id}
                onChange={(e) =>
                  setFormData({ ...formData, technicien_id: e.target.value })
                }
              >
                <option value="">Sélectionner le technicien</option>
                <option value="1">Technicien 1</option>
                <option value="2">Technicien 2</option>
                <option value="3">Technicien 3</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Type de visite */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type de visite
            </label>
            <div className="flex gap-2">
              {["premiere", "deuxieme", "curative"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type_visite: type })
                  }
                  className={`px-4 py-2 rounded-md border ${
                    formData.type_visite === type
                      ? "bg-protec-red text-white border-protec-red"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {type === "premiere" && "1ère visite"}
                  {type === "deuxieme" && "2ème visite"}
                  {type === "curative" && "Curative"}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-protec-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Créer l'intervention
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterventionForm;
