import React from "react";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <div className="w-fit mx-auto mt-6">
      <div className="flex gap-8 bg-black/80 px-6 py-3 rounded-md">
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
              text-white
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
                text-orange-400
                transition-transform duration-300
                group-hover:-translate-y-full
              "
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
