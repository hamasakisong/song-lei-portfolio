import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduced ? 1000 : 150,
    damping: reduced ? 100 : 28,
    mass: 0.25,
  });
  return <motion.div className="reading-progress" style={{ scaleX }} aria-hidden="true" />;
}
