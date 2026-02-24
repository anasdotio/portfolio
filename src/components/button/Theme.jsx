import useTheme from "../hooks/useTheme";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md transition cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </div>
  );
};

export default Theme;
