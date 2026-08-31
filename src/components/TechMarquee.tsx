"use client";

import {
  siFigma,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siPrisma,
  siPostgresql,
  siRedis,
  siDocker,
  siGit,
} from "simple-icons";

/**
 * Vositalar ro'yxati. `simple-icons` har brend uchun bitta SVG yo'li beradi,
 * shuning uchun rasm yuklanmaydi — hammasi bitta `<path>`.
 *
 * Bitrix24 shu ro'yxatda yo'q: kutubxonada uning logotipi yo'q, o'zim chizib
 * qo'yish esa brend belgisini soxtalashtirish bo'lardi. U GIGU loyihasi
 * sahifasida matn bilan yozilgan.
 */
const TECH = [
  siFigma,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siNodedotjs,
  siNestjs,
  siPrisma,
  siPostgresql,
  siRedis,
  siDocker,
  siGit,
];

/**
 * Cheksiz aylanuvchi lenta. Ro'yxat uch marta chiziladi va lenta o'z
 * uzunligining aynan uchdan biriga suriladi — surilish tugaganda ikkinchi
 * nusxa birinchisi turgan joyda bo'ladi, shuning uchun sakrash sezilmaydi.
 *
 * Ikki nusxa yetmaydi: bitta nusxa kartochkadan tor bo'lsa, lenta yarmiga
 * yetganda o'ngda bo'sh joy ochilib qolardi. Uchtasi bilan bunday bo'lmaydi.
 *
 * Logotiplar kulrang: rang-barang belgilar kartochkadagi boshqa hamma
 * narsadan baland ovozda gapirardi. Sichqoncha ustiga kelganda bittasi
 * o'z brend rangiga kiradi.
 */
export function TechMarquee() {
  // Ikki qator qarama-qarshi yo'nalishda yuradi. Bitta qator tor katakda
  // yolg'iz chiziqday ko'rinardi; ikkitasi bo'shliqni to'ldiradi va
  // qarshi harakat ko'zni ushlab turadi.
  const half = Math.ceil(TECH.length / 2);
  const rows = [TECH.slice(0, half), TECH.slice(half)];

  return (
    <div
      className="marquee-mask relative -mx-1 flex flex-col gap-5 overflow-hidden py-1"
      // Lenta faqat bezak — o'quvchi uchun ro'yxat `aria-label` da.
      role="img"
      aria-label={TECH.map((t) => t.title).join(", ")}
    >
      {rows.map((row, r) => (
        <ul
          key={r}
          className={`flex w-max items-center gap-10 ${
            r === 0 ? "marquee-track" : "marquee-track-reverse"
          }`}
        >
          {[...row, ...row, ...row].map((tech, i) => (
            <li key={`${tech.slug}-${i}`} className="flex-shrink-0" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                className="h-[30px] w-[30px] text-foreground/35 transition-colors duration-300 hover:text-[var(--brand)]"
                style={{ ["--brand" as string]: `#${tech.hex}` }}
                fill="currentColor"
              >
                <title>{tech.title}</title>
                <path d={tech.path} />
              </svg>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
