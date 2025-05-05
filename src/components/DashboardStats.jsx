import React from "react";
import { Users, Package, Map, Clock } from "lucide-react";
import StatCard from "./StatCard";
import InterventionsChart from "./InterventionsChart";

const DashboardStats = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total d'utilisateurs"
          value={406}
          change={8.5}
          trend="up"
          timeframe="yesterday"
          icon={<Users className="h-6 w-6 text-indigo-400" />}
          iconBg="bg-indigo-100"
        />

        <StatCard
          title="Nombre de clients"
          value={102}
          change={1.3}
          trend="up"
          timeframe="past week"
          icon={<Package className="h-6 w-6 text-amber-400" />}
          iconBg="bg-amber-100"
        />

        <StatCard
          title="Nombre de sites"
          value={890}
          change={4.3}
          trend="down"
          timeframe="yesterday"
          icon={<Map className="h-6 w-6 text-emerald-400" />}
          iconBg="bg-emerald-100"
        />

        <StatCard
          title="Nombre d'articles en stock"
          value={2040}
          change={1.8}
          trend="up"
          timeframe="yesterday"
          icon={<Clock className="h-6 w-6 text-rose-400" />}
          iconBg="bg-rose-100"
        />
      </div>

      {/* Graphique des interventions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Détails des interventions
        </h2>
        <div className="h-80">
          <InterventionsChart />
        </div>
      </div>
    </div>
  </div>
);

export default DashboardStats;
