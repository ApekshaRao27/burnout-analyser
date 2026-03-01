"use client";

import { useState } from "react";
import { StressLevel, useLogsStore } from "@/store/useLogsStore";

export default function LogStressPage() {
  const [stress, setStress] = useState<StressLevel | "">("");
  const [success, setSuccess] = useState<boolean>(false);

  const addStressLog = useLogsStore((state) => state.addStressLog);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stress) return;

    addStressLog({
      level: stress,
      date: new Date().toISOString(),
    });

    setSuccess(true);
    setStress("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Stress Level</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={stress}
          onChange={(e) => setStress(e.target.value as StressLevel)}
          className="border p-2 w-full rounded"
        >
          <option value="">Select stress level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-3">
          Stress log saved successfully ✅
        </p>
      )}
    </div>
  );
}