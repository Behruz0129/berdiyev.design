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

// «Bosh sahifa» yo'q: logotipning o'zi bosh sahifaga olib boradi va
// menyuda takrorlanishi ortiqcha edi.
const links = [
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/projects", labelKey: "nav.projects" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
] as const;

/**
 * Chapda logotip, o'ngda til va tema tugmalari hamda gamburger.
 *
 * Lavozim satri bu yerdan olib tashlangan: portfolio frilans buyurtma
 * uchun, hozirgi ish o'rni esa mijozga tegishli emas — u faqat tajriba
 * bo'limida, tarix sifatida qoladi.
 *
 * Til va tema menyudan tashqariga chiqarilgan: ular tez-tez bosiladi,
 * har safar menyu ochish ortiqcha qadam edi.
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

  /*
    Menyuda fon rangi yo'q — u fondagi yorug'lik ustidan och tasma bo'lib
    chiqib turardi. Faqat `backdrop-blur` qoldi: u rang qo'shmaydi, shuning
    uchun dog'lar ko'rinaveradi, lekin scroll paytida ostidan o'tayotgan
    matn yumshab, sarlavha o'qiladigan bo'lib qoladi. Pastdagi ingichka
    chiziq esa menyuni sahifadan ajratib turadi.
  */
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 backdrop-blur-md">
      <Container size="wide" className="py-4">
        <div
          ref={panelRef}
          className="relative flex items-center justify-between gap-3"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            {/*
              Logotip yonida brend nomi — u ayni paytda saytning manzili
              ham. Telefonda faqat belgi qoladi: yozuv sig'maganda kesilib
              turgandan ko'ra butunlay yo'qligi toza ko'rinadi.
            */}
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="flex flex-shrink-0 items-center gap-2.5 rounded-lg focus-visible:focus-ring"
            >
              <Logo className="h-10 w-auto text-foreground" />
              <span className="hidden text-[17px] font-semibold tracking-[-0.02em] text-foreground sm:block">
                {siteConfig.shortName}
              </span>
            </Link>
          </div>

          {/*
            `relative` shu yerda: menyu boshqaruv tugmalari guruhiga
            nisbatan joylashadi, ya'ni `right-full` bilan doim ularning
            chap yonidan boshlanadi. Avval u sarlavha qatoriga nisbatan
            turgani uchun til va tema tugmalarini bosib qolardi.
          */}
          <div className="relative flex flex-shrink-0 items-center gap-2">
            <SiteMenu
              open={open}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
              t={t}
            />

            {/* Til va tema — doim ko'rinadi, menyu ochish shart emas */}
            <LanguageSwitcher />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              className="card flex h-11 w-11 items-center justify-center rounded-full focus-visible:focus-ring"
            >
              {/*
                14px balandlikdagi quti ichida uchta 2px chiziq — orasi 4px.
                Xochga aylanganda chetki ikkitasi o'rtaga 6px siljiydi
                (markazlari 1 · 7 · 13 px da turadi).
              */}
              <span
                className="relative flex h-[14px] w-[18px] flex-col justify-between"
                aria-hidden
              >
                <span
                  className={cn(
                    "h-[2px] w-full origin-center rounded-full bg-foreground transition-transform",
                    open && "translate-y-[6px] rotate-45",
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
                    open && "-translate-y-[6px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

/**
 * Sahifa havolalari. Telefonda tugmalar ostiga ustun bo'lib tushadi,
 * desktopda esa ularning chap yonidan eniga yoyiladi.
 */
function SiteMenu({
  open,
  pathname,
  onNavigate,
  t,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
  t: (key: string) => string;
}) {
  if (!open) return null;

  return (
    <div
      id="site-menu"
      className={cn(
        "absolute z-50 origin-top-right animate-[menu-in_180ms_cubic-bezier(0.22,1,0.36,1)]",
        // Telefon: butun guruh ostida, ustun.
        "right-0 top-[calc(100%+0.9rem)] w-56 text-right",
        // Desktop: guruhning chap yonida, u bilan bir chiziqda.
        "lg:right-full lg:top-1/2 lg:mr-2 lg:w-auto lg:origin-right",
        "lg:flex lg:-translate-y-1/2 lg:items-center lg:gap-2 lg:text-left",
        "lg:animate-[menu-side-in_200ms_cubic-bezier(0.22,1,0.36,1)]",
      )}
    >
      {/*
        Bandlar birdan emas, ketma-ket chiqadi: har biriga 45ms kechikish
        beriladi. `backwards` — animatsiya boshlanmaguncha band ko'rinmay
        turadi, aks holda u avval paydo bo'lib, keyin qayta uchib kirardi.
      */}
      <nav className="flex flex-col items-end gap-2 lg:flex-row lg:items-center">
        {links.map((l, i) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              style={{ animationDelay: `${60 + i * 45}ms` }}
              className={cn(
                "animate-[menu-item-in_220ms_cubic-bezier(0.22,1,0.36,1)_backwards]",
                // Har band o'z foni va radiusiga ega — umumiy quti yo'q,
                // shuning uchun ular alohida-alohida havoda turadi.
                "card whitespace-nowrap rounded-full px-4 py-2 text-[15px] transition-colors focus-visible:focus-ring",
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
    </div>
  );
}
