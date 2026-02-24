import React from "react";
import SkillCard from "./Card/SkillCard";
import SectionTitle from "./Card/SectionTitle";

const skills = [
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MongoDB", "Redis", "Postgres"],
  },
  {
    title: "DevOps",
    items: ["Docker", "CI/CD"],
  },
  {
    title: "Architecture",
    items: ["Microservices", "System Design"],
  },
];

const Skill = () => {
  return (
    <section className="mt-20 px-6 text-white" id="skill">
      {/* Heading */}
      <SectionTitle title="Skills" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
        {skills?.map((category, index) => {
          return (
            <SkillCard
              key={index}
              title={category.title}
              items={category.items}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Skill;
