import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";

const AddAppareil = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    famille_id: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [familles, setFamilles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState(null);

  // Charger les familles
  useEffect(() => {
    const loadFamilles = async () => {
      try {
        const response = await api.get("/familles");
        setFamilles(response.data);
      } catch (err) {
        console.error("Erreur chargement familles:", err);
        setErrors((prev) => ({
          ...prev,
          server: "Erreur de chargement des familles",
        }));
      }
    };
    loadFamilles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format image non supporté" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Taille maximale 5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setRawImage(reader.result);
      setShowCropper(true); // Affiche le cropper
    };
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleCropComplete = async (croppedBlob) => {
    const fileName = `image_${Date.now()}.${
      croppedBlob.type.split("/")[1] || "jpg"
    }`;
    const fileWithName = new File([croppedBlob], fileName, {
      type: croppedBlob.type,
    });
    setImage(fileWithName);
    setShowCropper(false);
    setRawImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!form.famille_id) newErrors.famille_id = "Famille obligatoire";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("famille_id", form.famille_id);
      if (image) formData.append("image", image);

      const response = await api.post("/appareils", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        navigate("/stock/appareils");
      }
    } catch (err) {
      let errorMessage = "Erreur lors de la création";

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
        setErrors((prev) => ({ ...prev, server: errorMessage }));
      }

      if (image) URL.revokeObjectURL(image);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showCropper && rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCancel={() => {
            setShowCropper(false);
            setRawImage(null);
          }}
          onCropComplete={handleCropComplete}
        />
      )}
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
                    disabled={isSubmitting}
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
                <span className="text-sm text-gray-500 mt-1">
                  Formats acceptés: JPG, PNG, SVG (max 5MB)
                </span>
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
                    disabled={isSubmitting}
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
                  <label className="block text-sm mb-1">
                    Famille associée *
                  </label>
                  <select
                    name="famille_id"
                    value={form.famille_id}
                    onChange={handleChange}
                    disabled={isSubmitting || familles.length === 0}
                    className={`w-full border rounded px-4 py-2 ${
                      errors.famille_id ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Sélectionner une famille</option>
                    {familles.map((famille) => (
                      <option key={famille.id} value={famille.id}>
                        {famille.nom}
                      </option>
                    ))}
                  </select>
                  {errors.famille_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.famille_id}
                    </p>
                  )}
                  {familles.length === 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      Aucune famille disponible - Créez d'abord une famille
                    </p>
                  )}
                </div>
              </div>

              {/* Erreurs serveur */}
              {errors.server && (
                <div className="mt-4 text-red-500 text-center">
                  {errors.server}
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || familles.length === 0}
                  className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Enregistrement..."
                    : "Enregistrer l'appareil"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppareil;
