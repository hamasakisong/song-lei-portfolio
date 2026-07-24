import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(3px)" }}
      transition={{ duration: reduced ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
