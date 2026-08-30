/**
 * Saytning yagona konfiguratsiyasi: manzil, aloqa, ijtimoiy tarmoqlar.
 * Metadata, sitemap, JSON-LD, aloqa sahifasi va CV PDF — hammasi shu yerdan
 * o'qiydi, shuning uchun raqam yoki havolani bitta joyda o'zgartirish yetarli.
 */
export const siteConfig = {
  url: "https://berdiyev.design",
  name: "Berdiyev Behruzbek",
  shortName: "berdiyev.design",
  role: "UI/UX Designer & Full-stack Developer",
  locale: "en",

  email: "behruzberdiyev518@gmail.com",
  /** `tel:` havolasi uchun — bo'shliqsiz. */
  phone: "+998995182901",
  /** Ekranda ko'rinadigan ko'rinish. */
  phoneDisplay: "+998 99 518 29 01",
  timezone: "UTC+5",

  socials: {
    telegram: "https://t.me/CBehruz",
    linkedin: "https://www.linkedin.com/in/behruz-berdiyev-8a2800281/",
    github: "https://github.com/Behruz0129",
    instagram: "https://instagram.com/bekhruz.uiux",
  },
  /** PDF va OG rasmda ishlatiladigan brend rangi. */
  brandColor: "#7c3aed",
} as const;

export const socialLinks = [
  { label: "Telegram", href: siteConfig.socials.telegram },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "Instagram", href: siteConfig.socials.instagram },
] as const;

/** Bevosita aloqa — HR va mijoz eng avval shularni qidiradi. */
export const contactLinks = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Telefon", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { label: "Telegram", value: "@CBehruz", href: siteConfig.socials.telegram },
] as const;
