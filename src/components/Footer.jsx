import { Github, Linkedin, Mail } from "lucide-react";
import SocialCard from "./Card/SocialCard";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black text-white">
      {/* top section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* brand */}
          <div>
            <h1 className="text-2xl font-semibold text-orange-400">
              Anas Khan
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {" "}
              Backend-focused developer building scalable APIs,
              microservice-based systems, and clean architectures.
            </p>
          </div>
          {/* quick */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <a
                href="#about"
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                About
              </a>
              <a
                href="#skill"
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Products
              </a>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <SocialCard
                link="https://github.com/anaskhan12"
                icon={<Github />}
              />
              <SocialCard
                link="https://www.linkedin.com/in/anas-khan-0b8b6b218/"
                icon={<Linkedin />}
              />
              <SocialCard link="mailto:6e2bS@example.com" icon={<Mail />} />
            </div>
          </div>
        </div>
        {/* bottom line */}
        <div className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Anas Khan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
