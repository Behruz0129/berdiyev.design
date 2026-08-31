"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

/** Bitta "piksel" katagining ekrandagi o'lchami. */
const CELL = 13;
/** Almashish qancha davom etadi. */
const DISSOLVE_MS = 480;
/**
 * Bitta kadr oralig'i. `requestAnimationFrame` emas: sahifa ko'rinmay
 * qolganda rAF butunlay to'xtaydi va almashish o'rtasida muzlab qolardi —
 * xuddi matn effektidagi kabi. Taymer fon rejimida sekinlashadi, lekin
 * ishlaydi, shuning uchun zanjir uzilmaydi.
 */
const FRAME_MS = 40;

/** Fisher–Yates: kataklar tartibini bir marta aralashtiradi. */
function shuffled(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Rasmni `object-contain` qoidasi bo'yicha qutiga joylashtiradi: nisbati
 * saqlanadi, chetlarida bo'sh joy qoladi.
 */
function containRect(img: HTMLImageElement, boxW: number, boxH: number, pad: number) {
  const w = boxW - pad * 2;
  const h = boxH - pad * 2;
  const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  return { dx: pad + (w - dw) / 2, dy: pad + (h - dh) / 2, dw, dh };
}

const ready = (img: HTMLImageElement | null | undefined): img is HTMLImageElement =>
  Boolean(img && img.complete && img.naturalWidth > 0);

/**
 * Rasmlarni bir-biriga «erib o'tish» bilan emas, kataklab almashtiradi:
 * har kadrda tasodifiy tanlangan bir necha katak eskisidan yangisiga
 * o'tadi. Bu sarlavhadagi harflar aralashuvi bilan bir xil mavzu —
 * u yerda belgilar, bu yerda piksellar.
 *
 * NIMA UCHUN CANVAS
 * ─────────────────
 * Buni CSS bilan qilish uchun rasmni yuzlab bo'lakka bo'lib, har biriga
 * alohida element va kechikish berish kerak bo'lardi. Canvas da esa bu
 * bitta chizish tsikli.
 *
 * Rasmlarning o'zi DOM da `next/image` bo'lib qoladi (ko'rinmas holda) —
 * shunda Next.js ularni optimallashtiradi va oldindan yuklaydi; canvas
 * esa o'sha yuklangan elementlardan chizadi. `new Image()` bilan alohida
 * yuklansa, optimizatsiya chetlab o'tilib, har biri asl PNG (~600 KB)
 * holida tortilardi.
 *
 * O'LCHAM BILAN BOG'LIQ NOZIK JOY
 * ───────────────────────────────
 * Canvas ning ichki buferi (`canvas.width`) va uning ekrandagi o'lchami
 * (CSS) bir-biriga mos bo'lishi shart. Mos kelmasa brauzer buferni
 * cho'zib ko'rsatadi va rasm "yaqinlashgan" bo'lib chiqadi. Shu sabab
 * o'lcham bitta joyda — `syncSize()` da boshqariladi va u faqat o'lcham
 * haqiqatan o'zgargandagina buferni qayta o'rnatadi (bufer qayta
 * o'rnatilganda canvas tozalanadi, ya'ni buni almashish o'rtasida qilib
 * bo'lmaydi).
 */
export function PixelDissolve({
  sources,
  index,
  className = "",
  sizes,
  padding = 16,
}: {
  sources: string[];
  index: number;
  className?: string;
  sizes: string;
  /** Rasm atrofidagi bo'sh joy (px) — `object-contain` uchun. */
  padding?: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  /** Hozir canvasda to'liq chizilgan rasm indeksi (−1 — hali hech nima). */
  const shown = useRef(-1);
  /** Oxirgi marta o'rnatilgan CSS o'lchami. */
  const size = useRef({ w: 0, h: 0 });
  /** Ekran zichligi — kataklarni nusxalashda piksel hisobiga kerak. */
  const ratio = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  /**
   * Canvas buferini elementning haqiqiy o'lchamiga tenglaydi.
   * O'lcham o'zgarmagan bo'lsa hech narsa qilmaydi — bufer tegilmasa
   * canvasdagi rasm ham joyida qoladi.
   */
  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return { w: 0, h: 0, changed: false };

    const rect = box.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w === 0 || h === 0) return { w, h, changed: false };
    if (w === size.current.w && h === size.current.h) return { w, h, changed: false };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ratio.current = dpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    size.current = { w, h };
    return { w, h, changed: true };
  }, []);

  /** Bitta rasmni butunlay chizadi. */
  const paintFull = useCallback(
    (i: number) => {
      const canvas = canvasRef.current;
      const img = imgRefs.current[i];
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !ready(img)) return;

      syncSize();
      const { w, h } = size.current;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);
      const r = containRect(img, w, h, padding);
      ctx.drawImage(img, r.dx, r.dy, r.dw, r.dh);
      shown.current = i;
    },
    [padding, syncSize],
  );

  /* ── O'lcham kuzatuvchisi. Bir marta o'rnatiladi. ─────────────────── */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const observer = new ResizeObserver(() => {
      const { changed } = syncSize();
      // Bufer qayta o'rnatilgani uchun canvas bo'shab qoldi — hozirgi
      // rasmni qaytadan chizamiz. Almashish ketayotgan bo'lsa u to'xtaydi
      // va oxirgi holatga sakraydi: yarim chizilgan holatni cho'zib
      // ko'rsatgandan ko'ra shunisi to'g'ri.
      if (!changed) return;
      window.clearInterval(timer.current);
      if (shown.current >= 0) paintFull(shown.current);
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, [syncSize, paintFull]);

  /* ── Indeks o'zgarganda ──────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const to = imgRefs.current[index];
    if (!canvas || !ctx || !ready(to)) return;

    // O'lcham AVVAL tenglashtiriladi: almashish boshlangach buferga
    // tegib bo'lmaydi, aks holda chizilgani o'chib ketadi.
    syncSize();
    const { w, h } = size.current;
    if (!w || !h) return;

    const from = imgRefs.current[shown.current];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Birinchi chizish yoki harakat kamaytirilgan bo'lsa — shunchaki chizamiz.
    if (reduced || shown.current === index || !ready(from)) {
      paintFull(index);
      return;
    }

    const cols = Math.ceil(w / CELL);
    const rows = Math.ceil(h / CELL);
    const order = shuffled(cols * rows);
    const dpr = ratio.current;

    /*
      Yangi rasm AVVAL yashirin canvasga aynan yakuniy holatidagidek
      chiziladi. Kataklar keyin o'shandan piksel-bapiksel ko'chiriladi.

      Avval har katak rasmning o'zidan qayta o'lchamlanib chizilardi —
      kasr koordinatalar tufayli har bo'lak yarim piksel siljib, terilgan
      rasm yakunidagidan biroz farq qilardi. Tayyor nusxadan ko'chirishda
      esa qayta o'lchamlash umuman bo'lmaydi: terilib bo'lgan rasm bilan
      yakuniy rasm bir xil piksellardan iborat.
    */
    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = containRect(to, w, h, padding);
    octx.drawImage(to, target.dx, target.dy, target.dw, target.dh);

    // Eski rasm to'liq holatda — undan boshlaymiz.
    ctx.clearRect(0, 0, w, h);
    const fromRect = containRect(from, w, h, padding);
    ctx.drawImage(from, fromRect.dx, fromRect.dy, fromRect.dw, fromRect.dh);

    let drawn = 0;
    const startedAt = performance.now();

    const tick = () => {
      const t = Math.min((performance.now() - startedAt) / DISSOLVE_MS, 1);
      const upTo = Math.floor(t * order.length);

      for (; drawn < upTo; drawn++) {
        const cell = order[drawn];
        const cx = (cell % cols) * CELL;
        const cy = Math.floor(cell / cols) * CELL;

        // Katak quti chetiga tushsa qirqiladi — nusxadan tashqarisini
        // so'rash mumkin emas.
        const cw = Math.min(CELL, w - cx);
        const ch = Math.min(CELL, h - cy);
        if (cw <= 0 || ch <= 0) continue;

        // Rasmlar shaffof fonli — eski qoldiq tozalanmasa ikkalasi
        // ustma-ust ko'rinib qolardi.
        ctx.clearRect(cx, cy, cw, ch);

        // 1:1 nusxa: manba piksellarda, maqsad CSS birligida — ikkalasi
        // `dpr` orqali aynan bir-biriga tushadi, hech narsa cho'zilmaydi.
        ctx.drawImage(
          off,
          Math.round(cx * dpr),
          Math.round(cy * dpr),
          Math.round(cw * dpr),
          Math.round(ch * dpr),
          cx,
          cy,
          cw,
          ch,
        );
      }

      if (t >= 1) {
        window.clearInterval(id);
        // Yakunda o'sha nusxa butunligicha qo'yiladi: kataklar orasida
        // yaxlitlashdan qolgan ingichka chiziqlar ham yo'qoladi va natija
        // terilgan holat bilan aynan bir xil bo'ladi.
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, w, h);
        shown.current = index;
      }
    };

    const id = window.setInterval(tick, FRAME_MS);
    timer.current = id;
    shown.current = index;

    return () => window.clearInterval(id);
  }, [index, padding, paintFull, syncSize]);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      {/*
        Manba rasmlar. Ekranda ko'rinmaydi (`opacity-0`), lekin DOM da
        turadi — shunda Next.js ularni optimallashtiradi va oldindan
        yuklaydi, canvas esa shulardan chizadi.

        `alt` bo'sh: jihoz nomi kartochkada matn bo'lib yozilgan, ekran
        o'quvchi uchun uni ikki marta o'qish keraksiz.
      */}
      {sources.map((src, i) => (
        <Image
          key={src}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={i === 0}
          className="pointer-events-none object-contain opacity-0"
          onLoad={() => {
            // Yuklanish tugagach faqat hozir kerak bo'lgan rasm chiziladi.
            // Qolganlari almashish payti kelguncha kutib turadi.
            if (i === index) paintFull(i);
          }}
        />
      ))}

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
    </div>
  );
}
