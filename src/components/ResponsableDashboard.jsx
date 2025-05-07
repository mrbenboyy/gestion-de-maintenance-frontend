import React from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";

const ResponsableDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="responsable_planning" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />
        <DashboardStats />
      </div>
    </div>
  );
};

export default ResponsableDashboard;
