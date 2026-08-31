"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Element ko'rinish maydoniga kirganda yumshoq ochiladi.
 *
 * Yashirin holat CSS da (`globals.css`, `[data-reveal]`) va faqat
 * `html.has-js` ostida \u2014 shuning uchun bu yerda hech narsani JS bilan
 * yashirish shart emas va \u00abko'rindi \u2192 yashirindi\u00bb miltillashi bo'lmaydi.
 *
 * Kuzatuvchi BITTA: har element uchun alohida `IntersectionObserver`
 * yaratish o'nlab kuzatuvchi degani, brauzer esa ularning har birini
 * alohida hisoblaydi. Bitta umumiy kuzatuvchi shu ishni bir marta qiladi.
 */
let observer: IntersectionObserver | null = null;

function shared() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        // Bir marta ochiladi \u2014 orqaga skroll qilganda qayta yashirinmaydi.
        observer?.unobserve(entry.target);
      }
    },
    // Element to'liq chiqishini kutmaymiz: pastdan 12% ko'ringani yetarli,
    // shunda ochilish skroll bilan birga ketadi, undan orqada qolmaydi.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
  );
  return observer;
}

export function Reveal({
  children,
  /** Ketma-ket chiqish uchun kechikish (ms). */
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
      Birinchi ekrandagi elementlar kuzatuvchini kutmaydi — sahifa
      ochilganda ular ketma-ket chiqishi kerak, skrollni kutib turishi emas.
      `useEffect` bo'yoqdan KEYIN ishlaydi, ya'ni brauzer elementni
      allaqachon shaffof holda chizgan; klass qo'shilishi o'tishni boshlab
      yuboradi va sakrash bo'lmaydi.

      Ekran balandligi nol bo'lib chiqishi mumkin — masalan sahifa hali
      o'lchamga ega bo'lmagan freym ichida ochilganda. O'shanda «ko'rinish
      maydoni» tushunchasi yo'q va element darhol ochiladi: yashirin
      qolgandan ko'ra animatsiyasiz ko'ringani yaxshi. Shu sabab
      `IntersectionObserver` ga ham to'liq tayanib bo'lmaydi — u
      brauzerning chizish qadamiga bog'liq va sahifa chizilmayotganda
      umuman ishlamaydi.
    */
    const viewport = window.innerHeight || document.documentElement.clientHeight;

    if (!viewport || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    // Birinchi ekrandagilar kuzatuvchini kutmaydi — darhol ketma-ket chiqadi
    if (el.getBoundingClientRect().top < viewport * 0.92) {
      el.classList.add("is-in");
      return;
    }

    const io = shared();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
