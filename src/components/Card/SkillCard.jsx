import React from "react";

const SkillCard = ({ title, items: category }) => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-medium text-orange-400 mb-6">{title}</h2>
      <ul className="space-y-3">
        {category.map((skill, i) => (
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
};

export default SkillCard;
