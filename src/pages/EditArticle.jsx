import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import api from "../utils/api";

const EditArticle = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    designation: "",
    famille_id: "",
    stock: 0,
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [familles, setFamilles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger l'article
        const articleResponse = await api.get(`/articles/${code}`);
        const articleData = articleResponse.data;

        // Charger les familles
        const famillesResponse = await api.get("/familles");

        setForm({
          code: articleData.code,
          designation: articleData.designation,
          famille_id: articleData.famille_id,
          stock: articleData.stock,
        });
        setExistingImage(articleData.image);
        setFamilles(famillesResponse.data);
      } catch (err) {
        navigate("/stock/articles", { replace: true });
      }
    };

    fetchData();
  }, [code]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Format d'image non supporté" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "La taille maximale est 5MB" }));
      return;
    }

    setImage(file);
    setExistingImage("");
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = "Code obligatoire";
    if (!form.designation.trim())
      newErrors.designation = "Désignation obligatoire";
    if (!form.famille_id) newErrors.famille_id = "Famille obligatoire";
    if (form.stock < 0) newErrors.stock = "Stock invalide";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("code", form.code);
      formData.append("designation", form.designation);
      formData.append("famille_id", form.famille_id);
      formData.append("stock", form.stock);
      if (image) formData.append("image", image);

      await api.put(`/articles/${code}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/stock/articles");
    } catch (err) {
      let errorMessage = "Erreur lors de la modification";

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.errors) {
        const backendErrors = err.response.data.errors.reduce((acc, error) => {
          const [field, message] = error.split(" : ");
          acc[field] = message;
          return acc;
        }, {});
        setErrors(backendErrors);
        return;
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
            onClick={() => navigate("/stock/articles")}
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
              <span className="text-sm text-gray-500 mt-1">
                Formats acceptés: JPG, PNG, SVG (max 5MB)
              </span>
            </div>

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm mb-1">Code article *</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.code ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Désignation *</label>
                <input
                  type="text"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.designation ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Famille *</label>
                <select
                  name="famille_id"
                  value={form.famille_id}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.famille_id ? "border-red-500" : "border-gray-300"
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

              <div>
                <label className="block text-sm mb-1">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  disabled={isSubmitting}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
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
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
