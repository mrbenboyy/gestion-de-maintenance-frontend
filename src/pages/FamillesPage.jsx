import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { FamillesSection } from "../components/FamillesSection";

const FamillesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1">
          <DashboardHeader />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <FamillesSection isFullPage={true} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default FamillesPage;
