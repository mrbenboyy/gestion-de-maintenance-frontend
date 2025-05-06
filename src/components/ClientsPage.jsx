import React, { useState } from "react";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import ClientCard from "./ClientCard";
import Sidebar from "./SideBar";
import DashboardHeader from "./DashboardHeader";

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("Contrat");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Clients
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 md:w-64">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Chercher client"
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filtrer par</span>
                  </button>

                  <div className="relative">
                    <select
                      className="appearance-none bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    >
                      <option>Contrat</option>
                      <option>Nom</option>
                      <option>Date</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
                    Ajouter client
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ClientCard
                name="Total Energies"
                email="guillaume@totalenergy.com"
                logoSrc="/images/25d35f7e-8be2-4ad0-aabc-0e5daabd349e.png"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientsPage;
