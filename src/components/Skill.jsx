import { motion } from "motion/react";
import SectionTitle from "./Card/SectionTitle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Code2, Database, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    category: "Backend",
    eyebrow: "01 / CORE",
    description: "Building reliable APIs and service-oriented systems.",
    icon: Code2,
    items: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    eyebrow: "02 / DATA",
    description: "Designing fast, resilient data and caching layers.",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    category: "DevOps",
    eyebrow: "03 / SHIP",
    description: "Automating delivery and keeping systems observable.",
    icon: Cloud,
    items: ["Docker", "AWS", "CI/CD", "Nginx"],
  },
  {
    category: "Tools",
    eyebrow: "04 / FLOW",
    description: "A dependable toolkit for focused daily development.",
    icon: Wrench,
    items: ["Git", "Linux", "VS Code", "Postman"],
  },
];

const SkillCard = ({ category, eyebrow, description, icon: Icon, items, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="skill-circle group"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md transition-all duration-300 group-hover:border-yellow-400/45 group-hover:bg-white/[0.06] group-hover:shadow-[0_0_32px_rgba(0,240,255,0.08)]">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-400 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            <Icon className="h-6 w-6" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
            {eyebrow}
          </span>
        </div>

        <h3 className="relative mt-5 text-xl font-semibold text-white">{category}</h3>
        <p className="relative mt-2 min-h-12 text-sm leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {items.map((skill, i) => (
            <span
              key={i}
              className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-gray-300 transition-colors group-hover:border-yellow-400/20 group-hover:text-yellow-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skill = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".skill-circle", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="mt-24 px-4 text-white" id="skill">
      <SectionTitle title="Skills" />

      <div className="mx-auto -mt-5 mb-10 max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
          The tools I use to turn ideas into scalable, production-ready
          software.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <SkillCard {...category} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skill;
