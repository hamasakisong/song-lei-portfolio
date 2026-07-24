import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function MistField() {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 22 });
  const nearX = useTransform(smoothX, (value) => value * 20);
  const nearY = useTransform(smoothY, (value) => value * 14);
  const farX = useTransform(smoothX, (value) => value * -10);
  const farY = useTransform(smoothY, (value) => value * -8);

  useEffect(() => {
    if (reduced) return;
    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [pointerX, pointerY, reduced]);

  return (
    <div className="mist-field" aria-hidden="true">
      <motion.span className="mist-parallax mist-parallax--one" style={reduced ? undefined : { x: nearX, y: nearY }}><span className="mist mist--one" /></motion.span>
      <motion.span className="mist-parallax mist-parallax--two" style={reduced ? undefined : { x: farX, y: farY }}><span className="mist mist--two" /></motion.span>
      <motion.span className="mist-dots" style={reduced ? undefined : { x: farX, y: farY }} />
    </div>
  );
}
