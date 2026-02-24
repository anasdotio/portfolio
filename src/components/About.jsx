import resume from "../../public/Anas-Resume.pdf";
import SectionTitle from "./Card/SectionTitle";

const About = () => {
  return (
    <section className=" text-white mt-15" id="about">
      {/* Section title */}
      <SectionTitle title="About Me" />

      <div className=" max-w-3xl mx-auto mt-3 text-justify bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 leading-relaxed text-gray-300  md:text-center">
        <p>
          I’m a{" "}
          <span className="text-orange-400 font-medium">
            backend-focused developer
          </span>{" "}
          who builds scalable APIs, real-time systems, and clean backend
          architectures. I work primarily with{" "}
          <span className="text-orange-400 font-medium">Node.js</span> and{" "}
          <span className="text-orange-400 font-medium">Express</span>, focusing
          on performance, security, and maintainable code.
        </p>
        <p className="mt-4">
          I’m interested in system design and backend engineering, and I enjoy
          solving real-world problems through thoughtful architecture and
          reliable backend systems.
        </p>

        <div className="relative group rounded-xl p-0.5 bg-linear-to-r from-orange-500 via-orange-400 to-orange-500 max-w-md mx-auto mt-4 bg-animate cursor-pointer">
          <a
            type="submit"
            target="_blank"
            href={resume}
            rel="noopener noreferrer"
            className="px-4 py-2 block w-full bg-black rounded-xl transition-all duration-300 group-hover:bg-black/80"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
