"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Server hech qachon qaysi tema tanlanganini bilmaydi (u localStorage'da),
 * shuning uchun ikonka faqat hydration'dan keyin chiziladi. `useSyncExternalStore`
 * buni setState-in-effect'siz beradi: server snapshot = false, client = true.
 */
const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLocale();
  const mounted = useMounted();

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current !== "light";

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      className="glass rounded-xl px-3 py-2 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors focus-visible:focus-ring"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
      {mounted && (
        <span className="hidden sm:inline">
          {isDark ? t("theme.light") : t("theme.dark")}
        </span>
      )}
    </button>
  );
}

