import React, { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";
import { getCroppedImg } from "../utils/cropImage";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    mot_de_passe: "",
    role: "admin",
    region_id: "",
    depot_id: "",
  });
  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regions, setRegions] = useState([]);
  const [depots, setDepots] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // pour afficher l'image originale à recadrer

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const user = response.data;
        setForm({
          nom: user.nom,
          email: user.email,
          mot_de_passe: "",
          role: user.role,
          region_id: user.region_id || "",
          depot_id: user.depot_id || "",
        });
        setExistingImage(user.image);
      } catch (err) {
        setError("Erreur lors du chargement de l'utilisateur");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // base64 pour cropper
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setNewImage(croppedImage);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("email", form.email);
    formData.append("role", form.role);
    if (form.mot_de_passe) formData.append("mot_de_passe", form.mot_de_passe);
    if (form.region_id) {
      formData.append("region_id", form.region_id);
    }
    if (form.depot_id) {
      formData.append("depot_id", form.depot_id);
    }

    if (newImage) formData.append("image", newImage);

    try {
      await api.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/users");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la modification");
      setLoading(false);
    }
  };

  // Charger les régions et dépôts
  useEffect(() => {
    const fetchData = async () => {
      const [regionsRes, depotsRes] = await Promise.all([
        api.get("/regions"),
        api.get("/depots"),
      ]);
      setRegions(regionsRes.data);
      setDepots(depotsRes.data);
    };
    fetchData();
  }, []);

  if (showCropper && selectedImage) {
    return (
      <ImageCropper
        imageSrc={selectedImage}
        onCancel={() => setShowCropper(false)}
        onCropComplete={handleCropComplete}
      />
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Modifier l'utilisateur
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
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Nom complet</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Tapez le nom"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Adresse email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Tapez l'adresse mail"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  name="mot_de_passe"
                  placeholder="Tapez le nouveau mot de passe"
                  value={form.mot_de_passe}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Position</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="responsable_planning">
                    Responsable planning
                  </option>
                  <option value="assistante">Assistant</option>
                  <option value="technicien">Technicien</option>
                </select>
              </div>

              {form.role === "technicien" && (
                <>
                  <div>
                    <label className="block text-sm mb-1">Région</label>
                    <select
                      name="region_id"
                      value={form.region_id}
                      onChange={handleChange}
                      className="w-full border rounded px-4 py-2"
                      required
                    >
                      <option value="">Sélectionner une région</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Dépôt</label>
                    <select
                      name="depot_id"
                      value={form.depot_id}
                      onChange={handleChange}
                      className="w-full border rounded px-4 py-2"
                      required
                    >
                      <option value="">Sélectionner un dépôt</option>
                      {depots.map((depot) => (
                        <option key={depot.id} value={depot.id}>
                          {depot.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>{" "}
            {error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "En cours..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
