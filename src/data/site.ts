/**
 * Saytning yagona konfiguratsiyasi: manzil, aloqa, ijtimoiy tarmoqlar.
 * Metadata, sitemap, JSON-LD, aloqa sahifasi va CV PDF — hammasi shu yerdan
 * o'qiydi, shuning uchun raqam yoki havolani bitta joyda o'zgartirish yetarli.
 */
export const siteConfig = {
  url: "https://berdiyev.design",
  name: "Berdiyev Behruzbek",
  shortName: "berdiyev.design",
  role: "UI/UX Designer & Front End Developer",
  locale: "en",

  email: "behruzberdiyev518@gmail.com",
  /** `tel:` havolasi uchun — bo'shliqsiz. */
  phone: "+998995182901",
  /** Ekranda ko'rinadigan ko'rinish. */
  phoneDisplay: "+998 99 518 29 01",
  timezone: "UTC+5",
  /**
   * Joylashuv kartochkasidagi xarita havolasi. Uzun Google Maps
   * havolasidan faqat koordinatalar olindi — ular havolaning o'zida
   * ochiq yozilgan (`!3d41.2974284!4d69.2861493`), shuning uchun aniq.
   */
  mapUrl: "https://www.google.com/maps/search/?api=1&query=41.2974284,69.2861493",

  socials: {
    telegram: "https://t.me/CBehruz",
    github: "https://github.com/Behruz0129",
    instagram: "https://instagram.com/berdiyev.design",
    /** ⚠ Havola hali yo'q. Bo'sh bo'lsa ikonka umuman chiqmaydi. */
    dribbble: "",
  },
  /** PDF va OG rasmda ishlatiladigan brend rangi. */
  brandColor: "#7c3aed",
} as const;

/**
 * Faqat ikonka bilan ko'rsatiladigan profillar. Telegram bu yerda yo'q — u
 * `contactLinks` da to'liq yozilgan, ikkala ro'yxatda turgani takror bo'lardi.
 * Havolasi bo'sh yozuv chiqarilmaydi.
 */
export const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "Dribbble", href: siteConfig.socials.dribbble },
].filter((s) => s.href.length > 0);

/** Bevosita aloqa — HR va mijoz eng avval shularni qidiradi. */
export const contactLinks = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Telefon", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { label: "Telegram", value: "@CBehruz", href: siteConfig.socials.telegram },
] as const;
