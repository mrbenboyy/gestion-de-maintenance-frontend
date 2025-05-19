import { useState } from "react";

const Parametre = () => {
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john_doe@gmail.com",
    password: "",
  });
  const [toastVisible, setToastVisible] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Paramètres généraux
        </h1>
        <div className="bg-white shadow-sm rounded-md p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden">
                <img
                  src={avatarUrl}
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-red-500 cursor-pointer hover:underline"
              >
                Modifier photo
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-600">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-200 rounded-md w-full p-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
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

        {toastVisible && (
          <div className="mt-4 bg-green-100 text-green-700 p-4 rounded-md text-center">
            Vos informations ont été enregistrées avec succès.
          </div>
        )}
      </div>
    </div>
  );
};

export default Parametre;
