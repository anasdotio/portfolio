/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../hooks/useTheme";

// Icon components remain the same, but we wrap them in motion.div below
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5V3m0 18v-1.5m8.485-8.485H21m-18 0h1.515m12.728-6.364l1.06-1.06M4.697 19.303l1.06-1.06m12.728 0l1.06 1.06M4.697 4.697l1.06 1.06M15.75 12A3.75 3.75 0 1112 8.25 3.75 3.75 0 0115.75 12z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const Theme = ({ type }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-3 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg transition-colors duration-300 cursor-pointer absolute ${type === "desktop" ? "right-10 top-0" : "bottom-2"} text-white overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default Theme;
