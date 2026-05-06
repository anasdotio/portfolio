import { motion } from "motion/react";
import SectionTitle from "./Card/SectionTitle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Code2, Database, Cloud, Wrench } from "lucide-react";

const skillCategories = [
  {
    category: "Backend",
    icon: Code2,
    items: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    category: "DevOps",
    icon: Cloud,
    items: ["Docker", "AWS", "CI/CD", "Nginx"],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git", "Linux", "VS Code", "Postman"],
  },
];

const SkillCard = ({ category, icon: Icon, items, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      {/* CIRCLE ICON */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-orange-500/20 dark:bg-orange-500/30 flex items-center justify-center border border-orange-500/30 dark:border-orange-400/30 group-hover:border-orange-500 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
        </div>
      </div>

      {/* CARD */}
      <div className="bg-gray-100 dark:bg-zinc-900/60 border border-gray-200 dark:border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-orange-500/50 dark:hover:border-orange-400/50 transition-colors text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          {category}
        </h3>

        <div className="flex flex-wrap justify-center gap-2">
          {items.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
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
    <section
      ref={containerRef}
      className="mt-20 px-4 text-white"
      id="skill"
    >
      <SectionTitle title="Skills" />

      {/* SKILL CARDS GRID */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-circle">
            <SkillCard {...category} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skill;