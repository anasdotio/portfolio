import { useEffect, useRef } from "react";
import SectionTitle from "./Card/SectionTitle";
import { motion } from "motion/react";
import { Code2, Database, Zap, Globe } from "lucide-react";

const skills = [
  { icon: Code2, label: "Backend", desc: "Node.js, Express, Python" },
  { icon: Database, label: "Database", desc: "PostgreSQL, MongoDB, Redis" },
  { icon: Zap, label: "APIs", desc: "REST, GraphQL, WebSocket" },
  { icon: Globe, label: "DevOps", desc: "Docker, AWS, CI/CD" },
];

const About = () => {
  return (
    <section
      className="mt-15 transition-colors duration-300 text-gray-800 dark:text-white"
      id="about"
    >
      <SectionTitle title="About Me" />

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-2 gap-8 px-4">
        {/* LEFT - TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-100 dark:bg-zinc-900/60 border border-gray-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
              Who I Am
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I&apos;m a{" "}
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
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I&apos;m interested in system design and backend engineering, and I
              enjoy solving real-world problems through thoughtful architecture
              and reliable backend systems.
            </p>
          </div>

          {/* RESUME BUTTON */}
          <motion.a
            href="/Anas-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        {/* RIGHT - SKILL CARDS */}
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-100 dark:bg-zinc-900/60 border border-gray-200 dark:border-white/10 rounded-xl p-4 backdrop-blur-md hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-colors"
            >
              <skill.icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-3" />
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {skill.label}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;