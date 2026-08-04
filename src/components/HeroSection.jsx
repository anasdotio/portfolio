import profileImage from "../assets/profile.png";
import { motion } from "motion/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      id="home"
      className="mx-auto mt-12 grid max-w-5xl items-center gap-12 px-4 text-white md:grid-cols-[1.1fr_0.9fr]"
    >
      {/* LEFT CONTENT */}
      <div className="text-center text-white md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-semibold"
        >
          Anas Khan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl mt-4"
        >
          Backend / Full-Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0"
        >
          Building{" "}
          <span className="text-yellow-400 font-medium">
            microservice-based systems
          </span>{" "}
          with Node.js, messaging queues, and clean architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex justify-center md:justify-start gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-zinc-950 rounded-md transition"
          >
            View Projects
          </motion.button>

          <motion.a
            href="/Anas-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-white/20 rounded-md hover:bg-white/10 transition"
          >
            Resume
          </motion.a>
        </motion.div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center md:justify-center">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className=""
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-20 bg-animate"></div>

          <img
            src={profileImage}
            alt="Anas Khan"
            className=" h-64 w-64 border rounded-full border-white/10 object-cover object-top shadow-xl md:h-72 md:w-72"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
