/**
 * Saytning yagona konfiguratsiyasi: manzil, ijtimoiy tarmoqlar, brend ranglari.
 * Metadata, sitemap, JSON-LD, aloqa sahifasi va CV PDF — hammasi shu yerdan o'qiydi,
 * shuning uchun havolani bitta joyda o'zgartirish yetarli.
 */
export const siteConfig = {
  url: "https://berdiyev.design",
  name: "Berdiyev Bexruzbek",
  shortName: "berdiyev.design",
  role: "UI/UX Designer & Frontend Developer",
  locale: "en",
  socials: {
    telegram: "https://t.me/CBehruz",
    linkedin: "https://www.linkedin.com/in/behruz-berdiyev-8a2800281/",
    github: "https://github.com/Behruz0129",
    instagram: "https://instagram.com/designtizyy",
  },
  /** PDF va OG rasmda ishlatiladigan brend rangi (globals.css dagi --grad-a bilan bir xil). */
  brandColor: "#7c3aed",
} as const;

export const socialLinks = [
  { label: "Telegram", href: siteConfig.socials.telegram },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "Instagram", href: siteConfig.socials.instagram },
] as const;
