import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    const theme = isDark ? "dark" : "light";

    html.setAttribute("data-theme", theme);
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 rounded-full hover:bg-base-300 transition-colors"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="text-warning w-5 h-5" />
      ) : (
        <Moon className="text-base-content w-5 h-5" />
      )}
    </motion.button>
  );
};
