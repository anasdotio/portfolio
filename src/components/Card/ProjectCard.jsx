import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import Reveal from "../ui/Reveal";

const ProjectCard = ({
  number = "01",
  title,
  description,
  image,
  tech = [],
  github,
  demo,
  status,
  index = 0,
}) => (
  <Reveal delay={index * 0.1} className="h-full">
    <SpotlightCard className="surface group flex h-full flex-col">
      {/* preview */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(129,140,248,0.18),transparent_55%)]">
            <Sparkles className="h-10 w-10 text-nebula-400/70" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-nebula-400" />
          {status || "Featured"}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="index-num shrink-0">{number}</span>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
            {title}
          </h3>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <li
              key={item}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-400"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-nebula-500/45 hover:bg-nebula-500/10"
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
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-nebula-500 to-violet-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <ArrowUpRight className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  </Reveal>
);

export default ProjectCard;
