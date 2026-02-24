import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const TimelineCard = ({ title, year, description }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true }}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-orange-500"></div>

      {/* Card */}
      <div
        className="border border-black/10 dark:border-white/10 
                      bg-white dark:bg-white/5
                      rounded-2xl p-5 
                      backdrop-blur-sm 
                      hover:scale-[1.02] 
                      transition duration-300"
      >
        <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
          {title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{year}</p>

        <p className="text-sm text-gray-700 dark:text-gray-400 mt-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
