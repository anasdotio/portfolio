import { motion } from "motion/react";

/**
 * Consistent section frame: id anchor, vertical rhythm, a labelled header
 * and an optional "index" marker in the corner.
 */
const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  titleSize = "md",
  aside = null,
  statement = null,
}) => (
  <section id={id} className={`relative px-5 py-24 sm:px-8 ${className}`}>
    <div className="mx-auto max-w-6xl">
      {/* alignment marks — the crosshairs the reference layouts use to
          register a header against the page grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-24 hidden sm:block"
      >
        <span className="mark-plus" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-24 hidden sm:block"
      >
        <span className="mark-plus" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {eyebrow && (
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-ember-400" />
            {eyebrow}
          </span>
        )}

        {statement ? (
          <h2 className="display mt-5 text-4xl text-bone-100 sm:text-5xl">
            {statement.map((line, i) => (
              <span
                key={line}
                className={`block ${i > 0 ? "text-bone-600" : ""}`}
              >
                {line}
              </span>
            ))}
          </h2>
        ) : (
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className={`display text-bone-100 ${
                titleSize === "lg"
                  ? "text-4xl sm:text-5xl"
                  : "text-3xl sm:text-4xl"
              }`}
            >
              {title}
            </h2>

            {aside ??
              (description && (
                <p className="max-w-md text-sm leading-relaxed text-bone-400 sm:text-base">
                  {description}
                </p>
              ))}
          </div>
        )}

        <div className="hairline mt-8 h-px w-full" />
      </motion.header>

      <div className="mt-12">{children}</div>
    </div>
  </section>
);

export default Section;
