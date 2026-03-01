"use client";

import { useLogsStore } from "@/store/useLogsStore";
import { calculateBurnoutScore } from "@/utils/calculateBurnout";

const isWithinLast7Days = (isoDate: string) => {
  const logDate = new Date(isoDate);
  const now = new Date();
  const diffInDays =
    (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
};

export default function InsightsPage() {
  const { workLogs, stressLogs } = useLogsStore();

  const weeklyWorkLogs = workLogs.filter((log) =>
    isWithinLast7Days(log.date)
  );
  const weeklyStressLogs = stressLogs.filter((log) =>
    isWithinLast7Days(log.date)
  );

  const { score, risk } = calculateBurnoutScore(
    weeklyWorkLogs,
    weeklyStressLogs
  );

  const totalHours = weeklyWorkLogs.reduce((sum, log) => sum + log.hours, 0);
  const avgHours =
    weeklyWorkLogs.length > 0
      ? (totalHours / weeklyWorkLogs.length).toFixed(1)
      : "0";

  const highStressDays = weeklyStressLogs.filter(
    (s) => s.level === "High"
  ).length;

  const recommendation =
    risk === "High"
      ? "You’ve had several intense days this week. Slow down and protect your energy."
      : risk === "Moderate"
      ? "Your workload is building up. Try adding breaks and planning lighter days."
      : "Nice balance this week. Keep it sustainable!";

  return (
   <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Weekly Insights (Last 7 Days)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Avg Hours / Day</p>
          <p className="text-xl font-bold">{avgHours}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">High Stress Days</p>
          <p className="text-xl font-bold">{highStressDays}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Burnout Risk (This Week)</p>
          <p className="text-xl font-bold">{risk}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h2 className="font-semibold mb-2">Personalized Recommendation</h2>
        <p>{recommendation}</p>
      </div>
    </div>
  );
}