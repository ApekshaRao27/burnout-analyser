"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { WorkLog } from "@/store/useLogsStore";

type Props = {
  data: WorkLog[];
};

export default function WeeklyChart({ data }: Props) {
  const chartData = data.map((log) => ({
    date: new Date(log.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    hours: log.hours,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">Work Hours Trend (Last 7 Days)</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}