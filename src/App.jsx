import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skill from "./components/Skill";

const App = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* SVG BACKGROUND */}
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="orangeGlow">
            <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="black" />
        <circle cx="1100" cy="350" r="420" fill="url(#orangeGlow)" />
      </svg>

      {/* CONTENT */}
      <div className="relative z-10 px-6 min-h-screen">
        <Navbar />
        <HeroSection />
        <About />
        <Skill />
      </div>
    </section>
  );
};

export default App;
