import React from "react";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];
  return (
    <div className="w-fit mx-auto bg-linear-to-r from-white via-black/20 to-white p-[.6px] mt-3 rounded-md">
      <div className="flex gap-8 bg-black p-2 rounded-md">
        {navItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
