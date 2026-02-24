import SectionTitle from "./Card/SectionTitle";

const About = () => {
  return (
    <section
      className="mt-15 transition-colors duration-300 
                  text-gray-800 
                  dark:text-white"
      id="about"
    >
      <SectionTitle title="About Me" />

      <div
        className="max-w-3xl mx-auto mt-3 text-justify 
                   bg-gray-100 border border-gray-200 
                   dark:bg-zinc-900/60 dark:border-white/10 
                   backdrop-blur-md rounded-2xl p-6 
                   leading-relaxed text-gray-700 
                   dark:text-gray-300 md:text-center"
      >
        <p>
          I’m a{" "}
          <span className="text-orange-500 dark:text-orange-400 font-medium">
            backend-focused developer
          </span>{" "}
          who builds scalable APIs, real-time systems, and clean backend
          architectures. I work primarily with{" "}
          <span className="text-orange-500 dark:text-orange-400 font-medium">
            Node.js
          </span>{" "}
          and{" "}
          <span className="text-orange-500 dark:text-orange-400 font-medium">
            Express
          </span>
          , focusing on performance, security, and maintainable code.
        </p>

        <p className="mt-4">
          I’m interested in system design and backend engineering, and I enjoy
          solving real-world problems through thoughtful architecture and
          reliable backend systems.
        </p>

        <div
          className="relative group rounded-xl p-0.5 
                        bg-linear-to-r from-orange-500 via-orange-400 to-orange-500 
                        text-center max-w-md mx-auto mt-4 cursor-pointer"
        >
          <a
            target="_blank"
            href="/Anas-Resume.pdf"
            rel="noopener noreferrer"
            className="px-4 py-2 block w-full 
                       bg-white text-black 
                       dark:bg-black dark:text-white 
                       rounded-xl transition-all duration-300 
                       group-hover:opacity-90"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
