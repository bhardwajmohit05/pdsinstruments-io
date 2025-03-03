
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for different time periods
const hourlyData = [
  { time: "00:00", value: 12 },
  { time: "01:00", value: 10 },
  { time: "02:00", value: 8 },
  { time: "03:00", value: 7 },
  { time: "04:00", value: 6 },
  { time: "05:00", value: 8 },
  { time: "06:00", value: 10 },
  { time: "07:00", value: 15 },
  { time: "08:00", value: 20 },
  { time: "09:00", value: 25 },
  { time: "10:00", value: 28 },
  { time: "11:00", value: 30 },
  { time: "12:00", value: 35 },
  { time: "13:00", value: 32 },
  { time: "14:00", value: 30 },
  { time: "15:00", value: 29 },
  { time: "16:00", value: 27 },
  { time: "17:00", value: 25 },
  { time: "18:00", value: 24 },
  { time: "19:00", value: 22 },
  { time: "20:00", value: 20 },
  { time: "21:00", value: 18 },
  { time: "22:00", value: 16 },
  { time: "23:00", value: 14 },
];

const dailyData = [
  { time: "Mon", value: 120 },
  { time: "Tue", value: 145 },
  { time: "Wed", value: 135 },
  { time: "Thu", value: 150 },
  { time: "Fri", value: 160 },
  { time: "Sat", value: 180 },
  { time: "Sun", value: 190 },
];

const weeklyData = [
  { time: "Week 1", value: 850 },
  { time: "Week 2", value: 920 },
  { time: "Week 3", value: 880 },
  { time: "Week 4", value: 930 },
];

const monthlyData = [
  { time: "Jan", value: 3500 },
  { time: "Feb", value: 3200 },
  { time: "Mar", value: 3400 },
  { time: "Apr", value: 3600 },
  { time: "May", value: 3800 },
  { time: "Jun", value: 4000 },
  { time: "Jul", value: 4200 },
  { time: "Aug", value: 4300 },
  { time: "Sep", value: 4100 },
  { time: "Oct", value: 3900 },
  { time: "Nov", value: 3700 },
  { time: "Dec", value: 3800 },
];

interface DeviceChartProps {
  timeRange: string;
}

const DeviceChart: React.FC<DeviceChartProps> = ({ timeRange }) => {
  // Select data based on time range
  const getData = () => {
    switch (timeRange) {
      case "hourly":
        return hourlyData;
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getUnit = () => {
    switch (timeRange) {
      case "hourly":
        return "m³/hour";
      case "daily":
        return "m³/day";
      case "weekly":
        return "m³/week";
      case "monthly":
        return "m³/month";
      default:
        return "m³";
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={getData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" />
        <YAxis unit=" m³" />
        <Tooltip formatter={(value) => [`${value} m³`, "Consumption"]} />
        <Legend />
        <Bar 
          dataKey="value" 
          name={`Water Consumption (${getUnit()})`}
          fill="#3b82f6" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeviceChart;
