"use client";

import {
  InstagramLogo,
  GithubLogo,
  DribbbleLogo,
  TelegramLogo,
  LinkedinLogo,
  Link as LinkIcon,
  type Icon,
} from "@phosphor-icons/react";
import { socialLinks } from "@/data/site";

/**
 * Profil nomi → ikonka. Nomi tanish bo'lmasa umumiy havola belgisi chiqadi,
 * shunda `site.ts` ga yangi tarmoq qo'shilsa hech narsa buzilmaydi.
 */
const ICONS: Record<string, Icon> = {
  Instagram: InstagramLogo,
  GitHub: GithubLogo,
  Dribbble: DribbbleLogo,
  Telegram: TelegramLogo,
  LinkedIn: LinkedinLogo,
};

/**
 * Ijtimoiy tarmoqlar — faqat ikonka. Matnli yozuv yo'q, chunki bevosita
 * aloqa (Telegram, telefon) yonida turadi va e'tiborni bo'lmasligi
 * kerak: kerak bo'lganda topiladi, kerak bo'lmaganda ko'zga tashlanmaydi.
 */
export function SocialIconLinks({ className = "" }: { className?: string }) {
  if (socialLinks.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialLinks.map((s) => {
        const Icon = ICONS[s.label] ?? LinkIcon;
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="card flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground focus-visible:focus-ring"
            >
              <Icon size={19} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
