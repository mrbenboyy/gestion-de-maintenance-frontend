import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import { FiArrowLeft } from "react-icons/fi";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../utils/api";

// Fix pour les marqueurs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const EditSite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    client_id: "",
    type_site: "Agence",
    adresse: "",
    nombre_visites_annuelles: 1,
    region: "",
    lat: "",
    lng: "",
  });

  const [mapCenter] = useState([33.5731, -7.5898]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [regions, setRegions] = useState([]);

  // Charger les données existantes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteResponse, clientsResponse] = await Promise.all([
          api.get(`/sites/${id}`),
          api.get("/clients"),
        ]);

        const site = siteResponse.data;
        setForm({
          ...site,
          client_id: site.client_id.toString(),
          region_id: site.region_id.toString(),
          lat: site.lat.toString(),
          lng: site.lng.toString(),
        });
        setClients(clientsResponse.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
      }
    };
    fetchData();
  }, [id]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const newPos = [e.latlng.lat, e.latlng.lng];
        if (newPos.every(Number.isFinite)) {
          setMarkerPosition(newPos);
          setForm((prev) => ({
            ...prev,
            lat: e.latlng.lat.toFixed(6),
            lng: e.latlng.lng.toFixed(6),
          }));
        }
      },
    });
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Champ obligatoire";
    if (!form.client_id) newErrors.client_id = "Champ obligatoire";
    if (!form.adresse.trim()) newErrors.adresse = "Champ obligatoire";
    if (!form.lat || !form.lng) newErrors.localisation = "Position requise";
    if (!form.region_id) newErrors.region = "Champ obligatoire";
    if (![1, 2].includes(Number(form.nombre_visites_annuelles))) {
      newErrors.nombre_visites_annuelles = "Doit être 1 ou 2";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        ...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        nombre_visites_annuelles: parseInt(form.nombre_visites_annuelles),
      };

      await api.put(`/sites/${id}`, payload);
      navigate("/sites");
    } catch (err) {
      console.error("Erreur détaillée:", err.response?.data);
      const backendErrors = err.response?.data?.errors || [];
      const errorMap = {};
      backendErrors.forEach((error) => {
        const field = error.path;
        errorMap[field] = error.msg;
      });

      if (err.response?.data?.error) {
        errorMap.api = err.response.data.error;
      }

      setErrors(errorMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      Number.isFinite(lat) &&
      Number.isFinite(lng)
    ) {
      setMarkerPosition([lat, lng]);
    } else {
      setMarkerPosition(null);
    }
  }, [form.lat, form.lng]);

  const MapUpdater = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
      if (center && Array.isArray(center) && center.every(Number.isFinite)) {
        map.setView(center, zoom, { animate: false });
      }
    }, [center, zoom, map]);

    return null;
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await api.get("/regions");
        setRegions(response.data);
      } catch (err) {
        console.error("Erreur récupération régions:", err);
      }
    };
    fetchRegions();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />

        <div className="px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 mb-6 hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Retour
          </button>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom du site */}
              <div>
                <label className="block text-sm mb-1">Nom du site *</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className={`w-full border rounded px-4 py-2 ${
                    errors.nom ? "border-red-500" : ""
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>

              {/* Client associé */}
              <div>
                <label className="block text-sm mb-1">Client associé *</label>
                <select
                  name="client_id"
                  value={form.client_id}
                  onChange={(e) =>
                    setForm({ ...form, client_id: e.target.value })
                  }
                  className={`w-full border rounded px-4 py-2 ${
                    errors.client_id ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nom}
                    </option>
                  ))}
                </select>
                {errors.client_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.client_id}
                  </p>
                )}
              </div>

              {/* Type de site */}
              <div>
                <label className="block text-sm mb-1">Type de site *</label>
                <select
                  name="type_site"
                  value={form.type_site}
                  onChange={(e) =>
                    setForm({ ...form, type_site: e.target.value })
                  }
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="Agence">Agence</option>
                  <option value="Bureau">Bureau</option>
                  <option value="Entrepôt">Entrepôt</option>
                </select>
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-sm mb-1">Adresse *</label>
                <input
                  type="text"
                  name="adresse"
                  value={form.adresse}
                  onChange={(e) =>
                    setForm({ ...form, adresse: e.target.value })
                  }
                  placeholder="Ex: 123 Rue Principale, Casablanca"
                  className={`w-full border rounded px-4 py-2 ${
                    errors.adresse ? "border-red-500" : ""
                  }`}
                />
                {errors.adresse && (
                  <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
                )}
              </div>

              {/* Visites annuelles et Coordonnées */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Visites annuelles */}
                  <div>
                    <label className="block text-sm mb-1">
                      Visites annuelles *
                    </label>
                    <select
                      name="nombre_visites_annuelles"
                      value={form.nombre_visites_annuelles}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          nombre_visites_annuelles: e.target.value,
                        })
                      }
                      className={`w-full border rounded px-3 py-2 text-sm ${
                        errors.nombre_visites_annuelles ? "border-red-500" : ""
                      }`}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                    {errors.nombre_visites_annuelles && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nombre_visites_annuelles}
                      </p>
                    )}
                  </div>

                  {/* Région */}
                  <div>
                    <label className="block text-sm mb-1">Région *</label>
                    <select
                      name="region_id"
                      value={form.region_id}
                      onChange={(e) =>
                        setForm({ ...form, region_id: e.target.value })
                      }
                      className={`w-full border rounded px-3 py-2 text-sm ${
                        errors.region ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Sélectionner une région</option>
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.nom}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.region}
                      </p>
                    )}
                  </div>

                  {/* Latitude */}
                  <div>
                    <label className="block text-sm mb-1">Latitude *</label>
                    <input
                      type="number"
                      step="any"
                      value={form.lat}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(value)) {
                          const normalizedValue = value.replace(/,/g, ".");
                          setForm({ ...form, lat: normalizedValue });
                        }
                      }}
                      placeholder="33.5731"
                      className={`w-full border rounded px-3 py-2 text-sm ${
                        errors.lat ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  {/* Longitude */}
                  <div>
                    <label className="block text-sm mb-1">Longitude *</label>
                    <input
                      type="number"
                      step="any"
                      value={form.lng}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(value)) {
                          const normalizedValue = value.replace(/,/g, ".");
                          setForm({ ...form, lng: normalizedValue });
                        }
                      }}
                      placeholder="-7.5898"
                      className={`w-full border rounded px-3 py-2 text-sm ${
                        errors.lng ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>
                {errors.localisation && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.localisation}
                  </p>
                )}

                {/* Carte */}
                <div className="md:col-span-2">
                  <div className="h-64 rounded-lg overflow-hidden mt-4">
                    <MapContainer
                      center={mapCenter}
                      zoom={13}
                      className="h-full w-full"
                      preferCanvas={true}
                      whenReady={(map) => {
                        if (markerPosition) {
                          map.target.setView(markerPosition, 13);
                        }
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <MapClickHandler />
                      {markerPosition && Array.isArray(markerPosition) && (
                        <Marker
                          position={markerPosition}
                          key={`${markerPosition[0]}-${markerPosition[1]}`}
                        />
                      )}
                      <MapUpdater
                        center={markerPosition || mapCenter}
                        zoom={13}
                      />
                    </MapContainer>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Cliquez sur la carte pour positionner le site
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? "Mise à jour..." : "Enregistrer les modifications"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSite;
