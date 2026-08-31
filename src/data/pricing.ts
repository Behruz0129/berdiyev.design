/**
 * Narxlar ro'yxati.
 *
 * ⚠️ RAQAMLAR TO'LDIRILISHI KERAK. Ro'yxat bo'sh bo'lsa bo'lim bosh
 * sahifada umuman chiqmaydi — o'ylab topilgan narx turgandan ko'ra
 * yo'qligi yaxshi, chunki e'lon qilingan narxni keyin ushlab turish
 * kerak bo'ladi.
 *
 * `from` — "shundan boshlanadi" degani, aniq narx emas. Aniq narx brifdan
 * keyin chiqadi va buni `priceNote` aytib turadi.
 */

export type PriceItem = {
  id: string;
  /** Xizmat nomi. Uch tilda. */
  title: { uz: string; ru: string; en: string };
  /** Eng past narx. Valyuta `PRICE_CURRENCY` da. */
  from: number;
  /** Odatiy muddat — mijozning ikkinchi savoli shu. */
  duration: { uz: string; ru: string; en: string };
  /** Narxga nima kiradi: 2–4 ta qisqa band. */
  includes: { uz: string[]; ru: string[]; en: string[] };
};

/** Ekranda narx yonida turadigan belgi. */
export const PRICE_CURRENCY = "$";

/**
 * MISOL (o'chirib, o'zingiznikini yozing):
 *
 * {
 *   id: "landing",
 *   title: { uz: "Landing sahifa", ru: "Лендинг", en: "Landing page" },
 *   from: 400,
 *   duration: { uz: "2–3 hafta", ru: "2–3 недели", en: "2–3 weeks" },
 *   includes: {
 *     uz: ["Figmada dizayn", "Uch tilli matn", "Forma Telegram yoki CRM ga", "Serverga chiqarish"],
 *     ru: ["Дизайн в Figma", "Три языка", "Форма в Telegram или CRM", "Деплой"],
 *     en: ["Design in Figma", "Three languages", "Form to Telegram or CRM", "Deployment"],
 *   },
 * },
 */
export const priceList: PriceItem[] = [];
