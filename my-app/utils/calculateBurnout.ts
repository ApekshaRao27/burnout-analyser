import { StressLog, WorkLog } from "@/store/useLogsStore";

export type BurnoutResult = {
  score: number;
  risk: "Low" | "Moderate" | "High";
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const calculateBurnoutScore = (
  workLogs: WorkLog[],
  stressLogs: StressLog[]
): BurnoutResult => {
  const daysCount = Math.max(workLogs.length, 1);

  const totalHours = workLogs.reduce((sum, log) => sum + log.hours, 0);
  const avgHours = totalHours / daysCount;

  const stressPoints = stressLogs.reduce((sum, log) => {
    if (log.level === "Low") return sum + 1;
    if (log.level === "Medium") return sum + 2;
    if (log.level === "High") return sum + 3;
    return sum;
  }, 0);

  const avgStress = stressPoints / daysCount;

  // Normalize to 0–100
  const hoursScore = clamp((avgHours / 10) * 50, 0, 50);   // 10h/day ≈ max
  const stressScore = clamp((avgStress / 3) * 50, 0, 50); // High stress ≈ max

  const score = Math.round(hoursScore + stressScore);

  let risk: BurnoutResult["risk"] = "Low";
  if (score >= 70) risk = "High";
  else if (score >= 35) risk = "Moderate";

  return { score, risk };
};