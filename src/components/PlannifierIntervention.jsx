import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import InterventionForm from "../pages/InterventionForm";

const PlanifierIntervention = () => {
  return (
    <div>
      <DashboardHeader />

      <main className="p-8 bg-gray-50">
        <InterventionForm />
      </main>
    </div>
  );
};

export default PlanifierIntervention;
