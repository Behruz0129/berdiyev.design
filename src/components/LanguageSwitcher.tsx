"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const LOCALES: { value: Locale; short: string; label: string }[] = [
  { value: "uz", short: "O'Z", label: "O'zbekcha" },
  { value: "ru", short: "RU", label: "Русский" },
  { value: "en", short: "EN", label: "English" },
];

/**
 * Uch til bitta ochiluvchi ro'yxatda. Yonma-yon uchta tugma menyuni
 * band qilib turardi — bu yerda faqat joriy til ko'rinadi.
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[2];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="pill hover:bg-surface-2 focus-visible:focus-ring"
      >
        {current.short}
        <span
          aria-hidden
          className={cn("text-[10px] text-muted transition-transform", open && "rotate-180")}
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          // Tashqi radius 16px, ichki 10px, oraliq 6px — 16 − 6 = 10.
          // Kartochkaning standart 24px radiusi bu kichik ro'yxatga
          // katta edi, ichkarisi esa 8px bo'lib qolib, ikkala burchak
          // bir-biriga mos tushmasdi.
          className="card absolute top-[calc(100%+0.4rem)] left-0 z-50 w-40 animate-[fade-in_120ms_ease-out] rounded-2xl p-1.5"
        >
          {LOCALES.map((l) => (
            <li key={l.value}>
              <button
                type="button"
                role="option"
                aria-selected={l.value === locale}
                onClick={() => {
                  setLocale(l.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full rounded-[10px] px-3 py-2 text-left text-[14px] transition-colors focus-visible:focus-ring",
                  l.value === locale
                    ? "bg-card-2 font-medium text-foreground"
                    : "text-muted hover:bg-card-2 hover:text-foreground",
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
