import profileImage from "../assets/profile.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div
      id="home"
      className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 mt-12 items-center text-white px-4"
    >
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center dark:text-white text-black md:text-left"
      >
        <h1 className="text-4xl hidden md:text-5xl md:block font-semibold">
          Anas Khan
        </h1>

        <p className="text-2xl mt-4 ">Backend / Full-Stack Developer</p>

        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0">
          Building{" "}
          <span className="text-orange-400 font-medium">
            microservice-based systems
          </span>{" "}
          with Node.js, messaging queues, and clean architecture.
        </p>

        <div className="mt-6 flex justify-center md:justify-start gap-4">
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-md transition">
            View Projects
          </button>

          <a
            href="/Anas-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-black/10 dark:border-white/20 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition"
          >
            Resume
          </a>
        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-orange-500 blur-3xl opacity-20 bg-animate"></div>

          <img
            src={profileImage}
            alt="Anas Khan"
            className="relative w-64 h-64 md:w-72 md:h-72 object-cover object-top rounded-full border border-white/10 shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
