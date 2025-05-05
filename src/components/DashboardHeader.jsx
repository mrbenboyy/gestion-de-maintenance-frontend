import React from "react";

const DashboardHeader = () => (
  <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
    <input
      type="text"
      placeholder="Search"
      className="border rounded px-4 py-1 w-1/3"
    />
    <div className="flex items-center gap-4">
      <span>English</span>
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        alt="Profile"
        className="h-8 w-8 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold">Moni Roy</p>
        <p className="text-xs text-gray-500">Admin</p>
      </div>
    </div>
  </div>
);

export default DashboardHeader;
