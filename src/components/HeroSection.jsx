import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile, stats } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

const TypingRole = () => {
  const [text, setText] = useState("");
  const deleting = useRef(false);

  useEffect(() => {
    const role = profile.role;
    const timer = setInterval(() => {
      setText((current) => {
        if (!deleting.current && current.length >= role.length) {
          deleting.current = true;
          return current;
        }

        if (deleting.current && current.length === 0) {
          deleting.current = false;
          return current;
        }

        const nextLength = current.length + (deleting.current ? -1 : 1);
        return role.slice(0, nextLength);
      });
    }, deleting.current ? 45 : 85);

    return () => clearInterval(timer);
  }, []);

  return (
    <p
      aria-label={profile.role}
      className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500 sm:text-xs md:text-left"
    >
      {text}
      <span aria-hidden="true" className="ml-1 text-ember-400 animate-pulse">
        |
      </span>
    </p>
  );
};

const Statement = ({ className = "" }) => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.34, ease }}
    className={`display text-3xl leading-[1.05] text-bone-100 sm:text-4xl ${className}`}
  >
    {profile.statement.map((line, i) => (
      <span key={line} className={`block ${i === 1 ? "text-bone-650" : ""}`}>
        {line}
      </span>
    ))}
  </motion.p>
);

const Summary = () => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.4, ease }}
    className="mt-6 max-w-xl text-base leading-relaxed text-bone-400"
  >
    {profile.summary}
  </motion.p>
);

const Actions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.46, ease }}
    className="mt-8 flex flex-wrap items-center gap-3"
  >
    <a href="#projects" className="btn-primary">
      View Projects
      <ArrowUpRight className="h-4 w-4" />
    </a>
    <a
      href={profile.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-ghost"
    >
      <Download className="h-4 w-4 text-ember-400" />
      Resume
    </a>
  </motion.div>
);

const StatBand = ({ className = "" }) => (
  <motion.dl
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.5, ease }}
    className={`grid grid-cols-2 gap-x-6 gap-y-7 border-t border-bone-100/10 pt-7 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-10 ${className}`}
  >
    {stats.map((stat) => (
      <div key={stat.label}>
        <dd className="wordmark text-3xl text-bone-100 sm:text-4xl">
          {stat.value}
        </dd>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-500">
          {stat.label}
        </p>
      </div>
    ))}
  </motion.dl>
);

const MetaRow = () => (
  <div className="flex items-center justify-between gap-4">
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="group inline-flex max-w-[14rem] items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-500 transition-colors hover:text-ember-300 sm:max-w-none sm:text-[11px] sm:tracking-[0.2em]"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-ember-400" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-400" />
      </span>
      {profile.availability}
    </motion.a>

    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06, ease }}
      className="group hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-500 transition-colors hover:text-ember-300 sm:flex"
    >
      <MapPin className="h-3.5 w-3.5 text-ember-500" />
      {profile.location}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  </div>
);

const Portrait = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.12, ease }}
    className="relative mx-auto w-full max-w-[14rem] sm:max-w-sm"
  >
    <div
      aria-hidden="true"
      className="absolute inset-x-8 top-4 h-48 bg-[radial-gradient(ellipse_55%_50%_at_50%_22%,rgba(204,143,44,0.3),transparent_70%)] blur-2xl"
    />
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[42%] aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ember-300/35 bg-[radial-gradient(circle_at_50%_38%,rgba(204,143,44,0.16),transparent_62%)] shadow-[0_0_0_1px_rgba(244,239,228,0.05),0_0_70px_rgba(204,143,44,0.18)]"
    />
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[42%] aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-bone-100/15"
    />
    <div className="relative z-10 mx-auto aspect-square w-[88%] overflow-hidden rounded-full border border-bone-100/15 bg-ink-950/40 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
      <picture>
        <img
          src={profile.cutout.src}
          alt={profile.cutout.alt}
          width={profile.cutout.width}
          height={profile.cutout.height}
          className="h-full w-full object-contain object-top"
          style={{
            filter:
              "grayscale(1) contrast(1.16) brightness(0.95) sepia(0.55) saturate(1.25) hue-rotate(-14deg)",
          }}
        />
      </picture>
    </div>
  </motion.div>
);

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32"
  >
    {/* warm wash behind the hero */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(204,143,44,0.13),transparent_70%)]"
    />

    <div className="relative mx-auto max-w-6xl">
      {/* ---------- corner meta row ---------- */}
      <MetaRow />

      <div className="mt-12 grid items-center gap-12 md:mt-20 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:mt-28 lg:gap-20">
        <div className="order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease }}
            className="wordmark text-center text-[3.5rem] text-bone-100 sm:text-8xl md:text-left lg:text-9xl"
          >
            {profile.name}
          </motion.h1>
          <TypingRole />
          <div className="mt-10">
            <Statement />
            <Summary />
            <Actions />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <Portrait />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.36, ease }}
        className="hairline mt-12 h-px w-full md:mt-16"
      />
      <div className="mt-10 md:mt-12">
        <StatBand className="sm:grid-cols-4 lg:grid-cols-4" />
      </div>
    </div>
  </section>
);

export default HeroSection;
