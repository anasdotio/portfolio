import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skill from "./components/Skill";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Education from "./components/Education";
import ProjectSection from "./components/ProjectSection";

const App = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-500 px-4">
      {/* SVG BACKGROUND */}
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Light Theme Gradient */}
          <radialGradient id="orangeGlowLight">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>

          {/* Dark Theme Gradient */}
          <radialGradient id="orangeGlowDark">
            <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Rectangle */}
        <rect
          width="100%"
          height="100%"
          className="fill-white dark:fill-black transition-colors duration-500"
        />

        {/* Glow for Light Mode */}
        <circle
          cx="1100"
          cy="350"
          r="420"
          fill="url(#orangeGlowLight)"
          className="dark:hidden"
        />

        {/* Glow for Dark Mode */}
        <circle
          cx="1100"
          cy="350"
          r="420"
          fill="url(#orangeGlowDark)"
          className="hidden dark:block"
        />
      </svg>

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen text-black dark:text-white transition-colors duration-500">
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
  );
};

export default App;
