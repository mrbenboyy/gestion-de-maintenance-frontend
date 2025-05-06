import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    fax: "",
    adresse: "",
    email: "",
    contrat: "SAV",
    sous_type_contrat: "unitaire",
  });
  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        const client = response.data;
        setForm({
          nom: client.nom,
          telephone: client.telephone,
          fax: client.fax,
          adresse: client.adresse,
          email: client.email,
          contrat: client.contrat,
          sous_type_contrat: client.sous_type_contrat,
        });
        setExistingImage(client.image);
      } catch (err) {
        setErrors({ api: "Erreur lors du chargement du client" });
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format d'image non supporté" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "L'image doit faire moins de 5MB",
      }));
      return;
    }

    setNewImage(file);
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!form.telephone.trim())
      newErrors.telephone = "Le téléphone est obligatoire";
    if (!form.adresse.trim()) newErrors.adresse = "L'adresse est obligatoire";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Email invalide";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (newImage) formData.append("image", newImage);

    try {
      await api.put(`/clients/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/clients");
    } catch (err) {
      const apiError =
        err.response?.data?.error || "Erreur lors de la modification";
      setErrors((prev) => ({ ...prev, api: apiError }));
    } finally {
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
            <FiArrowLeft className="mr-2" /> Modifier le client
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
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                  {newImage ? (
                    <img
                      src={URL.createObjectURL(newImage)}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : existingImage ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${existingImage}`}
                      alt="Current"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiCamera />
                  )}
                </div>
                <span className="text-sm text-blue-600 mt-2 hover:underline">
                  {newImage || existingImage
                    ? "Changer la photo"
                    : "Upload Photo"}
                </span>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </label>
              <span className="text-sm text-gray-500 mt-1">
                Formats acceptés: JPG, PNG, SVG (max 5MB)
              </span>
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
                  className={`w-full border rounded px-4 py-2 ${
                    errors.nom ? "border-red-500" : ""
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Téléphone*</label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Numéro de téléphone"
                  value={form.telephone}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.telephone ? "border-red-500" : ""
                  }`}
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telephone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Adresse*</label>
                <input
                  type="text"
                  name="adresse"
                  placeholder="Adresse complète"
                  value={form.adresse}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.adresse ? "border-red-500" : ""
                  }`}
                />
                {errors.adresse && (
                  <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                >
                  <option value="unitaire">Unitaire</option>
                  <option value="forfaitaire">Forfaitaire</option>
                </select>
              </div>
            </div>

            {errors.api && (
              <div className="mt-4 text-red-500 text-center">{errors.api}</div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">&#9696;</span>
                    En cours...
                  </span>
                ) : (
                  "Enregistrer les modifications"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
