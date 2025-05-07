import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare,
  Map,
  BarChart3,
  Settings,
  LogOut,
  Wrench,
  CalendarPlus,
  ClipboardList,
  PackageCheck,
  Calendar,
  Package,
  ClipboardCheck,
  Bell,
  MapPinCheck,
} from "lucide-react";
import Logo from "../images/logo.png";
import { menuByRole } from "../constants/sidebarMenu";

const iconComponents = {
  Dashboard: LayoutDashboard,
  Utilisateurs: Users,
  Clients: UserSquare,
  Sites: Map,
  "Stocks & Matériel": BarChart3,
  Interventions: Wrench,
  Dashboard: LayoutDashboard,
  "Planifier intervention": CalendarPlus,
  "Suivi des interventions": ClipboardList,
  "Suivi des commandes": PackageCheck,
  "Mon planning": Calendar,
  "Demandes de matériel": Package,
  "Fiche de vérification": ClipboardCheck,
  Notifications: Bell,
  "Suivi des visites": MapPinCheck,
  Techniciens: Users,
};

const NavItem = ({ icon, label, href }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`
        flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
        ${
          isActive
            ? "bg-protec-red text-white"
            : "text-gray-700 hover:bg-protec-red hover:text-white"
        }
      `}
    >
      <div className={`h-5 w-5 ${isActive ? "text-white" : "text-inherit"}`}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = ({ role = "admin" }) => {
  const menuItems = menuByRole[role] || [];
  const navigationItems = menuItems.map((item) => ({
    icon: React.createElement(iconComponents[item.label]),
    label: item.label,
    href: item.path,
  }));

  const settingsItems = [
    { icon: <Settings />, label: "Paramètres", href: "/settings" },
    { icon: <LogOut />, label: "Déconnexion", href: "/logout" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r">
      <div className="p-6 flex justify-center items-center">
        <img src={Logo} alt="Logo" className="h-28" />
      </div>

      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>

      <div className="px-3 py-4 border-t border-gray-200 space-y-1">
        {settingsItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
