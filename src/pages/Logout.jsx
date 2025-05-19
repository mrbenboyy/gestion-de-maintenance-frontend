import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Suppression du token
    localStorage.removeItem("token");

    // Redirection vers la page de login
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
