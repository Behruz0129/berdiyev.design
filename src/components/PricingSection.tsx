"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/SectionHeader";
import { useLocale } from "@/contexts/LocaleContext";
import { PRICE_CURRENCY, priceList } from "@/data/pricing";

/**
 * Narxlar ro'yxati.
 *
 * Ro'yxat bo'sh bo'lsa bo'lim umuman chizilmaydi — «narxlar tez orada»
 * degan bo'sh quti ishonchni oshirmaydi, kamaytiradi.
 *
 * Ko'rinishi qatorli: chapda xizmat va nima kirishi, o'ngda narx. Bu
 * qasddan jadvalga o'xshaydi — mijoz narxni ustunga qarab solishtiradi,
 * kartochkalarda esa har safar ko'z bilan qidirishga to'g'ri kelardi.
 */
export function PricingSection() {
  const { t, locale } = useLocale();
  if (priceList.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title={t("pricing.title")}
        lead={t("pricing.subtitle")}
        action={
          <Link
            href="/contact"
            className="card inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:focus-ring"
          >
            {t("home.contactMe")}
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        }
      />

      <ul className="mt-8">
        {priceList.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
          >
            <div className="min-w-0">
              <h3 className="text-[17px] font-medium text-foreground">{item.title[locale]}</h3>
              <p className="mt-1 text-[13px] text-muted">{item.duration[locale]}</p>

              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {item.includes[locale].map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-1.5 text-[13px] leading-5 text-foreground/70"
                  >
                    <Check size={13} weight="bold" className="flex-shrink-0 text-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/*
              Narx o'ng chekkada, bir xil balandlikda — shunda ustun bo'lib
              tizilib turadi va ko'z uni bir qarashda solishtiradi.
            */}
            <div className="flex-shrink-0 text-left sm:text-right">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {t("pricing.from")}
              </div>
              <div className="mt-0.5 font-mono text-[26px] font-semibold leading-none tracking-[-0.03em] text-foreground tabular-nums">
                {PRICE_CURRENCY}
                {item.from.toLocaleString("en-US")}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="border-t border-line pt-5 text-[14px] leading-6 text-muted">
        {t("pricing.note")}
      </p>
    </section>
  );
}
