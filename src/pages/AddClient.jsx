import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AddClient = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    adresse: "",
    email: "",
    mot_de_passe: "",
    contrat: "SAV",
    sous_type_contrat: "unitaire",
    fax: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (!form.nom) newErrors.push("Le nom est obligatoire");
    if (!form.telephone) newErrors.push("Le téléphone est obligatoire");
    if (!form.adresse) newErrors.push("L'adresse est obligatoire");
    if (!form.email) newErrors.push("L'email est obligatoire");
    if (!form.mot_de_passe) newErrors.push("Le mot de passe est obligatoire");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) formData.append("image", image);

    try {
      await api.post("/clients", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/clients");
    } catch (err) {
      setErrors([err.response?.data?.error || "Erreur lors de l'ajout"]);
      setLoading(false);
    }
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
            <FiArrowLeft className="mr-2" /> Ajouter nouveau client
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
                  {image ? "Changer la photo" : "Upload Photo"}
                </span>
              </label>
            </div>

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">
                  Nom de l'entreprise*
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom du client"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Téléphone*</label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Numéro de téléphone"
                  value={form.telephone}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Adresse*</label>
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse complète"
                  value={form.adresse}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Mot de passe*</label>
                <input
                  type="password"
                  name="mot_de_passe"
                  placeholder="••••••••"
                  value={form.mot_de_passe}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Fax</label>
                <input
                  type="text"
                  name="fax"
                  placeholder="Numéro de fax"
                  value={form.fax}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Type de contrat*</label>
                <select
                  name="contrat"
                  value={form.contrat}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                >
                  <option value="SAV">SAV</option>
                  <option value="Detection">Détection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Sous-type de contrat*
                </label>
                <select
                  name="sous_type_contrat"
                  value={form.sous_type_contrat}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                >
                  <option value="unitaire">Unitaire</option>
                  <option value="forfaitaire">Forfaitaire</option>
                </select>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="mt-4 text-red-500">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "En cours..." : "Ajouter Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
