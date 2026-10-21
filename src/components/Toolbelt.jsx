import { toolbelt } from "../data/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

/**
 * The full stack as a dense wall of tags — a quick "what do I work with"
 * answer for a recruiter scanning the page.
 */
const Toolbelt = () => (
  <Section
    id="toolbelt"
    eyebrow="Stack / 06"
    title="The toolbelt"
    description="Every tool I reach for, in the order I reach for them."
  >
    <Reveal>
      <ul className="flex flex-wrap gap-2.5">
        {toolbelt.map((tool, i) => (
          <li
            key={tool}
            className="group rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-nebula-500/40 hover:bg-nebula-500/[0.08] hover:text-white"
            style={{ transitionDelay: `${i * 8}ms` }}
          >
            {tool}
          </li>
        ))}
      </ul>
    </Reveal>
  </Section>
);

export default Toolbelt;
