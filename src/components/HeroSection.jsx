import Navbar from "./Navbar";
import About from "./About";
import Skill from "./Skill";
import profileImage from "../assets/profile.jpg";

const HeroSection = () => {
  return (
    <section className="relative  overflow-hidden  text-white">
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
        {/* <rect width="100%" height="100%" fill="url(#bgGradient)" /> */}
        <rect width="100%" height="100%" fill="black" />

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
      <div className="relative z-10  px-6 min-h-screen ">
        <Navbar />
        <section className="flex items-center justify-center mt-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
            {/* LEFT CONTEXT */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-semibold hidden md:block">
                Anas Khan
              </h1>

              <p className="text-2xl mt-4">Backend / Full-Stack Developer</p>

              <p className="mt-4 text-gray-300 max-w-md">
                Building{" "}
                <span className="text-orange-400 font-medium">
                  {" "}
                  microservice-based systems
                </span>{" "}
                with Node.js, messaging queues, and clean architecture.
              </p>

              <div className="rounded-md overflow-hidden p-[.8px] bg-animate md:max-w-md mt-4">
                <button className="px-4 py-2 bg-black/88 rounded-md w-full">
                  View Projects
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}

            <div className="flex justify-center">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-orange-500 blur-3xl opacity-20"></div>

                {/* Image */}
                <img
                  src={profileImage} // <-- replace with your image
                  alt="Anas Khan"
                  className="relative w-64 h-64 object-cover rounded-full border border-white/10 shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <div></div> */}
        <About />
        <Skill />
      </div>
    </section>
  );
};

export default HeroSection;
