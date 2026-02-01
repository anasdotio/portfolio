import React from "react";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];
  return (
    <div className="flex justify-between">
      <h1>Anas</h1>
      <div className="flex gap-8">
        {navItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
