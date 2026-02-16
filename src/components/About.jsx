import React from "react";

const About = () => {
  return (
    <section className=" text-white mt-15">
      <div className="text-center relative w-fit mx-auto mb-12">
        <h1 className="text-3xl font-semibold tracking-wide">About Me</h1>
        <div className="absolute bottom-0 w-full h-0.5 bg-linear-to-r from-transparent via-orange-400 to-transparent"></div>
      </div>
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
        <div className="max-w-md mt-4 rounded-md overflow-hidden p-[.8px] bg-animate  mx-auto mt-">
          <button className="px-4 py-2 bg-black/88 rounded-md w-full ">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
