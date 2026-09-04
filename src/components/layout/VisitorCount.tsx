import { useEffect, useState } from "react";

type VisitCounts = { today: number; total: number };

const counterBaseUrl = "https://countapi.mileshilliard.com/api/v1/hit";
const counterPrefix = "songlei-portfolio-hanyusong-2026";

function getTodayCounterKey() {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return `${counterPrefix}-daily-${date}`;
}

function isCounterValue(value: unknown): value is { value: number } {
  if (typeof value !== "object" || value === null) return false;

  const result = value as Record<string, unknown>;
  return typeof result.value === "number" && Number.isSafeInteger(result.value);
}

export function VisitorCount() {
  const [counts, setCounts] = useState<VisitCounts | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      const [todayResponse, totalResponse] = await Promise.all([
        fetch(`${counterBaseUrl}/${getTodayCounterKey()}`),
        fetch(`${counterBaseUrl}/${counterPrefix}-total`),
      ]);
      const [todayData, totalData] = await Promise.all([todayResponse.json(), totalResponse.json()]);

      if (active && isCounterValue(todayData) && isCounterValue(totalData)) {
        setCounts({ today: todayData.value, total: totalData.value });
      }
    })().catch(() => undefined);

    return () => { active = false; };
  }, []);

  if (counts === null) return null;

  return (
    <span className="visitor-count" aria-label={`今日访问 ${counts.today} 次，累计访问 ${counts.total} 次`}>
      今日 {counts.today.toLocaleString()} · 累计 {counts.total.toLocaleString()}
    </span>
  );
}
