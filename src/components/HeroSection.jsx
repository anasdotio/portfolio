import profileImage from "../assets/profile.png";
import { motion } from "motion/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";

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
      className="mx-auto mt-16 grid min-h-[calc(100vh-130px)] max-w-6xl items-center gap-16 px-4 pb-16 text-white md:grid-cols-[1.1fr_0.9fr]"
    >
      {/* LEFT CONTENT */}
      <div className="text-center text-white md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-yellow-200"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          Available for meaningful projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
        >
          Building systems
          <span className="block text-yellow-400">that scale.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-xl text-gray-300 sm:text-2xl"
        >
          Backend / Full-Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400 md:mx-0 md:text-lg"
        >
          I design{" "}
          <span className="font-medium text-yellow-300">
            reliable APIs and microservice-based systems
          </span>{" "}
          with Node.js, messaging queues, and clean architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-medium text-zinc-950 transition hover:bg-yellow-400"
          >
            View Projects <ArrowUpRight className="h-4 w-4" />
          </motion.a>

          <motion.a
            href="/Anas-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 font-medium text-white transition hover:border-yellow-400/40 hover:bg-white/5"
          >
            <Download className="h-4 w-4 text-yellow-400" />
            Resume
          </motion.a>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-5 text-left md:justify-start">
          <div>
            <p className="text-2xl font-semibold text-white">04+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Core domains
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">Node.js</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Primary stack
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-yellow-400" />
            India
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex w-full justify-center md:justify-end">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="bg-animate absolute -inset-8 rounded-full opacity-40 blur-3xl" />

          <div className="relative rounded-[2rem] border border-yellow-400/20 bg-white/[0.03] p-3 shadow-[0_0_60px_rgba(234,97,19,0.12)] backdrop-blur-sm">
            <div className="absolute -right-3 -top-3 rounded-lg border border-yellow-400/30 bg-zinc-950 px-3 py-1.5 font-mono text-[10px] tracking-widest text-yellow-300">
              BUILD / SHIP
            </div>

            <img
              src={profileImage}
              alt="Anas Khan"
              className="h-72 w-72 rounded-[1.5rem] border border-white/10 object-cover object-top shadow-xl sm:h-80 sm:w-80"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
