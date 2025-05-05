import api from "../utils/api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      mot_de_passe: password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Email ou mot de passe incorrect";
    throw new Error(errorMessage);
  }
};

export const loginClient = async (email, password) => {
  try {
    const response = await api.post("/auth/client-login", {
      email,
      mot_de_passe: password,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Identifiants invalides";
    throw new Error(errorMessage);
  }
};
