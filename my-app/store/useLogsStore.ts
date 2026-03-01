import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WorkLog = {
  hours: number;
  date: string;
};

export type StressLevel = "Low" | "Medium" | "High";

export type StressLog = {
  level: StressLevel;
  date: string;
};

type LogsStore = {
  workLogs: WorkLog[];
  stressLogs: StressLog[];
  addWorkLog: (log: WorkLog) => void;
  addStressLog: (log: StressLog) => void;
  clearAll: () => void;
};

export const useLogsStore = create<LogsStore>()(
  persist(
    (set) => ({
      workLogs: [],
      stressLogs: [],
      addWorkLog: (log) =>
        set((state) => ({ workLogs: [...state.workLogs, log] })),
      addStressLog: (log) =>
        set((state) => ({ stressLogs: [...state.stressLogs, log] })),
      clearAll: () => set({ workLogs: [], stressLogs: [] }),
    }),
    {
      name: "burnout-logs-storage", // key in localStorage
    }
  )
);