import React, { useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = React.useState("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
