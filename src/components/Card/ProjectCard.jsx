import React from "react";

const ProjectCard = ({
  title,
  description,
  image,
  tech = [],
  github,
  demo,
}) => {
  return (
    <div className="group w-78 border border-white/10 bg-zinc-900/50 backdrop-blur-md rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-xl transition duration-300 hover:-translate-y-2 mx-auto">
      
      {/* Project Image */}
      <div className="overflow-hidden">
        <img
          src={image || "/default.png"}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-4">
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white">{title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm">{description}</p>

        {/* Tech Stack */}
        {tech?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tech.map((item, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              GitHub
            </a>
          )}

          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;