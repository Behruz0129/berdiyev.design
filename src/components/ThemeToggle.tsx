"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
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

/** `globals.css` dagi o'tish muddati. */
const TRANSITION_MS = 320;

/*
  Klass o'tish tugagandan biroz keyin olib tashlanadi. Aynan 320 ms da
  olinsa, brauzer kadri bir oz kechikkan paytda o'tish yarim yo'lda
  bekor bo'lib, rang sakrab qolardi.
*/
const CLEANUP_MS = TRANSITION_MS + 80;

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLocale();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  /*
    O'tish faqat shu yerda yoqiladi. Klass <html> da turgan paytda barcha
    element rangini silliq almashtiradi, keyin olib tashlanadi — doimiy
    qoldirilsa hover va boshqa oddiy o'zgarishlar ham sekinlashardi.

    Tugma ketma-ket bosilsa eski taymer bekor qilinadi, aks holda birinchi
    taymer o'tish o'rtasida klassni olib tashlab, rangni sakratib yuborardi.
  */
  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-changing");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => root.classList.remove("theme-changing"), CLEANUP_MS);
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      aria-label={t("theme.toggle")}
      title={mounted ? (isDark ? t("theme.light") : t("theme.dark")) : undefined}
      className="card flex h-9 w-9 items-center justify-center rounded-full text-foreground/75 transition-colors hover:text-foreground focus-visible:focus-ring"
      onClick={toggle}
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
