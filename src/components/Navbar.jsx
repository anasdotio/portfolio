// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import MobileNavbar from "./Navbar/MobileNabar";
import Theme from "./button/Theme";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      className="
        w-full sm:w-fit sm:mx-auto mt-6 p-[.8px] rounded-md
        bg-linear-to-r 
        from-gray-300 via-orange-400 to-gray-300
        dark:from-white/30 dark:via-orange-400 dark:to-white/30
        transition-colors duration-300
      "
    >
      <div
        className="
          sm:flex items-center gap-8 px-6 py-3 rounded-md hidden
          bg-white text-gray-800
          dark:bg-black/80 dark:text-white
          transition-colors duration-300
        "
      >
        {navItems.map((item) => (
          <div
            key={item}
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
              {item}
            </span>

            {/* Hover Text */}
            <span
              className="
                block
                text-orange-500 dark:text-orange-400
                transition-transform duration-300
                group-hover:-translate-y-full
              "
            >
              {item}
            </span>
          </div>
        ))}

        <Theme />
      </div>

      <MobileNavbar />
    </motion.nav>
  );
};

export default Navbar;
