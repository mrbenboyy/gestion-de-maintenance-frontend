import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { ArticlesSection } from "../components/ArticlesSection";
import SideBar from "../components/SideBar";

const ArticlesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <ArticlesSection isFullPage={true} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
