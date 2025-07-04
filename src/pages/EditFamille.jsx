import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";

const EditFamille = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: "" });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchFamille = async () => {
      try {
        const response = await api.get(`/familles/${id}`);
        setForm({ nom: response.data.nom });
        setExistingImage(response.data.image);
      } catch (err) {
        navigate("/stock/familles", { replace: true });
      }
    };

    fetchFamille();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format d'image non supporté" }));
      return;
    }

    // On crée une URL temporaire pour le cropper
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl); // ouvre le cropper avec cette image
    setCropping(true); // afficher cropper

    setErrors((prev) => ({ ...prev, image: null }));
  };

  // quand cropper valide, on récupère l'image recadrée en blob
  const onCropComplete = (croppedBlob) => {
    const mimeType = croppedBlob.type;
    const extension = mimeType.split("/")[1];
    const fileName = `image_${Date.now()}.${extension}`;
    const fileWithName = new File([croppedBlob], fileName, { type: mimeType });
    setImage(fileWithName);

    setCropping(false); // cacher le cropper
    setImageSrc(null); // nettoyer url temporaire
    setExistingImage(""); // on remplace l'ancienne image
  };

  const onCancelCrop = () => {
    setCropping(false);
    setImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!form.nom.trim()) {
      setErrors({ nom: "Le nom de la famille est obligatoire" });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nom", form.nom);
      if (image) formData.append("image", image);

      await api.put(`/familles/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/stock/familles");
    } catch (err) {
      let errorMessage = "Erreur lors de la modification";
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      setErrors({ server: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          <button
            onClick={() => navigate("/stock/familles")}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Retour à la liste
          </button>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center mb-8">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isSubmitting || cropping} // désactive pendant crop
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

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="block text-sm mb-1">
                  Nom de la famille *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={(e) => setForm({ nom: e.target.value })}
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.nom ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>
            </div>

            {errors.server && (
              <div className="mb-4 text-red-500 text-center">
                {errors.server}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Enregistrement..."
                  : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
          {cropping && imageSrc && (
            <ImageCropper
              imageSrc={imageSrc}
              onCancel={onCancelCrop}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFamille;
