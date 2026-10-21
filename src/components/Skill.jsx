import { Cloud, Code2, Database, Wrench } from "lucide-react";
import { skillGroups } from "../data/content";
import Section from "./ui/Section";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";

const iconMap = { Code2, Database, Cloud, Wrench };

const Skill = () => (
  <Section
    id="skills"
    eyebrow="Toolkit / 02"
    title="Skills"
    description="The tools I use to turn ideas into scalable, production-ready software."
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, i) => {
        const Icon = iconMap[group.icon];
        return (
          <Reveal key={group.category} delay={i * 0.08} className="h-full">
            <SpotlightCard className="surface h-full p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-nebula-500/25 bg-nebula-500/10 text-nebula-300 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-slate-600">
                  {group.eyebrow}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {group.category}
              </h3>
              <p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-500">
                {group.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300 transition-colors duration-200 hover:border-nebula-500/40 hover:bg-nebula-500/10 hover:text-nebula-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  </Section>
);

export default Skill;
