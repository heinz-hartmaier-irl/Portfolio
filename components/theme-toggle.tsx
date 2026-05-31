"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const shouldUseDark = stored === "dark";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = requestAnimationFrame(() => setDark(shouldUseDark));

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`focus-ring grid h-10 w-10 place-items-center rounded-md border border-line/30 bg-navy/80 text-text shadow-glow backdrop-blur-xl transition hover:text-rose ${className}`}
      aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={dark ? "Mode clair" : "Mode sombre"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
