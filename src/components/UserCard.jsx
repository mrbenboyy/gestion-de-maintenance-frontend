import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 relative w-full max-w-xs">
      {/* Edit Icon */}
      <button
        onClick={() => navigate(`/edit-user/${user.id}`)}
        className="absolute top-2 left-5 text-blue-500 hover:text-blue-700"
      >
        <FiEdit />
      </button>

      {/* Trash Icon */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-5 text-red-500 hover:text-red-700"
      >
        <FiTrash2 />
      </button>

      {/* Profile Image */}
      <img
        src={`${process.env.REACT_APP_API_URL}${user.image}`}
        alt={user.nom}
        className="w-24 h-24 mx-auto rounded-full object-cover"
      />

      {/* User Info */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">{user.nom}</h3>
        <p className="text-sm text-gray-500">{user.role}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
