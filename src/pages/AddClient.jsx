import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";

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
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [cropSrc, setCropSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validation en temps réel
  useEffect(() => {
    if (isDirty) {
      const valid = validateForm();
      setIsValid(valid);
    } else {
      setIsValid(false); // désactive tant que rien n'est modifié
    }
  }, [form, isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
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

    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result);
      setShowCropper(true);
      setErrors((prev) => ({ ...prev, image: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBlob) => {
    setImage(croppedBlob);
    setShowCropper(false);
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    setShowCropper(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Le nom est obligatoire";
    if (!form.telephone.trim())
      newErrors.telephone = "Le téléphone est obligatoire";
    if (!form.adresse.trim()) newErrors.adresse = "L'adresse est obligatoire";

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email invalide";
    }

    if (form.mot_de_passe.length < 6) {
      newErrors.mot_de_passe =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    // Construction dynamique du FormData
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) formData.append("image", image);

    try {
      await api.post("/clients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/clients");
    } catch (err) {
      const apiError = err.response?.data?.error || "Erreur lors de l'ajout";
      setErrors((prev) => ({ ...prev, api: apiError }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
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
            {/* Section Image avec gestion d'erreur */}
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
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </label>
              <span className="text-sm text-gray-500 mt-1">
                Formats acceptés: JPG, PNG, SVG (max 5MB)
              </span>
            </div>

            {/* Grille dynamique avec gestion d'erreurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(form).map(([name, value]) => {
                if (name === "contrat" || name === "sous_type_contrat")
                  return null;

                return (
                  <div key={name}>
                    <label className="block text-sm mb-1">
                      {getLabel(name)} {name !== "fax" && "*"}
                    </label>
                    {renderInput(name, value)}
                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Champs de sélection */}
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

            {/* Message d'erreur global */}
            {errors.api && (
              <div className="mt-4 text-red-500 text-center">{errors.api}</div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading || !isDirty || !isValid}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-opacity"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">&#9696;</span>
                    En cours...
                  </span>
                ) : (
                  "Ajouter Client"
                )}
              </button>
            </div>
          </form>
          {showCropper && cropSrc && (
            <ImageCropper
              imageSrc={cropSrc}
              onCropComplete={handleCropComplete}
              onCancel={handleCropCancel}
            />
          )}
        </div>
      </div>
    </div>
  );

  // Fonctions utilitaires
  function getLabel(fieldName) {
    const labels = {
      nom: "Nom de l'entreprise",
      telephone: "Téléphone",
      adresse: "Adresse",
      email: "Email",
      mot_de_passe: "Mot de passe",
      fax: "Fax",
    };
    return labels[fieldName];
  }

  function renderInput(name, value) {
    const inputProps = {
      className: `w-full border rounded px-4 py-2 ${
        errors[name] ? "border-red-500" : ""
      }`,
      name,
      value,
      onChange: handleChange,
      required: name !== "fax",
      placeholder: "",
    };

    switch (name) {
      case "mot_de_passe":
        inputProps.placeholder = "Entrez un mot de passe sécurisé";
        return <input type="password" {...inputProps} />;
      case "email":
        inputProps.placeholder = "adresse@exemple.com";
        return <input type="email" {...inputProps} />;
      case "telephone":
        inputProps.placeholder = "+212 600-000000";
        return <input type="tel" {...inputProps} />;
      case "nom":
        inputProps.placeholder = "Nom de l'entreprise";
        return <input type="text" {...inputProps} />;
      case "adresse":
        inputProps.placeholder = "Adresse complète";
        return <input type="text" {...inputProps} />;
      case "fax":
        inputProps.placeholder = "Numéro de fax (optionnel)";
        return <input type="text" {...inputProps} />;
      default:
        return <input type="text" {...inputProps} />;
    }
  }
};

export default AddClient;
