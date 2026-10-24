import { Award, ExternalLink } from "lucide-react";
import { certificates } from "../data/content";
import Section from "./ui/Section";
import SpotlightCard from "./ui/SpotlightCard";
import Reveal from "./ui/Reveal";

const Certificates = () => (
  <Section
    id="certificates"
    eyebrow="Credentials / 07"
    title="Certificates"
    description="A selection of certifications and credentials that support my technical practice."
  >
    {certificates.length > 0 ? (
      <div className="grid gap-5 md:grid-cols-2">
        {certificates.map((certificate, i) => (
          <Reveal key={`${certificate.name}-${certificate.issuer}`} delay={i * 0.08}>
            <SpotlightCard className="surface flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ember-500/25 bg-ember-500/10 text-ember-300">
                  <Award className="h-5 w-5" />
                </span>
                {certificate.url && (
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone-500 transition-colors hover:text-ember-300"
                    aria-label={`Verify ${certificate.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-bone-100">
                {certificate.name}
              </h3>
              <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                <p className="text-sm text-bone-400">{certificate.issuer}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-500">
                  {certificate.date}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    ) : (
      <div className="surface flex flex-col items-center justify-center px-6 py-14 text-center">
        <Award className="h-8 w-8 text-ember-400" />
        <p className="mt-4 text-base font-medium text-bone-200">
          Certificates will be added soon.
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-bone-500">
          This space will highlight verified credentials and professional
          learning milestones.
        </p>
      </div>
    )}
  </Section>
);

export default Certificates;
