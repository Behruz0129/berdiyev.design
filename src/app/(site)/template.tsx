"use client";

/**
 * Sahifa almashinuvi animatsiyasi.
 *
 * `template.tsx` `layout.tsx` dan shu bilan farq qiladi: Next uni har
 * navigatsiyada QAYTA o'rnatadi. Shuning uchun animatsiya har o'tishda
 * qaytadan ishlaydi \u2014 layoutga qo'yilsa faqat birinchi ochilishda
 * ko'rinardi.
 *
 * Uslub `globals.css` da (`.page-enter`) va `html.has-js` ostida.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
