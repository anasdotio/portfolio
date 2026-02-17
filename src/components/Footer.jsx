import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black text-white">
      {/* top section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* brand */}
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">
              Anas Khan
            </h1>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              {" "}
              Backend-focused developer building scalable APIs,
              microservice-based systems, and clean architectures.
            </p>
          </div>
          {/* quick */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-gray-400 text-sm">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                About
              </li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Skills
              </li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">
                Products
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a
                href="https://github.com/anasdotio"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/anaskhan12/"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Linkedin />
              </a>
              <a
                href="mailto:anaskhan.cs01@gmail.com"
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,106,0,0.3)] transition-all"
              >
                <Mail />
              </a>
            </div>
          </div>
        </div>
        {/* bottom line */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Anas Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
