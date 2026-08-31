"use client";

import { Phone, TelegramLogo, Link as LinkIcon, type Icon } from "@phosphor-icons/react";
import { contactLinks } from "@/data/site";

/**
 * Aloqa turi → ikonka. «Telegram», «Telefon» so'zlari o'rniga belgi turadi:
 * qiymatning o'zi (nomi, raqami) nima ekanini aytib turibdi, yozuv esa
 * faqat joy egallardi. Tanish bo'lmagan tur uchun umumiy havola belgisi —
 * `site.ts` ga yangi qator qo'shilsa buzilmasin.
 */
const ICONS: Record<string, Icon> = {
  Telegram: TelegramLogo,
  Telefon: Phone,
};

/**
 * Telegram va telefon — ikonka bilan, qiymati monospace da. Bosh sahifada
 * ham, «Men haqimda» sahifasida ham bir xil ko'rinadi, shuning uchun
 * bitta komponent.
 */
export function ContactPills({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {contactLinks.map((c) => {
        const Icon = ICONS[c.label] ?? LinkIcon;
        return (
          <li key={c.label}>
            <a
              href={c.href}
              aria-label={c.label}
              className="pill hover:bg-surface-2 focus-visible:focus-ring"
            >
              <Icon size={15} className="text-muted" aria-hidden />
              {/*
                Qiymat monospace da: `0/O` va `1/l` ajraladi va raqamni
                ko'z bilan ko'chirish osonlashadi.
              */}
              <span className="font-mono text-[13px] tracking-[-0.01em]">{c.value}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
