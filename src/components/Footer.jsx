import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navItems, profile } from "../data/content";

const Footer = () => (
  <footer className="relative border-t border-white/[0.07] bg-ink-950/70">
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* brand */}
        <div>
          <a href="#home" className="group inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nebula-500 to-violet-600 text-sm font-bold text-white transition-transform duration-300 group-hover:scale-105">
              {profile.initials}
            </span>
            <span className="text-base font-semibold text-white">
              {profile.name}
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
            Backend-focused developer building scalable APIs, microservice-based
            systems, and clean architectures.
          </p>
          <a
            href="#home"
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-nebula-300"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </a>
        </div>

        {/* quick links */}
        <nav aria-label="Footer">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Navigate
          </h3>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-slate-400 transition-colors hover:text-nebula-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* connect */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Connect
          </h3>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="https://github.com/anasdotio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-nebula-300"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/anaskhan12/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-nebula-300"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-nebula-300"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-7 sm:flex-row">
        <p className="font-mono text-[11px] text-slate-600">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-[11px] text-slate-600">
          Built with React · Vite · Tailwind
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
