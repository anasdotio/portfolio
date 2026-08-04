import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({
  title,
  description,
  image,
  tech = [],
  github,
  demo,
}) => {
  return (
    <article className="group mx-auto h-full w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-lg shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/10">
      <div className="relative overflow-hidden">
        <img
          src={image || "/default.png"}
          alt={title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-yellow-400/30 bg-zinc-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-yellow-300 backdrop-blur-sm">
          Featured
        </div>
      </div>

      <div className="flex h-full flex-col gap-5 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        </div>

        {tech?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tech.map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-start gap-3 pt-1">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-zinc-950/80 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-black/30 transition hover:border-yellow-400/50 hover:bg-zinc-800/90"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}

          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-yellow-300"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
