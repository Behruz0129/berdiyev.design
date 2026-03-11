"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current !== "light";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="glass rounded-xl px-3 py-2 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors focus-visible:focus-ring"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
      {mounted && (
        <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
      )}
    </button>
  );
}

