import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from "recharts";

const data = [
  { mois: "Janvier", value: 12 },
  { mois: "Février", value: 35 },
  { mois: "Mars", value: 28 },
  { mois: "Avril", value: 198 },
  { mois: "Mai", value: 45 },
  { mois: "Juin", value: 65 },
  { mois: "Juillet", value: 30 },
  { mois: "Août", value: 42 },
  { mois: "Septembre", value: 90 },
  { mois: "Octobre", value: 68 },
  { mois: "Novembre", value: 55 },
  { mois: "Décembre", value: 63 },
];

const InterventionsChart = () => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const maxMonth = data.find((item) => item.value === maxValue)?.mois;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorInterventions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis
          dataKey="mois"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#999", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#999", fontSize: 12 }}
          domain={[0, "dataMax + 50"]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
          labelStyle={{ fontWeight: "bold", color: "#333" }}
        />
        <ReferenceLine
          x={maxMonth}
          stroke="#3366ff"
          strokeWidth={2}
          strokeDasharray="3 3"
          label={{
            value: maxValue,
            position: "top",
            fill: "#3366ff",
            fontSize: 12,
            fontWeight: "bold",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ff4d4d"
          fillOpacity={1}
          fill="url(#colorInterventions)"
          strokeWidth={2}
          dot={(props) => {
            const { cx, cy, index } = props;
            return data[index]?.value === maxValue ? (
              <Dot
                cx={cx}
                cy={cy}
                r={6}
                fill="#3366ff"
                stroke="#fff"
                strokeWidth={2}
              />
            ) : (
              <Dot
                cx={cx}
                cy={cy}
                r={4}
                fill="#ff4d4d"
                stroke="#fff"
                strokeWidth={2}
              />
            );
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InterventionsChart;
