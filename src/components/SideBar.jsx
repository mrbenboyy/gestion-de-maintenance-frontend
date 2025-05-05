import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  UserSquare,
  Map,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Wrench,
} from "lucide-react";
import Logo from "../images/logo.png";
import { menuByRole } from "../constants/sidebarMenu";

// Mappage des icônes
const iconComponents = {
  Dashboard: LayoutDashboard,
  Utilisateurs: Users,
  Clients: UserSquare,
  Sites: Map,
  "Stocks & Matériel": BarChart3,
  Interventions: Wrench,
};

const NavItem = ({ icon, label, href, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`
        flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-protec-red text-white"
            : "text-gray-700 hover:bg-protec-red hover:text-white"
        }
        ${isCollapsed ? "justify-center p-2" : ""}
      `}
    >
      <div className={`h-5 w-5 ${isActive ? "text-white" : "text-inherit"}`}>
        {icon}
      </div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = ({ role = "admin" }) => {
  // Prop role avec valeur par défaut
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Récupération du menu selon le rôle
  const menuItems = menuByRole[role] || [];

  // Conversion des items du menu en format compatible
  const navigationItems = menuItems.map((item) => ({
    icon: React.createElement(iconComponents[item.label] || Home),
    label: item.label,
    href: item.path,
  }));

  // Section Settings commune à tous les rôles
  const settingsItems = [
    { icon: <Settings />, label: "Settings", href: "/settings" },
    { icon: <LogOut />, label: "Déconnexion", href: "/logout" },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex justify-center items-center">
        <img
          src={Logo}
          alt="Logo"
          className={`${collapsed ? "h-10" : "h-28"}`}
        />
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 self-end mr-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <Menu size={20} />
      </button>

      {/* Navigation principale */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isCollapsed={collapsed}
          />
        ))}
      </div>

      {/* Section Settings */}
      <div className="px-3 py-4 border-t border-gray-200 space-y-1">
        {settingsItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isCollapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
