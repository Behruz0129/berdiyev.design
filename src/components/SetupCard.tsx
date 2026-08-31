"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Card } from "@/components/Card";
import { useLocale } from "@/contexts/LocaleContext";
import { setupItems } from "@/data/setup";

/** Bitta jihoz necha millisekund turadi. */
const HOLD_MS = 4500;

/**
 * Ish stoli jihozlari — bittalab o'zi almashib turadi.
 *
 * Kartochka ikki ustunni egallaydi va ichida yonma-yon bo'linadi: chapda
 * kvadrat rasm, o'ngda nom, izoh va (bo'lsa) texnik tarkib. Ustun-ustun
 * qilib qo'yilsa kompyuterning yetti qatorli tarkibi sig'may, kartochka
 * qo'shnisidan ikki barobar uzun bo'lib ketardi.
 *
 * Rasmlar bir-birining ustiga qo'yiladi va faqat shaffofligi o'zgaradi —
 * shunda almashishda balandlik qimirlamaydi. Rasmlarning o'zi fonsiz PNG,
 * shuning uchun `object-contain`: buyum qirqilmaydi, kartochka foni
 * ustida turadi.
 *
 * Ro'yxat bo'sh bo'lsa kartochka umuman chizilmaydi.
 */
export function SetupCard() {
  const { t, locale } = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = setupItems.length;

  // Taymer `index` ga bog'langan: qo'lda boshqa jihozga o'tilganda hisob
  // noldan boshlanadi, aks holda yangi rasm bir lahzada almashib ketardi.
  useEffect(() => {
    if (count < 2 || paused) return;

    // Harakatni kamaytirish yoqilgan bo'lsa o'zi aylanmaydi — foydalanuvchi
    // nuqtalar orqali o'zi boshqaradi.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  if (count === 0) return null;

  const active = setupItems[index];

  return (
    <Card
      label={t("personal.setupLabel")}
      className="sm:col-span-2"
      bodyClassName="flex flex-col gap-4 sm:flex-row sm:gap-5"
      // Sichqoncha ustida to'xtaydi — izohni o'qish va tarkibni ko'rish
      // uchun vaqt qoladi.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/*
        Ikkala ustunga ham bir xil qat'iy balandlik berilgan. Balandlikni
        tanaga (`bodyClassName`) yozib bo'lmaydi — undagi `flex-1` uni
        bekor qiladi; erkin qoldirilsa esa kompyuterning yetti qatorli
        tarkibi kartochkani cho'zib, har aylanishda qatorni sakratadi.
      */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-card-2 sm:aspect-auto sm:h-[15rem] sm:w-[15rem] lg:h-[17rem] lg:w-[17rem]">
        {setupItems.map((item, i) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 272px"
            // Birinchi rasm darhol kerak; qolganlari almashishdan oldin
            // brauzer tomonidan yuklab qo'yiladi.
            priority={i === 0}
            className={`object-contain p-4 transition-opacity duration-300 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col sm:h-[15rem] lg:h-[17rem]">
        <div className="text-[16px] font-medium leading-snug text-foreground">{active.name}</div>

        {/*
          Izoh va tarkib bitta erkin oynada: kartochka balandligini rasm
          belgilaydi, matn esa shu balandlikka sig'adi. Agar biror jihozning
          tarkibi juda uzun bo'lsa — kartochka cho'zilmaydi, matn o'sha
          yerning o'zida aylantiriladi (scrollbar ko'rinmaydi).
        */}
        <div className="scroll-fade mt-1.5 min-h-[4.5rem] flex-1 pr-1 sm:min-h-0">
          <p className="text-[13.5px] leading-6 text-muted">{active.description[locale]}</p>

          {active.specs ? (
            <ul className="mt-2 space-y-1">
              {active.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex gap-2 font-mono text-[11.5px] leading-[17px] text-foreground/55"
                >
                  <span className="text-accent">·</span>
                  {spec}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {count > 1 ? (
          /*
            Nuqtalar ko'zga 6px bo'lib ko'rinadi, lekin har biri 28px lik
            bosiladigan maydon ichida turadi (`py-2 px-1` + manfiy chekka)
            — shundan barmoq bilan ham osongina tegiladi. Yonida oldinga
            va orqaga o'tkazadigan ikkita tugma: ro'yxat o'n ikkita, kerakli
            nuqtani izlab o'tirmasdan ketma-ket ko'rib chiqiladi.
          */
          <div className="-mb-2 mt-3 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              aria-label={t("personal.setupPrev")}
              className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:focus-ring"
            >
              <CaretLeft size={15} weight="bold" />
            </button>

            <div className="flex items-center">
              {setupItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={item.name}
                  aria-current={i === index}
                  className="group px-1 py-2 focus-visible:focus-ring"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-200 ${
                      i === index
                        ? "w-5 bg-accent"
                        : "w-1.5 bg-foreground/20 group-hover:bg-foreground/45"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % count)}
              aria-label={t("personal.setupNext")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:focus-ring"
            >
              <CaretRight size={15} weight="bold" />
            </button>

            <span className="ml-auto font-mono text-[11px] tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
            </span>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
