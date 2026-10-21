import { motion } from "motion/react";

/**
 * Scroll-triggered reveal. Wraps children in a motion.div that fades and
 * lifts into place once, when it enters the viewport.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 28,
  duration = 0.6,
  className = "",
  as = "div",
}) => {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
