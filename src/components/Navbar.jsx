import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, profile, socials } from "../data/content";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Compact the bar once the page moves, and lock scroll when the menu opens.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scroll-spy: the current section is the last one whose heading has
      // scrolled above the middle of the viewport. Measuring against the
      // viewport (rather than offsetTop) keeps this correct regardless of
      // how the sections are nested in the DOM.
      const line = window.innerHeight * 0.35;
      let current = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleMobileNav = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-bone-100/[0.07] bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          className="group flex items-center"
          aria-label={`${profile.name} — home`}
        >
          <span className="block">
            <span className="text-sm font-semibold leading-tight text-bone-100">
              {profile.name}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
                  active === item.id
                    ? "text-bone-100"
                    : "text-bone-400 hover:text-bone-100"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg border border-ember-500/25 bg-ember-500/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-4 !py-2 !text-xs sm:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-bone-100/10 bg-bone-100/[0.04] text-bone-100 transition-colors hover:border-ember-500/40 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-bone-100/[0.07] bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-5 py-5">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleMobileNav(event, item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                      active === item.id
                        ? "bg-ember-500/10 text-bone-100"
                        : "text-bone-400"
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-[10px] text-bone-600">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-3 border-t border-bone-100/[0.07] px-5 py-5">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 !py-2.5 !text-xs"
              >
                Download Resume
              </a>
              <a
                href={socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-3 !py-2.5"
                aria-label="GitHub"
              >
                GH
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
