"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Aralashtirish qancha davom etadi. 02UI tavsiyasi: mahsulot interfeysida
 * bir soniyadan oshmasin — undan uzoq bo'lsa o'quvchi kutib qoladi.
 */
const SCRAMBLE_MS = 750;
/** Tayyor ibora qancha turadi. */
const HOLD_MS = 2600;
/**
 * Bitta kadr oralig'i. `requestAnimationFrame` emas, `setInterval`
 * ishlatilgan: rAF sahifa ko'rinmay qolganda butunlay to'xtaydi va o'tish
 * o'rtasida muzlab qoladi — foydalanuvchi boshqa tabga o'tib qaytsa
 * matn abadiy qotgan holida qolardi. Taymer esa fon rejimida sekinlashadi,
 * lekin baribir ishlaydi, shuning uchun zanjir hech qachon uzilmaydi.
 * Harflar diskret o'zgargani uchun 25 kadr/sekund ko'zga bilinmaydi.
 */
const FRAME_MS = 40;

/**
 * Tasodifiy harflar to'plami. Shriftga yaqin bo'lishi kerak: ekzotik
 * belgilar qo'shilsa qator "buzilgan" ko'rinadi, kenglik ham sakraydi.
 */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Iboralarni ketma-ket almashtiradi: eski matn tasodifiy harflarga
 * aylanadi, keyin yangisi harfma-harf "o'tirib" chiqadi.
 *
 * Uchta narsa ataylab shunday:
 *
 * 1. HAQIQIY MATN HUJJATDA QOLADI. Aralashgan harflar `aria-hidden`,
 *    yoniga esa `sr-only` bilan uchala lavozim yozilgan — ekran o'quvchi
 *    va qidiruv tizimi shovqinni emas, ma'noni oladi.
 *
 * 2. KENGLIK OLDINDAN BAND QILINADI. Eng uzun ibora ko'rinmas holda
 *    chiziladi va joyni ushlab turadi; aks holda har almashishda
 *    sarlavha qatori sakrardi.
 *
 * 3. HARAKATNI KAMAYTIRISH yoqilgan bo'lsa umuman aylanmaydi — birinchi
 *    ibora tinch turadi.
 *
 * Eslatma: 02UI sarlavhada takrorlanuvchi aylanishni tavsiya qilmaydi
 * ("bir marta yetarli, aylanish sahifa hali yuklanayotgandek ko'rinadi").
 * Bu yerda aylanish ataylab sekin: har ibora ~2.6 soniya turadi, ya'ni
 * o'qishga ulguriladi va qator tinimsiz qimirlamaydi.
 */
export function ScrambleText({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [display, setDisplay] = useState(phrases[0] ?? "");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let cancelled = false;

    const clearTimers = () => {
      timers.current.forEach((id) => window.clearInterval(id));
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };

    /** Bitta o'tish: `from` dan `to` ga harflar bo'ylab. */
    function scrambleTo(from: string, to: string, done: () => void) {
      const length = Math.max(from.length, to.length);

      // Har harf o'z vaqtida "o'tiradi": chapdan o'ngga, biroz tasodif
      // bilan — hammasi bir zumda paydo bo'lsa effekt yo'qoladi.
      const schedule = Array.from({ length }, (_, i) => {
        const start = (i / length) * 0.45 + Math.random() * 0.2;
        return { start, end: start + 0.15 + Math.random() * 0.25 };
      });

      const startedAt = performance.now();

      const tick = () => {
        if (cancelled) return;
        const t = Math.min((performance.now() - startedAt) / SCRAMBLE_MS, 1);

        let out = "";
        for (let i = 0; i < length; i++) {
          const target = to[i] ?? "";
          const { start, end } = schedule[i];

          if (t >= end) {
            out += target;
          } else if (t >= start) {
            // Bo'shliqlar aralashmaydi — so'zlar orasidagi ajratgich
            // qolgani uchun qator o'qiladigan bo'lib turadi.
            out += target === " " ? " " : randomChar();
          } else {
            out += from[i] ?? "";
          }
        }
        setDisplay(out);

        if (t >= 1) {
          window.clearInterval(id);
          setDisplay(to);
          done();
        }
      };

      const id = window.setInterval(tick, FRAME_MS);
      timers.current.push(id);
    }

    function next() {
      const from = phrases[index];
      index = (index + 1) % phrases.length;
      scrambleTo(from, phrases[index], () => {
        timers.current.push(window.setTimeout(next, HOLD_MS));
      });
    }

    timers.current.push(window.setTimeout(next, HOLD_MS));

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [phrases]);

  // Kenglikni eng uzun ibora belgilaydi.
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="invisible" aria-hidden>
        {longest}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {display}
      </span>
      <span className="sr-only">{phrases.join(", ")}</span>
    </span>
  );
}
