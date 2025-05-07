import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />
        <DashboardStats />
      </div>
    </div>
  );
};

export default Dashboard;
