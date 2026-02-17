import { Menu } from "lucide-react";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  return (
    <div className="w-full sm:w-fit sm:mx-auto mt-6 p-[.8px] rounded-md bg-linear-to-r from-white/30 via-orange-400 to-white/30 text-white">
      <div className="sm:flex gap-8 bg-black/80 px-6 py-3 rounded-md hidden ">
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
      <div className="flex justify-between bg-black/80 px-6 py-3 rounded-md sm:hidden w-full">
        <h1>Anas</h1>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
