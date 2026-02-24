import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center relative w-fit mx-auto mb-12 dark:text-white text-black">
      <h1 className="text-3xl font-semibold tracking-wide">{title}</h1>

      {/* Gradient underline */}
      <div className="absolute bottom-0 w-full h-0.5 bg-linear-to-r from-transparent via-orange-400 to-transparent"></div>
    </div>
  );
};

export default SectionTitle;
