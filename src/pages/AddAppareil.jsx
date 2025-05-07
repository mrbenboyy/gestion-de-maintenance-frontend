import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddAppareil = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    famille_id: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format d'image non supporté" }));
      return;
    }

    setImage(file);
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!form.famille_id) newErrors.famille_id = "Famille obligatoire";

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    // Navigation simulée
    navigate("/stock/appareils");
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Ajouter nouvel appareil
          </button>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto"
          >
            {/* Section Image */}
            <div className="flex flex-col items-center mb-8">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiCamera />
                  )}
                </div>
                <span className="text-sm text-blue-600 mt-2 hover:underline">
                  {image ? "Changer l'image" : "Upload Image"}
                </span>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </label>
            </div>

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">
                  Nom de l'appareil *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.nom ? "border-red-500" : ""
                  }`}
                  placeholder="Ex: Capteur de température"
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Famille associée *</label>
                <select
                  name="famille_id"
                  value={form.famille_id}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.famille_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Sélectionner une famille</option>
                  <option value="1">Électronique</option>
                  <option value="2">Mécanique</option>
                </select>
                {errors.famille_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.famille_id}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-opacity"
              >
                Enregistrer l'appareil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppareil;
