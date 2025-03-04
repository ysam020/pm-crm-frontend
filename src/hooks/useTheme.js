import { useState } from "react";

function useTheme() {
  // Theme
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  if (JSON.parse(localStorage.getItem("theme")) === null) {
    localStorage.setItem("theme", JSON.stringify("light"));
    setTheme("light");
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");

    if (theme === "light") {
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      localStorage.setItem("theme", JSON.stringify("light"));
    }
  };

  return {
    theme,
    toggleTheme,
  };
}

export default useTheme;
