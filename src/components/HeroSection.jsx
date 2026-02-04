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
        <div className="mt-10">
          <h1 className="text-4xl hidden sm:block">Anas Khan</h1>
          <p className="text-2xl">Backend/Full-Stack Developer</p>
          <p className="mt-4 text-center">
            Building{" "}
            <span className="font-bold text-orange-400">
              microservice-based systems
            </span>{" "}
            with Node.js, messaging queues, and clean architecture.
          </p>

          <div className="flex flex-col mt-7 items-center space-y-7">
            <div className="rounded-md overflow-hidden p-[.7px] bg-animate w-1/2">
              <button className="px-4 py-2 bg-black/88 rounded-md w-full">
                View Projects
              </button>
            </div>
            <div className="rounded-md overflow-hidden p-[.7px] bg-animate w-1/2">
              <button className="px-4 py-2 bg-black/88 rounded-md w-full">
                Download Resume
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default HeroSection;
