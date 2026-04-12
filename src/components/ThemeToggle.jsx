import { useEffect, useState } from "react";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      return;
    }

    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  function handleToggleTheme() {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
      className="
        relative flex h-12 w-22 items-center
        rounded-full
        border border-white/30 dark:border-white/10
        bg-white/30 dark:bg-white/10
        px-1
        backdrop-blur-xl
        transition-colors duration-300
        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
      "
    >
      <span
        className={`
          absolute left-1 flex h-10 w-10 items-center justify-center rounded-full
          bg-white dark:bg-white/90
          text-yellow-500 dark:text-slate-800
          shadow-md
          transition-all duration-300
          ${isDark ? "translate-x-10" : "translate-x-0"}
        `}
      >
        {isDark ? <HiMiniMoon size={20} /> : <HiMiniSun size={20} />}
      </span>
    </button>
  );
}