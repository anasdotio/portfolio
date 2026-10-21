import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile, stats } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32"
  >
    <div className="mx-auto flex min-h-[calc(100vh-11rem)] max-w-6xl flex-col justify-center">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ---------- copy ---------- */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-nebula-500/25 bg-nebula-500/10 px-3.5 py-1.5 text-xs font-medium text-nebula-200"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-nebula-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nebula-400" />
            </span>
            {profile.availability}
          </motion.div>

          {/* oversized display headline */}
          <h1 className="display mt-7 text-[2.5rem] text-white sm:text-[3.5rem] lg:text-[4rem]">
            {profile.headline.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease }}
                className={`block ${i === 1 ? "text-gradient" : ""} ${
                  i === 2 ? "text-slate-600" : ""
                }`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 lg:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
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
              <Download className="h-4 w-4 text-nebula-400" />
              Resume
            </a>
          </motion.div>

          {/* stack chips */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.46 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {["Node.js", "Express", "MongoDB", "React", "AWS", "Docker"].map(
              (item) => (
                <li key={item}>
                  <span className="chip">{item}</span>
                </li>
              ),
            )}
          </motion.ul>
        </div>

        {/* ---------- portrait ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-[21rem]"
        >
          <div className="absolute inset-x-10 top-6 bottom-8 rounded-[3rem] bg-gradient-to-b from-nebula-500/35 via-violet-600/15 to-transparent blur-3xl" />

          <div className="absolute left-1/2 top-1/2 -z-10 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-nebula-500/20" />
            <div className="absolute inset-10 rounded-full border border-violet-500/15" />
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/70 p-2 shadow-[0_40px_120px_-40px_rgba(99,102,241,0.6)] backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 z-20 h-20 animate-scan bg-gradient-to-b from-nebula-400/12 to-transparent" />
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              className="aspect-[503/689] w-full rounded-[1.6rem] object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          </div>

          {/* floating status badge */}
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-900/95 px-4 py-3 shadow-xl backdrop-blur-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nebula-500 to-violet-600 text-[10px] font-bold text-white">
              {profile.initials}
            </span>
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold text-white">{profile.name}</p>
              <p className="font-mono text-[10px] text-slate-500">
                building / shipping
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------- stat band ---------- */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-ink-950/80 px-5 py-5 text-center backdrop-blur-sm"
          >
            <dd className="display text-2xl text-white sm:text-3xl">
              {stat.value}
            </dd>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.dl>
    </div>

    <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-slate-600 lg:flex">
      <MapPin className="h-3.5 w-3.5 text-nebula-500" />
      <span className="font-mono text-[11px] tracking-[0.18em]">
        {profile.location.toUpperCase()}
      </span>
    </div>
  </section>
);

export default HeroSection;
