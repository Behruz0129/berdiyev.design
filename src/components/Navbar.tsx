"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";

const links = [
  { href: "/", labelKey: "nav.home" as const },
  { href: "/about", labelKey: "nav.about" as const },
  { href: "/projects", labelKey: "nav.projects" as const },
  { href: "/contact", labelKey: "nav.contact" as const },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/30">
        <Container className="py-4">
          <div className="glass rounded-2xl px-4 py-3 md:px-5">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="group inline-flex items-center gap-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--grad-a)] shadow-[0_0_18px_color-mix(in_oklab,var(--grad-a)_55%,transparent)]" />
                <span className="text-sm font-medium tracking-tight text-foreground/90">
                  {t("footer.name")}
                </span>
                <span className="text-sm text-foreground/50 hidden sm:inline">
                  UI/UX • Frontend
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-foreground/10 text-foreground"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/8",
                      )}
                    >
                      {t(l.labelKey)}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5 text-foreground/80 hover:bg-foreground/10 md:hidden focus-visible:focus-ring"
                  aria-label="Open navigation"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="sr-only">Toggle menu</span>
                  <span className="relative flex h-3.5 w-4 flex-col justify-between">
                    <span
                      className={cn(
                        "h-[2px] w-full rounded-full bg-current transition-transform",
                        open && "translate-y-[5px] rotate-45",
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] w-full rounded-full bg-current transition-opacity",
                        open && "opacity-0",
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] w-full rounded-full bg-current transition-transform",
                        open && "-translate-y-[5px] -rotate-45",
                      )}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
              <div className="mt-3 border-t border-foreground/10 pt-3 md:hidden">
                <nav className="flex flex-col gap-1">
                  {links.map((l) => {
                    const active = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-xl px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-foreground/10 text-foreground"
                            : "text-foreground/75 hover:text-foreground hover:bg-foreground/8",
                        )}
                      >
                        {t(l.labelKey)}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}

