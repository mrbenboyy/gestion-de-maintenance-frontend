import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";

const EditAppareil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: "", famille_id: "" });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [familles, setFamilles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImageUrl, setRawImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger l'appareil
        const appareilResponse = await api.get(`/appareils/${id}`);
        const appareilData = appareilResponse.data;

        // Charger les familles
        const famillesResponse = await api.get("/familles");

        setForm({
          nom: appareilData.nom,
          famille_id: appareilData.famille_id.toString(),
        });
        setExistingImage(appareilData.image);
        setFamilles(famillesResponse.data);
      } catch (err) {
        navigate("/stock/appareils", { replace: true });
      }
    };

    fetchData();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format d'image non supporté" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setRawImageUrl(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBlob) => {
    const file = new File([croppedBlob], `appareil-${Date.now()}.jpeg`, {
      type: "image/jpeg",
    });
    setImage(file);
    setExistingImage(""); // On remplace l'ancienne image
    setShowCropper(false);
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
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

      const response = await api.put(`/appareils/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/stock/appareils");
    } catch (err) {
      let errorMessage = "Erreur lors de la modification";
      if (err.response?.data?.error) {
        if (err.response.data.error.includes("existe déjà")) {
          errorMessage = "Ce nom est déjà utilisé dans cette famille";
        } else {
          errorMessage = err.response.data.error;
        }
      }
      setErrors({ server: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          <button
            onClick={() => navigate("/stock/appareils")}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Retour à la liste
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
                  {image || existingImage ? (
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : `${process.env.REACT_APP_API_URL}${existingImage}`
                      }
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiCamera />
                  )}
                </div>
                <span className="text-sm text-blue-600 mt-2 hover:underline">
                  {image || existingImage
                    ? "Changer l'image"
                    : "Ajouter une image"}
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
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.nom ? "border-red-500" : ""
                  }`}
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
                  onChange={(e) =>
                    setForm({ ...form, famille_id: e.target.value })
                  }
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
              </div>
            </div>

            {/* Erreur serveur */}
            {errors.server && (
              <div className="mt-4 text-red-500 text-center">
                {errors.server}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-opacity disabled:opacity-50"
              >
                {isSubmitting
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showCropper && rawImageUrl && (
        <ImageCropper
          imageSrc={rawImageUrl}
          onCancel={() => setShowCropper(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default EditAppareil;
