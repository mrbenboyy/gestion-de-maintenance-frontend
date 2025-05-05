import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const StatCard = ({ title, value, change, trend, timeframe, icon, iconBg }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
      </div>

      <div className="flex items-center mt-4">
        {trend === "up" ? (
          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-xs font-medium ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}% {trend === "up" ? "Up" : "Down"} from {timeframe}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
