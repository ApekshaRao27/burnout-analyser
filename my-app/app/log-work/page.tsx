"use client";

import { useState } from "react";
import { useLogsStore } from "@/store/useLogsStore";

export default function LogWorkPage() {
  const [hours, setHours] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const addWorkLog = useLogsStore((state) => state.addWorkLog);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const num = Number(hours);
    if (!num || num < 0 || num > 24) return;

    addWorkLog({
      hours: num,
      date: new Date().toISOString(),
    });

    setSuccess(true);
    setHours("");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Work Hours</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours worked today"
          className="border p-2 w-full rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-3">
          Work log saved successfully ✅
        </p>
      )}
    </div>
  );
}