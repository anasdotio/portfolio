import { Menu, X } from "lucide-react";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative z-30 flex w-full justify-between rounded-xl bg-zinc-950/80 px-4 py-3 text-white sm:hidden">
      <a href="#home" className="flex items-center gap-2 font-medium text-white">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500 text-xs text-zinc-950">A</span>
        Anas Khan
      </a>

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
          className="absolute left-0 top-14 flex h-auto w-full flex-col items-center gap-6 rounded-xl border border-white/10 bg-zinc-900/95 py-6 text-white shadow-2xl backdrop-blur-xl"
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
