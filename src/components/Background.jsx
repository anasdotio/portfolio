/**
 * Layered ambient background: a base gradient, two drifting nebula blobs,
 * a masked grid and a fine noise overlay. Fixed and non-interactive so it
 * never affects layout or scroll.
 */
const Background = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
  >
    {/* base wash */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#151544_0%,#06060f_55%)]" />

    {/* drifting nebula blobs */}
    <div className="absolute -left-40 top-[-10rem] h-[34rem] w-[34rem] animate-drift rounded-full bg-nebula-600/25 blur-[130px]" />
    <div
      className="absolute -right-40 top-[20rem] h-[30rem] w-[30rem] animate-drift rounded-full bg-violet-600/20 blur-[130px]"
      style={{ animationDelay: "-8s" }}
    />
    <div
      className="absolute bottom-[-14rem] left-1/3 h-[28rem] w-[28rem] animate-drift rounded-full bg-nebula-700/15 blur-[140px]"
      style={{ animationDelay: "-15s" }}
    />

    {/* grid */}
    <div className="grid-bg absolute inset-0" />

    {/* fine noise to break up banding */}
    <div
      className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />

    {/* top and bottom fade so sections blend into one another */}
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
  </div>
);

export default Background;
