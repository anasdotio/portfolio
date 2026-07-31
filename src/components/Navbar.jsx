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
      className="
        w-full sm:w-fit sm:mx-auto mt-6 p-[.8px] rounded-md
        bg-linear-to-r 
        from-gray-300 via-yellow-400 to-gray-300
        dark:from-white/20 dark:via-yellow-400 dark:to-white/20
        transition-colors duration-300
      "
    >
      <div
        className="
          sm:flex items-center gap-8 px-6 py-3 rounded-md hidden
          bg-zinc-950 text-white
          transition-colors duration-300
        "
      >
        {navItems.map((item) => (
          <div
            key={item.id}
            className="
              relative 
              h-6 
              min-w-fit 
              overflow-hidden 
              cursor-pointer 
              group
            "
          >
            {/* Normal Text */}
            <span
              className="
                block
                transition-transform duration-300
                group-hover:-translate-y-full
              "
            >
              {item.name}
            </span>

            {/* Hover Text */}
            <a
              href={item.link}
              className="
                block
                text-yellow-500 dark:text-yellow-400
                transition-transform duration-300
                group-hover:-translate-y-full
              "
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>

      <MobileNavbar />
    </motion.nav>
  );
};

export default Navbar;
