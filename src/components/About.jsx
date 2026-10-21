import { Code2, Database, Download, Globe, Zap } from "lucide-react";
import { about, profile } from "../data/content";
import Section from "./ui/Section";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";

const iconMap = { Code2, Database, Zap, Globe };

const About = () => (
  <Section id="about" eyebrow={about.eyebrow} statement={about.statement}>
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
      {/* ---------- narrative ---------- */}
      <Reveal>
        <div className="space-y-5">
          {about.body.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-slate-400">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-3 pt-2">
            {about.domains.map((domain) => {
              const Icon = iconMap[domain.icon];
              return (
                <div
                  key={domain.label}
                  className="surface rounded-xl p-4 transition-colors duration-300 hover:border-nebula-500/30"
                >
                  <Icon className="h-4 w-4 text-nebula-400" />
                  <p className="mt-3 text-sm font-medium text-white">
                    {domain.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{domain.desc}</p>
                </div>
              );
            })}
          </div>

          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </Reveal>

      {/* ---------- numbered principles ---------- */}
      <div className="space-y-3">
        {about.principles.map((principle, i) => (
          <Reveal key={principle.title} delay={i * 0.08}>
            <SpotlightCard className="surface p-6 transition-transform duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <span className="index-num shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {principle.text}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
