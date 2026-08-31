"use client";

import Image from "next/image";
import { MusicNotesSimple, PlayCircle } from "@phosphor-icons/react";
import { Card } from "@/components/Card";
import { useLocale } from "@/contexts/LocaleContext";
import { musicPlaylist } from "@/data/personal";

/**
 * Yelpig'ichdagi o'rinlar: markazdagisi tik va eng katta, chetdagilari
 * kichrayib, ko'proq qiyshayib boradi.
 *
 * Har o'ringa `z-*` ataylab yozilgan. Usiz plitkalar DOM tartibida
 * ustma-ust tushardi: chapdagilar qo'shnisining ostida, o'ngdagilar esa
 * ustida — ya'ni eng oxirgisi hammasidan baland turib, yelpig'ich
 * qiyshiq ko'rinardi. Endi markaz eng tepada, ikkala chet ham bir xilda
 * pastga tushib boradi.
 *
 * Beshta o'rin sanab yozilgan — hisoblab chiqarilsa Tailwind sinflarni
 * oldindan bila olmaydi va ular CSS ga umuman tushmasdi.
 */
const FAN = [
  "z-10 -rotate-[13deg] translate-y-3 scale-[0.8]",
  "z-20 -rotate-[7deg] translate-y-1 scale-[0.9]",
  "z-30 scale-[1.04]",
  "z-20 rotate-[7deg] translate-y-1 scale-[0.9]",
  "z-10 rotate-[13deg] translate-y-3 scale-[0.8]",
];

/** Muqova yo'q bo'lsa chiziladigan gradientlar. */
const SHADES = [
  "from-[#5b6472] to-[#2f3540]",
  "from-[#8a7bd8] to-[#4a3f8f]",
  "from-[#ff8a4c] to-[#c93c0c]",
  "from-[#3f8f7a] to-[#1f4a40]",
  "from-[#b4506e] to-[#5f2438]",
];

/**
 * Pleylist kartochkasi: albom muqovalari yelpig'ich bo'lib turadi, xuddi
 * stol ustiga yoyib tashlangan disklardek.
 *
 * Muqovalar soni beshtagacha — pleylistda undan kam albom bo'lsa
 * o'rtadan hisoblab, bori chiziladi (`FAN` ning markaziy qismi olinadi),
 * shunda yelpig'ich baribir simmetrik qoladi.
 *
 * Chetdagi ikkita muqova ataylab kartochka chekkasidan chiqib ketadi va
 * qirqiladi — "davomi bor" degani shundan o'qiladi.
 */
export function MusicCard() {
  const { t } = useLocale();
  const covers = musicPlaylist.covers.slice(0, FAN.length);
  const count = Math.max(covers.length, 1);

  // Kam muqova bo'lsa yelpig'ichning o'rtasidan kesib olinadi.
  const from = Math.floor((FAN.length - count) / 2);
  const slots = FAN.slice(from, from + count);

  return (
    <Card label={t("personal.musicLabel")} bodyClassName="flex flex-col">
      {/*
        Gorizontal chetlari kartochkadan tashqariga chiqadi, shuning uchun
        shu yerda qirqiladi. Vertikal bo'yicha esa `overflow-visible`
        kerak emas — plitkalar aylanganda pastga chiqib ketmasin deb
        yuqoridan-pastdan biroz joy qoldirilgan.
      */}
      <div className="-mx-5 flex flex-1 items-center justify-center overflow-hidden px-1 py-3">
        <div className="flex items-center">
          {slots.map((slot, i) => (
            <span
              key={i}
              className={`relative -mx-[26px] block h-[112px] w-[112px] flex-shrink-0 overflow-hidden rounded-[20px] border-[3px] border-card-line shadow-[0_3px_8px_rgba(16,18,24,0.16),0_18px_36px_-14px_rgba(16,18,24,0.55)] ${slot}`}
            >
              {covers[i] ? (
                <Image src={covers[i]} alt="" fill sizes="112px" className="object-cover" />
              ) : (
                <span
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${SHADES[from + i]}`}
                >
                  <MusicNotesSimple size={22} weight="fill" className="text-white/55" />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="text-[15px] font-medium text-foreground">
          {musicPlaylist.name || t("personal.musicFallback")}
        </div>
        {/* Trek soni faqat sinxron o'tgan bo'lsa bor — "0 ta trek" yozilmaydi */}
        {musicPlaylist.trackCount > 0 ? (
          <div className="mt-0.5 text-[12.5px] text-muted">
            {musicPlaylist.trackCount} {t("personal.musicTracks")}
          </div>
        ) : null}
        {musicPlaylist.url ? (
          <a
            href={musicPlaylist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-accent focus-visible:focus-ring"
          >
            <PlayCircle size={15} weight="fill" />
            {/* Tugma matni sinxron qaysi xizmatdan kelganiga qarab tanlanadi */}
            {musicPlaylist.service === "spotify"
              ? t("personal.musicPlaySpotify")
              : t("personal.musicPlayYandex")}
          </a>
        ) : null}
      </div>
    </Card>
  );
}
