import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let retryTimer: number | undefined;
    let attempts = 0;

    const applyScroll = () => {
      if (pathname === "/" && hash === "#work") {
        const workSection = document.getElementById("work");
        if (!workSection && attempts < 15) {
          attempts += 1;
          retryTimer = window.setTimeout(applyScroll, 50);
          return;
        }

        workSection?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    };

    const frame = requestAnimationFrame(applyScroll);

    return () => {
      cancelAnimationFrame(frame);
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
    };
  }, [hash, pathname]);

  return null;
}
