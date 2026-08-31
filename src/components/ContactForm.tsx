"use client";

import { useState } from "react";
import { PaperPlaneTilt, TelegramLogo, CheckCircle } from "@phosphor-icons/react";
import { useLocale } from "@/contexts/LocaleContext";
import { siteConfig } from "@/data/site";

/** Server qaytaradigan xato kodi → i18n kaliti. */
const ERROR_KEYS: Record<string, string> = {
  rate_limited: "contact.errorRateLimited",
  invalid_contact: "contact.errorInvalidContact",
  missing_fields: "contact.errorMissingFields",
  too_long: "contact.errorTooLong",
  // Ikkalasi ham server tomonidagi nosozlik: sozlanmagan yoki Telegram
  // javob bermagan. Tashrifchiga sabab emas, chiqish yo'li ko'rsatiladi.
  server_not_configured: "contact.errorSendFailed",
  send_failed: "contact.errorSendFailed",
};

export function ContactForm() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  /**
   * Telegram nomi yoki telefon raqami. Email so'ralmaydi: javob baribir
   * Telegram yoki qo'ng'iroq orqali keladi, so'ralgan-u ishlatilmaydigan
   * maydon esa faqat forma uzunligini oshiradi.
   */
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  /** Bot uchun tuzoq — odam bu maydonni ko'rmaydi, bot esa to'ldiradi. */
  const [website, setWebsite] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Xato server tomonida bo'lsa Telegramga o'tish yo'li taklif qilinadi. */
  const [offerTelegram, setOfferTelegram] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    setSent(false);
    setOfferTelegram(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, website }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        const code = data?.error ?? "";
        setError(t(ERROR_KEYS[code] ?? "contact.errorGeneric") || t("contact.errorGeneric"));
        // Foydalanuvchi xatosi emas, server tomonidagi nosozlik bo'lsa —
        // xabar yo'qolmasin, Telegramga o'tish taklif qilinadi.
        setOfferTelegram(code === "send_failed" || code === "server_not_configured" || !code);
        return;
      }

      setSent(true);
      setName("");
      setContact("");
      setMessage("");
    } catch {
      setError(t("contact.errorSendFailed"));
      setOfferTelegram(true);
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-line bg-background px-4 text-[15px] text-foreground placeholder:text-muted/70 transition-colors hover:border-foreground/20 focus:border-accent/60 focus-visible:focus-ring";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label className="text-[13px] text-muted" htmlFor="name">
              {t("contact.nameLabel")}
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-12 ${fieldClass}`}
              placeholder={t("contact.namePlaceholder")}
              autoComplete="name"
              maxLength={80}
              required
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-[13px] text-muted" htmlFor="contact">
              {t("contact.contactLabel")}
            </label>
            <input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`h-12 ${fieldClass}`}
              placeholder={t("contact.contactPlaceholder")}
              autoComplete="tel"
              maxLength={120}
              required
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <label className="text-[13px] text-muted" htmlFor="message">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`min-h-[170px] resize-y py-3 ${fieldClass}`}
            placeholder={t("contact.messagePlaceholder")}
            maxLength={2000}
            required
          />
        </div>

        {/*
          Tuzoq maydon. Ko'zdan ham, ekran o'quvchidan ham yashirilgan va
          avtomatik to'ldirish o'chirilgan — uni faqat bot to'ldiradi.
          `display: none` emas: ba'zi botlar shunday maydonlarni o'tkazib
          yuboradi, ekrandan chetga chiqarilgani esa ularni chalg'itadi.
        */}
        <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={sending}
            className="btn-accent hover:brightness-105 focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PaperPlaneTilt size={17} weight="fill" />
            {sending ? t("contact.sending") : t("contact.submit")}
          </button>
          <p className="text-[13px] text-muted">{t("contact.formNote")}</p>
        </div>

        {/* Natija xabarlari — ekran o'quvchilar uchun ham e'lon qilinadi. */}
        <div aria-live="polite" className="empty:hidden">
          {sent ? (
            <div className="flex items-start gap-2.5 rounded-xl border border-ok/30 bg-ok/10 px-4 py-3 text-[14px] leading-6 text-foreground">
              <CheckCircle size={18} weight="fill" className="mt-0.5 flex-shrink-0 text-ok" />
              {t("contact.success")}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-accent/30 bg-accent/8 px-4 py-3 text-[14px] leading-6 text-foreground">
              {error}
              {offerTelegram ? (
                <a
                  href={siteConfig.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:focus-ring"
                >
                  <TelegramLogo size={15} />
                  {t("contact.telegramFallback")}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
