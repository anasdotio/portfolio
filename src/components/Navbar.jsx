// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import MobileNavbar from "./Navbar/MobileNabar";

const Navbar = () => {
  const navItems = [
    {
      id: 1,
      name: "Home",
      link: "#home",
    },
    {
      id: 2,
      name: "About",
      link: "#about",
    },
    {
      id: 3,
      name: "Skills",
      link: "#skill",
    },
    {
      id: 4,
      name: "Projects",
      link: "#projects",
    },
    {
      id: 5,
      name: "Contact",
      link: "#contact",
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      className="mx-auto mt-6 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-xl transition-colors duration-300"
    >
      <div
        className="hidden items-center justify-between gap-8 rounded-xl bg-zinc-950/80 px-5 py-3 text-white transition-colors duration-300 sm:flex"
      >
        <a href="#home" className="hidden items-center gap-2 text-sm font-semibold tracking-wide sm:flex">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500 text-xs text-zinc-950">A</span>
          Anas Khan
        </a>
        <div className="hidden items-center gap-8 sm:flex">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="group relative h-6 min-w-fit cursor-pointer overflow-hidden"
          >
            {/* Normal Text */}
            <span
              className="
                block text-sm text-white/60 transition-transform duration-300 group-hover:-translate-y-full
              "
            >
              {item.name}
            </span>

            {/* Hover Text */}
            <a
              href={item.link}
              className="
                block text-sm text-yellow-400 transition-transform duration-300 group-hover:-translate-y-full
              "
            >
              {item.name}
            </a>
          </div>
        ))}
        </div>
      </div>

      <div className="flex sm:hidden">
        <MobileNavbar />
      </div>
    </motion.nav>
  );
};

export default Navbar;
