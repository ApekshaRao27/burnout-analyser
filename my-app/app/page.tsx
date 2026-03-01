"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLogsStore } from "@/store/useLogsStore";
import { BurnoutResult, calculateBurnoutScore } from "@/utils/calculateBurnout";
import WeeklyChart from "@/components/WeeklyCharts";
const isWithinLast7Days = (isoDate: string) => {
  const logDate = new Date(isoDate);
  const now = new Date();
  const diffInDays =
    (now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
};

export default function Dashboard() {
  const { workLogs, stressLogs, clearAll } = useLogsStore();
  const [result, setResult] = useState<BurnoutResult>({
    score: 0,
    risk: "Low",
  });

  useEffect(() => {
    const weeklyWorkLogs = workLogs.filter((log) =>
      isWithinLast7Days(log.date)
    );
    const weeklyStressLogs = stressLogs.filter((log) =>
      isWithinLast7Days(log.date)
    );

    setResult(calculateBurnoutScore(weeklyWorkLogs, weeklyStressLogs));
  }, [workLogs, stressLogs]);

  const totalHours = workLogs.reduce((sum, log) => sum + log.hours, 0);
  const totalEntries = workLogs.length + stressLogs.length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Burnout Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <div className="bg-white shadow rounded-xl p-5 border-l-4 border-blue-500">
    <p className="text-sm text-gray-500">Burnout Score</p>
    <p className="text-3xl font-bold">{result.score}</p>
  </div>

  <div className="bg-white shadow rounded-xl p-5 border-l-4 border-purple-500">
    <p className="text-sm text-gray-500">Risk Level</p>
    <p
      className={`text-3xl font-bold ${
        result.risk === "High"
          ? "text-red-600"
          : result.risk === "Moderate"
          ? "text-yellow-600"
          : "text-green-600"
      }`}
    >
      {result.risk}
    </p>
  </div>

  <div className="bg-white shadow rounded-xl p-5 border-l-4 border-green-500">
    <p className="text-sm text-gray-500">Total Hours Logged</p>
    <p className="text-3xl font-bold">{totalHours}</p>
  </div>
</div>

      {totalEntries === 0 && (
        <div className="bg-blue-50 p-4 rounded mb-6">
          <p className="font-semibold">No data yet</p>
          <p className="text-sm text-gray-600">
            Start by logging today’s work hours and stress level.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/log-work"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Log Work Hours
        </Link>

        <Link
          href="/log-stress"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Log Stress
        </Link>

        <Link
          href="/insights"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          View Insights
        </Link>

        <button
          onClick={clearAll}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear All Logs
        </button>
      </div>
      {workLogs.length > 0 && (
  <div className="mt-6">
    <WeeklyChart data={workLogs.slice(-7)} />
  </div>
)}
    </div>
  );
}