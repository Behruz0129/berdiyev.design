"use client";

import {
  Phone,
  TelegramLogo,
  MapPin,
  ArrowUpRight,
  Link as LinkIcon,
  type Icon,
} from "@phosphor-icons/react";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { SocialIconLinks } from "@/components/SocialIcons";
import { useLocale } from "@/contexts/LocaleContext";
import { contactLinks, siteConfig } from "@/data/site";

const ICONS: Record<string, Icon> = {
  Telegram: TelegramLogo,
  Telefon: Phone,
};

/**
 * Aloqa sahifasi ikki ustunda: chapda odam bilan bog'lanishning barcha
 * yo'llari, o'ngda forma.
 *
 * Avval uchta bir xil kartochka ustma-ust turardi — aloqa, forma, ijtimoiy
 * tarmoqlar. Uchalasi bir xil ko'ringani uchun ko'z qayerdan boshlashni
 * bilmasdi. Endi tanlov aniq: yozishni istasangiz o'ng tomonda forma,
 * to'g'ridan-to'g'ri bog'lanmoqchi bo'lsangiz chap tomonda manzillar.
 */
export function ContactContent() {
  const { t } = useLocale();

  return (
    <main>
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <Container className="pb-16">
        <div className="grid gap-4 lg:grid-cols-5">
          {/* ── Chap ustun: to'g'ridan-to'g'ri aloqa ──────────────────── */}
          <aside className="card p-6 sm:p-7 lg:col-span-2">
            {/*
              Javob muddati eng tepada va yashil nuqta bilan: «bu yerda tirik
              odam bor» degani birinchi o'qiladigan narsa bo'lishi kerak.
            */}
            <h2 className="card-label">{t("contact.detailsTitle")}</h2>
            <p className="mt-2.5 flex items-center gap-2 text-[13px] text-muted">
              <span className="live-dot" aria-hidden />
              {t("contact.responseLabel")} — {t("contact.response")}
            </p>

            <ul className="mt-5 space-y-2">
              {contactLinks.map((c) => {
                const Icon = ICONS[c.label] ?? LinkIcon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="group flex items-center gap-3 rounded-2xl border border-line bg-card-2 px-4 py-3 transition-colors hover:bg-surface-2 focus-visible:focus-ring"
                    >
                      <Icon size={18} className="flex-shrink-0 text-muted" aria-hidden />
                      <span className="min-w-0 flex-1 truncate font-mono text-[13.5px] tracking-[-0.01em] text-foreground">
                        {c.value}
                      </span>
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="flex-shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 space-y-4 border-t border-line pt-6">
              <div>
                <dt className="eyebrow">{t("contact.locationLabel")}</dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-[14px] text-foreground/85">
                  <MapPin size={15} className="flex-shrink-0 text-muted" aria-hidden />
                  {t("contact.location")}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">{t("contact.availabilityLabel")}</dt>
                <dd className="mt-1.5 text-[14px] leading-6 text-foreground/85">
                  {t("contact.availability")}
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-line pt-6">
              <p className="eyebrow">{t("contact.socials")}</p>
              <SocialIconLinks className="mt-3" />
            </div>
          </aside>

          {/* ── O'ng ustun: forma ────────────────────────────────────── */}
          <section className="card p-6 sm:p-8 lg:col-span-3">
            <h2 className="card-label">{t("contact.formTitle")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </div>

        {/* Pastda takroriy chaqiruv: sahifa oxirigacha o'qigan odam uchun */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-7 text-muted">
          {t("contact.pitch")}{" "}
          <a
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-foreground underline decoration-accent underline-offset-4"
          >
            {siteConfig.telegramHandle}
          </a>
        </p>
      </Container>
    </main>
  );
}
