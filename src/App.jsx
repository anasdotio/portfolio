import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import HeroSection from "./components/HeroSection";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skill from "./components/Skill";
import ProjectSection from "./components/ProjectSection";
import Process from "./components/Process";
import Education from "./components/Education";
import Toolbelt from "./components/Toolbelt";
import Certificates from "./components/Certificates";
import ContactUs from "./components/ContactUs";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";

const App = () => (
  // The `prefers-reduced-motion` block in index.css only reaches CSS
  // transitions and keyframes — Motion drives its own animations from JS,
  // so it needs telling separately.
  <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-ink-950 text-bone-200">
      <Background />
      <Navbar />

      <main>
        <HeroSection />
        <Marquee />
        <About />
        <Skill />
        <ProjectSection />
        <Process />
        <Education />
        <Toolbelt />
        <Certificates />
        <ContactUs />
        <ClosingCta />
      </main>

      <Footer />
    </div>
  </MotionConfig>
);

export default App;
