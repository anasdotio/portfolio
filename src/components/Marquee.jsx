import { marqueeItems } from "../data/content";

/**
 * Infinite horizontal ticker of the stack. The list is duplicated so the
 * -50% translate loops seamlessly.
 */
const Marquee = () => {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] bg-ink-900/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10">
        {row.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10"
            aria-hidden={i >= marqueeItems.length}
          >
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 hover:text-nebula-300">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-nebula-500/50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
