"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({ RoomData }) {
  // Create an array to hold the number of rooms created in each month
  const roomsByMonth = Array.from({ length: 12 }, () => 0);

  // Iterate through the RoomData and count the number of rooms created in each month
  RoomData.forEach(room => {
    const month = new Date(room.createdAt).getMonth();
    roomsByMonth[month]++;
  });

  // Prepare the data for the chart
  const data = [
    { name: "Jan", total: roomsByMonth[0] },
    { name: "Feb", total: roomsByMonth[1] },
    { name: "Mar", total: roomsByMonth[2] },
    { name: "Apr", total: roomsByMonth[3] },
    { name: "May", total: roomsByMonth[4] },
    { name: "Jun", total: roomsByMonth[5] },
    { name: "Jul", total: roomsByMonth[6] },
    { name: "Aug", total: roomsByMonth[7] },
    { name: "Sep", total: roomsByMonth[8] },
    { name: "Oct", total: roomsByMonth[9] },
    { name: "Nov", total: roomsByMonth[10] },
    { name: "Dec", total: roomsByMonth[11] },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}