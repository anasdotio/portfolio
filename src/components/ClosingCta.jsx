import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/content";

/**
 * Full-width closing statement — the "let's work together" beat that ends
 * the page.
 */
const ClosingCta = () => (
  <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(99,102,241,0.22),transparent_70%)]" />

    <div className="relative mx-auto max-w-4xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        Next step
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="display mt-6 text-4xl text-white sm:text-6xl"
      >
        Let&apos;s make something
        <span className="text-gradient block">worth shipping.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400"
      >
        I&apos;m currently open to backend and full-stack roles, freelance projects,
        and collaborations. If that sounds like you, let&apos;s talk.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.24 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a href="#contact" className="btn-primary">
          Start a conversation
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          Download Resume
        </a>
      </motion.div>
    </div>
  </section>
);

export default ClosingCta;
