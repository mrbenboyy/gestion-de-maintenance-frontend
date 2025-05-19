import React, { useState, useEffect } from "react";
import api from "../utils/api";

const DashboardHeader = () => {
  const [userData, setUserData] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser || null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.id) {
          const response = await api.get(`/users/${storedUser.id}`);
          setUserData({
            ...response.data,
            image: response.data.image
              ? `${process.env.REACT_APP_API_URL}${response.data.image}`
              : null,
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...storedUser,
              ...response.data,
            })
          );
        }
      } catch (error) {
        console.error("Erreur de mise à jour des données:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserData(storedUser);
    };

    window.addEventListener("userUpdate", handleUserUpdate);
    return () => window.removeEventListener("userUpdate", handleUserUpdate);
  }, []);

  return (
    <div className="flex justify-end items-center px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-4">
        {userData?.image ? (
          <img
            src={userData.image}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border-2 border-red-100"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 font-bold">
              {userData?.nom?.charAt(0) || "U"}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold">
            {userData?.nom || "Utilisateur"}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {userData?.role?.replace("_", " ") || "Rôle inconnu"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
