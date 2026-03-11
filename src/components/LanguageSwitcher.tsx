"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

const locales: { value: Locale; label: string }[] = [
  { value: "uz", label: "O'ZB" },
  { value: "ru", label: "РУС" },
  { value: "en", label: "ENG" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="glass flex rounded-xl p-1">
      {locales.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-label={`Switch to ${label}`}
          onClick={() => setLocale(value)}
          className={cn(
            "rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:focus-ring",
            locale === value
              ? "bg-foreground/15 text-foreground"
              : "text-foreground/60 hover:text-foreground hover:bg-foreground/8",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
