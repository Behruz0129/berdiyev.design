"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, MoonStars } from "@phosphor-icons/react";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Server hech qachon qaysi tema tanlanganini bilmaydi (u localStorage'da),
 * shuning uchun tugma matni faqat brauzerda paydo bo'ladi.
 */
const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLocale();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      title={mounted ? (isDark ? t("theme.light") : t("theme.dark")) : undefined}
      className="card flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition-colors hover:text-foreground focus-visible:focus-ring"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Server temani bilmaydi — ikonka faqat brauzerda paydo bo'ladi */}
      {mounted ? (
        isDark ? <Sun size={17} weight="bold" /> : <MoonStars size={17} weight="bold" />
      ) : (
        <span className="h-[17px] w-[17px]" aria-hidden />
      )}
    </button>
  );
}
