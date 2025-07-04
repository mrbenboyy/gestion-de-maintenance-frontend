// api.js (Correction finale)
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ne pas rediriger pour les routes de login
    const isAuthRequest =
      error.config.url.includes("/auth/login") ||
      error.config.url.includes("/auth/client-login");

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !isAuthRequest
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
