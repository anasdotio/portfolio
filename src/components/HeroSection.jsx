import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile, stats } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

/**
 * Editorial masthead.
 *
 * The structure follows the supplied references: an oversized condensed
 * wordmark with the portrait fused into the letterforms, corner meta labels
 * pinned to the edges, and the supporting copy set in a tight grid beneath
 * rather than stacked in a generic card.
 */
const HeroSection = () => (
  <section
    id="home"
    className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-32"
  >
    {/* warm wash behind the masthead */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(204,143,44,0.13),transparent_70%)]"
    />

    <div className="relative mx-auto max-w-6xl">
      {/* ---------- corner meta row ---------- */}
      <div className="flex items-center justify-between gap-4">
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-500 transition-colors hover:text-ember-300"
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

      {/* ---------- masthead: name + fused portrait ---------- */}
      {/* The whole masthead is sized from one custom property, and the
          portrait is placed in `em` against it, so the head, the letters
          and the faded shoulders hold their proportions at any width. */}
      <div className="masthead mt-24 lg:mt-32">
        {/* The portrait sits *between* two passes of the wordmark: the solid
            letters render behind it, the stroked letters in front, so the
            face reads through the strokes of the type — the reference
            treatment from the "PORTFOLIO" masthead.

            Its placement is defined in index.css, against the type's own
            metrics, so the head always lands on the same letters. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%" }}
          transition={{ duration: 0.9, delay: 0.22, ease }}
          className="masthead__portrait pointer-events-none z-30"
        >
          <div className="relative">
            <div className="absolute inset-x-8 top-0  h-36 bg-[radial-gradient(ellipse_55%_55%_at_50%_16%,rgba(204,143,44,0.34),transparent_70%)] blur-2xl" />
            <img
              src={profile.cutout.src}
              alt={profile.cutout.alt}
              width={profile.cutout.width}
              height={profile.cutout.height}
              className="relative w-full  object-contain"
              style={{
                // A warm duotone: the skin and blazer are pushed toward the
                // bone/amber palette so the portrait belongs to the page
                // rather than reading as a pasted studio photo.
                filter:
                  "grayscale(1) contrast(1.2) brightness(0.92) sepia(0.6) saturate(1.3) hue-rotate(-14deg) drop-shadow(0 24px 48px rgba(0,0,0,0.6))",
              }}
            />
          </div>
        </motion.div>

        {/* solid pass — behind the portrait. The stroked characters are
            left hollow here, so nothing fills the counters of the letters
            the face shows through. This is the accessible heading; the
            stroked pass below is decorative. */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          aria-label={profile.name}
          className="wordmark relative z-0 text-bone-100"
        >
          {profile.headline.map((line) => (
            <span key={line} className="block">
              {[...line].map((char, i) =>
                profile.outline[line]?.includes(i) ? (
                  <span key={i} className="opacity-0">
                    {char}
                  </span>
                ) : (
                  <span key={i}>{char}</span>
                ),
              )}
            </span>
          ))}
        </motion.h1>

        {/* stroked pass — in front of the portrait */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          aria-hidden="true"
          className="wordmark pointer-events-none absolute inset-x-0 top-0 z-20 text-bone-100"
        >
          {profile.headline.map((line) => (
            <span key={line} className="block">
              {[...line].map((char, i) =>
                profile.outline[line]?.includes(i) ? (
                  <span key={i} className="text-outline">
                    {char}
                  </span>
                ) : (
                  <span key={i} className="opacity-0">
                    {char}
                  </span>
                ),
              )}
            </span>
          ))}
        </motion.h1>
      </div>

      {/* ---------- rule ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.36, ease }}
        className="hairline mt-6 h-px w-full lg:mt-0"
      />

      {/* ---------- statement, copy, proof ---------- */}
      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease }}
            className="display text-3xl leading-[1.05] text-bone-100 sm:text-4xl"
          >
            {profile.statement.map((line, i) => (
              <span
                key={line}
                className={`block ${i === 1 ? "text-bone-600" : ""}`}
              >
                {line}
              </span>
            ))}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone-400"
          >
            {profile.summary}
          </motion.p>

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
        </div>

        {/* stat band — a ruled row rather than a boxed card */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-bone-100/10 pt-7 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-10"
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
      </div>
    </div>
  </section>
);

export default HeroSection;
