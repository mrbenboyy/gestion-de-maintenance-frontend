import React from "react";
import { menuByRole } from "../constants/sidebarMenu";
import { FiLogOut } from "react-icons/fi";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ role = "admin" }) => {
  const menu = menuByRole[role] || [];

  return (
    <div className="bg-white w-64 h-screen shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 flex justify-center items-center">
          <img src={Logo} alt="Logo" className="h-28" />
        </div>
        <ul className="px-4">
          {menu.map((item, idx) => (
            <li key={idx} className="mb-3">
              <Link
                to={item.path}
                className="block py-2 px-4 rounded hover:bg-red-100 text-gray-700 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t">
        <button className="flex items-center gap-2 text-red-600">
          <FiLogOut /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
