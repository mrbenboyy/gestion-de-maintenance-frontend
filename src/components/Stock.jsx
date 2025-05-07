import React from "react";
import { FamillesSection } from "./FamillesSection";
import DashboardHeader from "./DashboardHeader";
import { ArticlesSection } from "./ArticlesSection";
import { AppareilsSection } from "./AppareilsSection";

const Stock = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">

        <div className="flex-1">
          <DashboardHeader />

          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <FamillesSection />
            <ArticlesSection />
            <AppareilsSection />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Stock;
