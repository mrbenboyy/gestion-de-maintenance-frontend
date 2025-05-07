import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { AppareilsSection } from "../components/AppareilsSection";
import SideBar from "../components/SideBar";

const AppareilsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <AppareilsSection isFullPage={true} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppareilsPage;
