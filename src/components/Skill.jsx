import React from "react";

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
    <section className="mt-20 px-6 text-white">
      {/* Heading */}
      <div className="text-center relative w-fit mx-auto mb-14">
        <h1 className="text-4xl font-semibold tracking-wide">Skills</h1>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-white/20 via-orange-500 to-white/20"></div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
        {skills?.map((category, index) => {
          return (
            <div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-medium text-orange-400 mb-6">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.items.map((skill, i) => (
                  <li
                    key={i}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skill;
