/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";

const SkillCard = ({ title, items: category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
      className="bg-zinc-900/60 
                 backdrop-blur-md 
             border border-white/10 
                 rounded-2xl p-6 
                 transition-colors duration-500"
    >
      <h2 className="text-xl font-medium text-yellow-500 mb-6">{title}</h2>

      <ul className="space-y-3">
        {category.map((skill, i) => (
          <li
            key={i}
            className="flex items-center 
                       text-gray-300 
                       hover:text-white 
                       transition-colors"
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;
