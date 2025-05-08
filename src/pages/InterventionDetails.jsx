import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

const InterventionDetails = () => {
  const navigate = useNavigate();

  // Données statiques temporaires
  const intervention = {
    id: 123,
    technicien_nom: "Mohamed El Amrani",
    technicien_email: "m.elamrani@example.com",
    client_nom: "OCP Group",
    site_nom: "Site minier Khouribga",
    site_adresse: "Khouribga, Région de Béni Mellal-Khénifra",
    date_planifiee: new Date("2024-03-15"),
    status: "planifiee",
    type_visite: "Deuxième visite",
    lat: 32.88006,
    lng: -6.90935,
  };

  const getStatusStyle = () => {
    switch (intervention.status) {
      case "planifiee":
        return "bg-blue-100 text-blue-800";
      case "en_cours":
        return "bg-yellow-100 text-yellow-800";
      case "terminee":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Détails de l'intervention #{intervention.id}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Colonne gauche */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Technicien assigné
                </label>
                <p className="font-medium text-gray-900">
                  {intervention.technicien_nom}
                </p>
                <p className="text-sm text-gray-500">
                  {intervention.technicien_email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Client
                </label>
                <p className="font-medium text-gray-900">
                  {intervention.client_nom}
                </p>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Date planifiée
                </label>
                <p className="font-medium text-gray-900">
                  {new Date(intervention.date_planifiee).toLocaleDateString(
                    "fr-FR",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Statut
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
                >
                  {intervention.status.charAt(0).toUpperCase() +
                    intervention.status.slice(1)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Type de visite
                </label>
                <p className="font-medium text-gray-900">
                  {intervention.type_visite}
                </p>
              </div>
            </div>
          </div>

          {/* Section Carte */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Localisation du site
            </h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                title="Carte du site"
                className="w-full h-full"
                src={`https://maps.google.com/maps?q=${intervention.lat},${intervention.lng}&z=15&output=embed`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${intervention.lat},${intervention.lng}`,
                  "_blank"
                )
              }
            >
              Ouvrir dans Google Maps
            </button>

            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Marquer comme arrivé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionDetails;
