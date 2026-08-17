import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    const frame = requestAnimationFrame(() => {
      if (hash === "#work") {
        document.getElementById("work")?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}
