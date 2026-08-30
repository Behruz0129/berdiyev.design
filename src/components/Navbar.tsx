"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";
import { siteConfig } from "@/data/site";

const links = [
  { href: "/", labelKey: "nav.home" as const },
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/projects", labelKey: "nav.projects" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
] as const;

/**
 * Chapda logotip → apelsin nuqta → email, o'ngda dumaloq gamburger tugma.
 * Menyu kartochka bo'lib ochiladi: havolalar, til va tema shu yerda.
 */
export function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Boshqa sahifaga o'tilganda menyu ochiq qolmasin. Render paytida holatni
  // moslash — effekt ishlatilsa ortiqcha qayta render bo'lardi.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape va tashqariga bosish bilan yopiladi.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <Container size="wide" className="py-4">
        <div ref={panelRef} className="relative flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <Link href="/" aria-label={siteConfig.name} className="rounded-lg focus-visible:focus-ring">
              <Logo className="h-8 w-auto text-foreground" />
            </Link>
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden />
            <a
              href={`mailto:${siteConfig.email}`}
              className="truncate rounded text-sm font-medium text-foreground hover:text-accent focus-visible:focus-ring"
            >
              {siteConfig.email}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            className="card flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full focus-visible:focus-ring"
          >
            <span className="relative flex h-[10px] w-[18px] flex-col justify-between" aria-hidden>
              <span
                className={cn(
                  "h-[2px] w-full origin-center rounded-full bg-foreground transition-transform",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full rounded-full bg-foreground transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full origin-center rounded-full bg-foreground transition-transform",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>

          {open ? (
            <div
              id="site-menu"
              className="absolute right-0 top-[calc(100%+0.9rem)] z-50 w-56 origin-top-right animate-[menu-in_180ms_cubic-bezier(0.22,1,0.36,1)] text-right"
            >
              {/*
                Bandlar birdan emas, ketma-ket chiqadi: har biriga 40ms
                kechikish beriladi. `backwards` — animatsiya boshlanmaguncha
                band ko'rinmay turadi, aks holda u avval paydo bo'lib,
                keyin qayta uchib kirardi.
              */}
              <nav className="flex flex-col items-end gap-2">
                {links.map((l, i) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      style={{ animationDelay: `${60 + i * 45}ms` }}
                      className={cn(
                        "animate-[menu-item-in_220ms_cubic-bezier(0.22,1,0.36,1)_backwards]",
                        // Har band o'z foni va radiusiga ega — umumiy quti yo'q,
                        // shuning uchun ular alohida-alohida havoda turadi.
                        "card rounded-full px-4 py-2 text-[15px] transition-colors focus-visible:focus-ring",
                        active
                          ? "font-semibold text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {t(l.labelKey)}
                    </Link>
                  );
                })}
              </nav>

              <div
                style={{ animationDelay: `${60 + links.length * 45}ms` }}
                className="mt-3 flex animate-[menu-item-in_220ms_cubic-bezier(0.22,1,0.36,1)_backwards] items-center justify-end gap-3"
              >
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
