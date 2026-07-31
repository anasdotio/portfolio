import { useState } from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skill from "./components/Skill";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Education from "./components/Education";
import ProjectSection from "./components/ProjectSection";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setShowContent(true)} />

      <section
        className={`relative w-full min-h-screen overflow-hidden bg-zinc-950 text-white transition-colors duration-500 px-4 ${showContent ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 0.5s ease-in-out" }}
      >
        {/* SVG BACKGROUND */}
        <svg
          viewBox="0 0 1440 900"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="yellowGlow">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Rectangle */}
          <rect
            width="100%"
            height="100%"
            className="fill-zinc-950 transition-colors duration-500"
          />

          <circle cx="1100" cy="350" r="420" fill="url(#yellowGlow)" />
        </svg>

        {/* CONTENT */}
        <div className="relative z-10 min-h-screen text-white transition-colors duration-500">
          <Navbar />
          <HeroSection />
          <About />
          <Skill />
          <ProjectSection />
          <Education />
          <ContactUs />
          <Footer />
        </div>
      </section>
    </>
  );
};

export default App;
