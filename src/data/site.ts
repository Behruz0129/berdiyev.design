/**
 * Saytning yagona konfiguratsiyasi: manzil, aloqa, ijtimoiy tarmoqlar.
 * Metadata, sitemap, JSON-LD, aloqa sahifasi va CV PDF — hammasi shu yerdan
 * o'qiydi, shuning uchun raqam yoki havolani bitta joyda o'zgartirish yetarli.
 *
 * POCHTA ATAYLAB YO'Q. Mijozlar bilan aloqa faqat Telegram, telefon va
 * aloqa formasi orqali, shuning uchun sayt hech qayerda email ko'rsatmaydi
 * va so'ramaydi — formaning o'zi ham. Qaytadan qo'shilsa, u aloqa
 * ro'yxatida, formada, CV PDF da va marshrutda birdaniga paydo bo'lishi
 * kerak, aks holda yarim ishlaydigan kanal bo'lib qoladi.
 */
export const siteConfig = {
  url: "https://berdiyev.design",
  name: "Berdiyev Behruzbek",
  shortName: "berdiyev.design",
  role: "UI/UX Designer & Front End Developer",
  locale: "en",

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

  /** Ekranda va PDF da ko'rinadigan Telegram nomi. */
  telegramHandle: "@CBehruz",

  socials: {
    telegram: "https://t.me/CBehruz",
    github: "https://github.com/Behruz0129",
    instagram: "https://instagram.com/berdiyev.design",
    /** ⚠ Havola hali yo'q. Bo'sh bo'lsa ikonka umuman chiqmaydi. */
    dribbble: "",
  },
  /**
   * Brend rangi — saytning yorug' temadagi aksenti bilan bir xil
   * (`--accent`). CV PDF va OG rasm shu yerdan o'qiydi, shuning uchun
   * aksent o'zgarsa ikkalasi ham birga o'zgaradi.
   */
  brandColor: "#e94a12",
} as const;

/**
 * Faqat ikonka bilan ko'rsatiladigan profillar — ish emas, kim ekanini
 * ko'rsatadi. Telegram bu yerda yo'q: u `contactLinks` da to'liq yozilgan,
 * ikkala ro'yxatda turgani takror bo'lardi. Havolasi bo'sh yozuv
 * chiqarilmaydi.
 */
export const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram },
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "Dribbble", href: siteConfig.socials.dribbble },
].filter((s) => s.href.length > 0);

/** Bevosita aloqa. Telegram birinchi — javob eng tez shu yerdan keladi. */
export const contactLinks = [
  {
    label: "Telegram",
    value: siteConfig.telegramHandle,
    href: siteConfig.socials.telegram,
  },
  { label: "Telefon", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
] as const;
