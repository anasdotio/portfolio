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
import ContactUs from "./components/ContactUs";
import ClosingCta from "./components/ClosingCta";
import Footer from "./components/Footer";

const App = () => (
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
      <ContactUs />
      <ClosingCta />
    </main>

    <Footer />
  </div>
);

export default App;
