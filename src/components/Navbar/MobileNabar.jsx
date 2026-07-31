import { Menu, X } from "lucide-react";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex justify-between bg-zinc-950 px-6 py-3 rounded-md sm:hidden w-full relative z-30 text-white border border-white/10">
      <h1 className="font-medium text-yellow-400">Anas</h1>

      {open ? (
        <X
          className="text-white"
          onClick={() => {
            setOpen(!open);
          }}
        />
      ) : (
        <Menu
          className="text-white"
          onClick={() => {
            setOpen(!open);
          }}
        />
      )}

      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="absolute top-14 left-0 w-full bg-zinc-900/95 backdrop-blur-md border border-white/10 h-85 flex flex-col items-center py-4 gap-8 rounded-md text-white"
        >
          <a
            href="#home"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => {
              setOpen(!open);
            }}
          >
            About
          </a>
          <a
            href="#skill"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={() => {
              setOpen(!open);
            }}
          >
            Contact
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default MobileNavbar;
