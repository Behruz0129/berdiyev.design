import { Cormorant_Garamond, Outfit, Inter } from "next/font/google";

/**
 * Loyihalarda ISHLATILGAN shriftlar \u2014 portfolioning o'z shriftlari emas.
 *
 * Ular faqat \u00abdizayn tizimi\u00bb blokidagi namunani chizish uchun kerak:
 * shrift nomini yozib qo'yish bilan uni ko'rsatish boshqa narsa. Har biri
 * `preload: false` \u2014 fayl faqat shu blok bor sahifada yuklanadi, bosh
 * sahifa yoki aloqa sahifasi ular uchun bir bayt ham to'lamaydi.
 *
 * `next/font` shriftni build paytida o'z domenimizga ko'chiradi, shuning
 * uchun Google'ga hech qanday so'rov ketmaydi.
 */

/** GIGU \u2014 sarlavhalar. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

/** GIGU \u2014 matn. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

/** Modme \u2014 sarlavha ham, matn ham. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const projectFonts = {
  cormorant: cormorant.className,
  outfit: outfit.className,
  inter: inter.className,
} as const;

export type ProjectFontKey = keyof typeof projectFonts;
