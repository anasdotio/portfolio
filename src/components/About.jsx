import SectionTitle from "./Card/SectionTitle";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Database,
  Download,
  Globe,
  Zap,
} from "lucide-react";

const skills = [
  { icon: Code2, label: "Backend", desc: "Node.js, Express, Python" },
  { icon: Database, label: "Database", desc: "PostgreSQL, MongoDB, Redis" },
  { icon: Zap, label: "APIs", desc: "REST, GraphQL, WebSocket" },
  { icon: Globe, label: "DevOps", desc: "Docker, AWS, CI/CD" },
];

const About = () => {
  return (
    <section className="mt-24 px-4 text-white" id="about">
      <SectionTitle title="About Me" />

      <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md sm:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-yellow-400">
                  PROFILE / 01
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Who I am</h3>
              </div>
              <span className="hidden rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200 sm:inline-flex">
                Backend-minded
              </span>
            </div>

            <p className="relative mt-6 text-base leading-relaxed text-gray-300">
              I&apos;m a{" "}
              <span className="font-medium text-yellow-300">
                backend-focused developer
              </span>{" "}
              who turns complex product ideas into scalable APIs, real-time
              systems, and dependable services.
            </p>
            <p className="relative mt-4 text-base leading-relaxed text-gray-400">
              I work primarily with Node.js and Express, with a strong focus on
              system design, performance, security, and maintainable code.
            </p>

            <div className="relative mt-8 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
              {[
                ["Focus", "Clean architecture"],
                ["Approach", "Ship with purpose"],
                ["Mindset", "Always learning"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-200">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.a
            href="/Anas-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-medium text-zinc-950 transition-colors hover:bg-yellow-400"
          >
            <Download className="h-4 w-4" />
            Download Resume
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md transition-all hover:border-yellow-400/40 hover:bg-white/[0.06]"
            >
              <skill.icon className="mb-5 h-7 w-7 text-yellow-400 transition-transform group-hover:scale-110" />
              <h4 className="font-semibold text-white">{skill.label}</h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
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
