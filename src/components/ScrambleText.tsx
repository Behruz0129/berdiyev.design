"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CYRILLIC =
  "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯабвгдежзиклмнопрстуфхцчшэюя0123456789";

/**
 * Aralashtirish uchun harf tanlaydi — maqsad harfi qaysi alifboda bo'lsa,
 * o'sha alifbodan. Aks holda ruscha iborada lotin harflari paydo bo'lib,
 * effekt "dekodlash" emas, "matn buzilgan" bo'lib ko'rinardi.
 */
const randomChar = (cyrillic: boolean) => {
  const set = cyrillic ? CYRILLIC : LATIN;
  return set[Math.floor(Math.random() * set.length)];
};

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
  prefix,
  className = "",
}: {
  phrases: string[];
  /**
   * Iboradan oldin turadigan o'zgarmas so'z («Men»). U ataylab shu
   * qutining ichida: tashqarida qolsa tor ekranda yolg'iz qatorda
   * qolib ketardi.
   */
  prefix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(phrases[0] ?? "");
  const timers = useRef<number[]>([]);
  const boxRef = useRef<HTMLSpanElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);

  /*
    IBORA HAR DOIM BITTA QATORDA.

    Tor ekranda «Men Front End dasturchiman.» sarlavha o'lchamida qatorga
    sig'maydi. Avval u pastga tushardi — quti esa bir qatorga mo'ljallangani
    uchun matn ostidagi paragrafning ustiga chiqib ketardi.

    Endi qator hech qachon bo'linmaydi: sig'masa shrift shu qatorning
    o'zida kichrayadi. Kichrayish 0.62 dan pastga tushmaydi — undan keyin
    matn o'qilmay qoladi, shuning uchun qolgani oddiygina kesiladi
    (ko'rinadigan qatlamda `overflow: hidden`).

    O'lchash tartibi muhim: avval mavjud kenglik olinadi va u oldingisi
    bilan bir xil bo'lsa umuman tegilmaydi — aks holda shriftni
    o'zgartirish sarlavha balandligini o'zgartirib, `ResizeObserver` ni
    qayta chaqirar va cheksiz aylanish hosil bo'lardi.
  */
  useLayoutEffect(() => {
    const box = boxRef.current;
    const sizer = sizerRef.current;
    const parent = box?.parentElement;
    if (!box || !sizer || !parent) return;

    let lastAvailable = -1;

    const fit = () => {
      const available = parent.getBoundingClientRect().width;
      if (!available || Math.abs(available - lastAvailable) < 0.5) return;
      lastAvailable = available;

      // O'z o'lchamiga qaytarib o'lchaymiz, aks holda hisob o'ziga bog'lanib qoladi
      box.style.fontSize = "";
      const natural = sizer.getBoundingClientRect().width;
      if (!natural) return;

      const ratio = available / natural;
      box.style.fontSize = ratio < 1 ? `${Math.max(ratio, 0.62)}em` : "";
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [phrases]);

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

      // Alifbo butun ibora bo'yicha bir marta aniqlanadi. Har harf uchun
      // alohida tekshirilsa, qisqa iboradan uzuniga o'tishda ortiqcha
      // o'rinlarning maqsad harfi bo'sh bo'lib qoladi va o'sha joylarga
      // lotin harflari tushib, ruscha qatorda «IRkt16B» kabi aralashma
      // paydo bo'lardi.
      const cyrillic = /[Ѐ-ӿ]/.test(to);
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
            out += target === " " ? " " : randomChar(cyrillic);
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

  const lead = prefix ? `${prefix} ` : "";

  return (
    /*
      Quti — yaxlit `inline-block`, ichida ikki qatlam:

      • ko'rinmas nusxa eng uzun iborani chizadi va shu bilan qutining
        ENI ham, BALANDLIGI ham qat'iy bo'lib qoladi;
      • ko'rinadigan matn uning ustida absolyut turadi.

      Shu sabab almashish paytida qator soni o'zgarmaydi. Avval tor ekranda
      matn oddiy oqimda edi: tasodifiy harflarning eni turlicha bo'lgani
      uchun ibora goh bir, goh ikki qatorga tushib, sarlavha sakrardi.
      Endi u umuman bo'linmaydi — yuqoridagi «sig'dirish» effektiga qarang.

      «Men» ham shu qutining ichida — tashqarida qolsa, quti butun
      kenglikni egallab, u yolg'iz qatorda qolib ketardi.
    */
    <span ref={boxRef} className="relative inline-block max-w-full whitespace-nowrap">
      <span ref={sizerRef} className="invisible" aria-hidden>
        {lead}
        {longest}
      </span>
      {/*
        Ko'rinadigan qatlam kesiladi. Aralashtirish paytida tasodifiy
        harflar tayyor matndan kengroq bo'lishi mumkin — o'shanda oxiri
        qirqiladi va bir zumdan keyin joyiga tushadi. Qutining o'zida
        emas, aynan shu absolyut qatlamda: `overflow` inline-block ning
        tayanch chizig'ini o'zgartiradi va sarlavha qatori siljib ketardi.
      */}
      <span className="absolute inset-0 overflow-hidden" aria-hidden>
        {lead ? <span className="text-foreground">{lead}</span> : null}
        <span className={className}>{display}</span>
      </span>
      <span className="sr-only">
        {prefix ? `${prefix} ` : ""}
        {phrases.join(", ")}
      </span>
    </span>
  );
}
