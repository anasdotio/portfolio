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
          className="splash-overlay fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-black"
        >
          <div className="splash-content relative flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              className="splash-text text-5xl md:text-7xl font-bold text-white mb-2"
            >
              <span className="text-yellow-500">A</span>nas
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              className="splash-text text-5xl md:text-7xl font-bold text-white"
            >
              <span className="text-yellow-500">K</span>han
            </motion.h1>

            <div className="splash-line w-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mt-4 rounded-full" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="splash-text text-white/70 text-lg mt-4 tracking-widest"
            >
              Full Stack Developer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
