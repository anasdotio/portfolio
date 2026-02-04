import React from "react";
import Navbar from "./Navbar";

const HeroSection = () => {
  // return (
  //   <div>
  //     <div>
  //       <h1>Anas Khan</h1>
  //       <p>Backend/Full-Stack Developer</p>
  //       <p>
  //         Building microservice-based systems with Node.js, messaging queues,
  //         and clean architecture.
  //       </p>

  //       <div>
  //         <button>View Projects</button>
  //         <button>Download Resume</button>
  //       </div>
  //     </div>
  //     <div></div>
  //   </div>
  // );

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* SVG BACKGROUND */}
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b0b0b" />
            <stop offset="100%" stopColor="#1a0c02" />
          </linearGradient>

          <radialGradient id="orangeGlow">
            <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        {/* Glow */}
        <circle cx="1100" cy="350" r="420" fill="url(#orangeGlow)" />

        {/* Dots */}
        <g opacity="0.2">
          {[...Array(60)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 80) % 1440}
              cy={(i * 55) % 900}
              r="2"
              fill="#ff6a00"
            />
          ))}
        </g>
      </svg>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen  px-6 ">
        <Navbar />
        <div className="mt-6">
          <h1 className="text-4xl">Anas Khan</h1>
          <p className="text-2xl">Backend/Full-Stack Developer</p>
          <p className="mt-4 text-center">
            Building{" "}
            <span className="font-bold text-orange-400">
              microservice-based systems
            </span>{" "}
            with Node.js, messaging queues, and clean architecture.
          </p>

          <div className="flex flex-col mt-6 items-center">
            <div className="rounded-md bg-linear-to-r from-white/30 via-orange-400 to-white/30 p-[.7px]">
              <button className="px-4 py-2 bg-black/80 rounded-md">
                View Projects
              </button>
            </div>
            <button>Download Resume</button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default HeroSection;
