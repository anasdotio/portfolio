import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

const SplashScreen = ({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowSplash(false);
        onComplete();
      },
    });

    tl.to(".splash-text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    })
      .to(".splash-progress", {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
      }, "<")
      .to(".splash-line", {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(".splash-content", {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power2.in",
        delay: 0.5,
      })
      .to(".splash-overlay", {
        opacity: 0,
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="splash-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-950"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(234,97,19,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(234,97,19,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute h-96 w-96 rounded-full bg-yellow-500/10 blur-[120px]" />

          <div className="splash-content relative flex flex-col items-center px-6 text-center">
            <div className="splash-text mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-yellow-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              Portfolio / 2026
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              className="splash-text mb-2 text-6xl font-bold tracking-tight text-white md:text-8xl"
            >
              <span className="text-yellow-500">A</span>nas
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              className="splash-text text-6xl font-bold tracking-tight text-white md:text-8xl"
            >
              <span className="text-yellow-500">K</span>han
            </motion.h1>

            <div className="splash-line mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="splash-text mt-5 text-sm tracking-[0.35em] text-white/55"
            >
              BACKEND / FULL-STACK DEVELOPER
            </motion.p>
            <div className="mt-10 h-px w-48 overflow-hidden bg-white/10">
              <div className="splash-progress h-full w-full origin-left scale-x-0 bg-yellow-500" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
