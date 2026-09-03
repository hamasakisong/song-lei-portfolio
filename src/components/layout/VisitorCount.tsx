import { useEffect, useState } from "react";

type VisitCounts = { today: number; total: number };

function isVisitCounts(value: unknown): value is VisitCounts {
  if (typeof value !== "object" || value === null) return false;

  const result = value as Record<string, unknown>;
  return typeof result.today === "number" && Number.isSafeInteger(result.today)
    && typeof result.total === "number" && Number.isSafeInteger(result.total);
}

export function VisitorCount() {
  const [counts, setCounts] = useState<VisitCounts | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      const { default: cloudbase } = await import("@cloudbase/js-sdk");
      const app = cloudbase.init({ env: "hanyusong-d1gv384al5ea5979a" });
      const { error } = await app.auth().signInAnonymously();
      if (error) return;

      const response = await app.callFunction({ name: "site-visits", parse: true });
      if (active && isVisitCounts(response.result)) setCounts(response.result);
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
