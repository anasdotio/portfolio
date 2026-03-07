import React, { useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
