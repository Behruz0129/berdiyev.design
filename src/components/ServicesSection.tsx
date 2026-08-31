"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { useLocale } from "@/contexts/LocaleContext";

/** Nechta xizmat e'lon qilingan (i18n dagi `item1..itemN`). */
const COUNT = 4;

/**
 * «Sizga nima qila olaman».
 *
 * Ataylab kartochkasiz: bosh sahifada yumaloq kartochkalar allaqachon
 * ko'p va hamma bo'lim bir xil ko'rinib qolgan edi. Bu yerda gazeta
 * uslubi — tepasida ingichka chiziq, yonida tartib raqami, tagida matn.
 * Shu farq bo'limlarni bir-biridan ajratib turadi.
 */
export function ServicesSection() {
  const { t } = useLocale();
  const items = Array.from({ length: COUNT }, (_, i) => i + 1);

  return (
    <section>
      <SectionHeader title={t("services.title")} lead={t("services.lead")} />

      <div className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {items.map((i) => (
          <article key={i} className="group border-t border-line pt-5 pb-7">
            <div className="flex items-baseline gap-3">
              {/*
                Raqam qatorni "ro'yxat" qilib ko'rsatadi va ko'z uchun
                langar bo'ladi — sarlavhalar turli uzunlikda bo'lsa ham
                chap chekka bir tekis turadi.
              */}
              <span className="font-mono text-[12px] tabular-nums text-accent">
                {String(i).padStart(2, "0")}
              </span>
              <h3 className="text-[16px] font-medium leading-snug text-foreground">
                {t(`services.item${i}Title`)}
              </h3>
            </div>
            <p className="mt-2 pl-[calc(0.75rem+2ch)] text-[13.5px] leading-6 text-muted">
              {t(`services.item${i}Desc`)}
            </p>
          </article>
        ))}
      </div>

      {/* Ro'yxatga kirmagan mayda ishlar — alohida band emas, izoh */}
      <p className="mt-2 max-w-3xl border-l-2 border-accent pl-4 text-[14px] leading-6 text-foreground/70">
        {t("services.more")}
      </p>
    </section>
  );
}
