import { useState, useEffect } from "react";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "./DashboardHeader";
import api from "../utils/api";
import ImageCropper from "../components/ImageCropper";
import { FiCamera } from "react-icons/fi";

const Parametre = () => {
  const [userId, setUserId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);

  // Récupérer l'ID utilisateur depuis le token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
    }
  }, []);

  // Charger les données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/users/${userId}`);
        const { nom, email, image } = response.data;
        setFormData({ nom, email, password: "" });

        if (image) setAvatarUrl(`${process.env.REACT_APP_API_URL}${image}`);
        else setAvatarUrl("/placeholder.svg"); // Fallback si pas d'image
      } catch (error) {
        console.error("Erreur chargement données:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  // Gestion du croppage
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageToCrop(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const handleCropComplete = useCallback(async (croppedImage) => {
    const croppedFile = new File([croppedImage], "avatar.jpg", {
      type: "image/jpeg",
    });
    setSelectedImageFile(croppedFile);
    setAvatarUrl(URL.createObjectURL(croppedImage));
    setShowCropper(false);
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("nom", formData.nom);
    formPayload.append("email", formData.email);
    if (formData.password)
      formPayload.append("mot_de_passe", formData.password);
    if (selectedImageFile) formPayload.append("image", selectedImageFile);

    try {
      await api.put(`/users/${userId}`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      try {
        // Récupérer les nouvelles données
        const updatedResponse = await api.get(`/users/${userId}`);
        const { nom, role, image } = updatedResponse.data;

        // Mettre à jour le localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...userData,
          nom,
          role,
          image: image ? `${process.env.REACT_APP_API_URL}${image}` : null,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Émettre un événement global
        window.dispatchEvent(new CustomEvent("userUpdate"));
      } catch (error) {
        console.error("Erreur refresh données:", error);
      }
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setFormData((prev) => ({ ...prev, password: "" }));
      setSelectedImageFile(null);
    } catch (error) {
      console.error("Erreur mise à jour:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {showCropper && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCancel={() => setShowCropper(false)}
          onCropComplete={handleCropComplete}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Paramètres généraux
            </h1>
            <div className="bg-white shadow rounded-lg p-8">
              <div className="flex flex-col items-center justify-center mb-8">
                {toastVisible && (
                  <div className="bg-green-100 text-green-700 mb-4 p-4 rounded-md text-center">
                    Vos informations ont été enregistrées avec succès.
                  </div>
                )}
                <div className="flex flex-col items-center ">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                      {avatarUrl !== "/placeholder.svg" ? (
                        <img
                          src={avatarUrl}
                          alt="Profil"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FiCamera />
                      )}
                    </div>
                    <span className="text-sm text-blue-500 mt-2 hover:underline">
                      {avatarUrl !== "/placeholder.svg"
                        ? "Changer la photo"
                        : "Upload Photo"}
                    </span>
                  </label>
                  <span className="text-sm text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, JPEG (max 5MB)
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-gray-600">
                      Nom
                    </label>
                    <input
                      id="name"
                      name="nom"
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nom: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-200 rounded-md w-full p-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-600">
                      Adresse email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-200 rounded-md w-full p-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm text-gray-600">
                    Mot de passe
                  </label>
                  <input
                    id="mot_de_passe"
                    name="mot_de_passe"
                    type="password"
                    placeholder="Laissez vide pour ne pas changer"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="bg-gray-50 border border-gray-200 rounded-md w-full p-2"
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 rounded-md"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Parametre;
