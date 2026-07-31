import React from "react";

const SocialCard = ({ link, icon }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="p-3 rounded-xl text-white bg-zinc-900 border border-white/10 hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all"
    >
      {icon && icon}
    </a>
  );
};

export default SocialCard;
