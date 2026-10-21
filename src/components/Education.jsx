import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { journey } from "../data/content";
import Section from "./ui/Section";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";

const Timeline = ({ items, icon: Icon, accent }) => (
  <div className="relative">
    <span className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-ember-500/50 via-cobalt-500/25 to-transparent" />

    <ul className="space-y-5">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.1}>
          <div className="relative pl-10">
            <span
              className={`absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border ${
                accent
                  ? "border-ember-500/40 bg-ember-500/15 text-ember-300"
                  : "border-cobalt-500/40 bg-cobalt-500/15 text-cobalt-300"
              }`}
            >
              <Icon className="h-3 w-3" />
            </span>

            <SpotlightCard className="surface p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-500">
                {item.year}
              </p>

              <h3 className="mt-2 text-base font-semibold leading-snug text-bone-100">
                {item.title}
                {item.company && (
                  <span className="text-ember-300"> — {item.company}</span>
                )}
              </h3>

              {item.location && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-bone-500">
                  <MapPin className="h-3 w-3 text-ember-500" />
                  {item.location}
                </p>
              )}

              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-bone-400">
                  {item.description}
                </p>
              )}

              {item.points && (
                <ul className="mt-3 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-bone-400"
                    >
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-ember-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </div>
        </Reveal>
      ))}
    </ul>
  </div>
);

const Education = () => (
  <Section
    id="journey"
    eyebrow="Journey / 05"
    title="Education & Experience"
    description="Where I studied, and where I have put the theory to work."
  >
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className="mb-6 flex items-center gap-2.5">
          <GraduationCap className="h-4 w-4 text-ember-400" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-bone-300">
            Education
          </h3>
        </div>
        <Timeline items={journey.education} icon={GraduationCap} />
      </div>

      <div>
        <div className="mb-6 flex items-center gap-2.5">
          <Briefcase className="h-4 w-4 text-cobalt-400" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-bone-300">
            Experience
          </h3>
        </div>
        <Timeline items={journey.experience} icon={Briefcase} />
      </div>
    </div>
  </Section>
);

export default Education;
