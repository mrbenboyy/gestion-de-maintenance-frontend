import React from "react";
import Sidebar from "./SideBar";

const Layout = ({ children }) => {
  // Récupération du rôle de l'utilisateur depuis localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;

  return (
    <div className="flex">
      <Sidebar role={role} /> {/* Transmission du rôle */}
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
};

export default Layout;
