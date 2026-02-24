import React from "react";

const TimelineCard = ({ title, year, description }) => {
  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-orange-500"></div>

      {/* Card */}
      <div className="border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-sm hover:scale-[1.02] transition duration-300">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>

        <p className="text-sm text-gray-400 mt-1">{year}</p>

        <p className="text-sm text-gray-400 mt-3">{description}</p>
      </div>
    </div>
  );
};

export default TimelineCard;
