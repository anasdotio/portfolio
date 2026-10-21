import { process } from "../data/content";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

const Process = () => (
  <Section
    id="process"
    eyebrow={process.eyebrow}
    title={process.title}
    description={process.description}
  >
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
      {process.steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08} className="h-full">
          <div className="group relative h-full">
            {/* connector line */}
            {i < process.steps.length - 1 && (
              <span className="absolute left-6 top-3 hidden h-px w-full bg-gradient-to-r from-nebula-500/30 to-transparent lg:block" />
            )}

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="index-num transition-colors duration-300 group-hover:border-nebula-400/60 group-hover:bg-nebula-500/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {step.text}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

export default Process;
