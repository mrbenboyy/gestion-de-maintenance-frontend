import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <DashboardHeader />
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold">Utilisateurs</h2>
          <button
            onClick={() => navigate("/add-user")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Ajouter utilisateur
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="flex items-center gap-4 px-6 mb-4">
          <input
            type="text"
            placeholder="Chercher utilisateur"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-4 py-2 w-full max-w-md"
          />
        </div>

        {/* Grille des utilisateurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-10">
          {loading ? (
            <div>Chargement...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
