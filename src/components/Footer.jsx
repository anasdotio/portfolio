import { Github, Linkedin, Mail } from "lucide-react";
import SocialCard from "./Card/SocialCard";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-zinc-950 text-white">
      {/* top section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* brand */}
          <div>
            <h1 className="text-2xl font-semibold text-yellow-400">
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col space-y-2 text-gray-400 text-sm">
              <a
                href="#about"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                About
              </a>
              <a
                href="#skill"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Projects
              </a>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <SocialCard
                link="https://github.com/anasdotio"
                icon={<Github />}
              />
              <SocialCard
                link="https://www.linkedin.com/in/anaskhan12/"
                icon={<Linkedin />}
              />
              <SocialCard
                link="mailto:anaskhan.cs01@gmail.com"
                icon={<Mail />}
              />
            </div>
          </div>
        </div>
        {/* bottom line */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Anas Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
