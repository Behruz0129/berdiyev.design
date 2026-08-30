"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

/** Server qaytaradigan xato kodi → i18n kaliti. */
const ERROR_KEYS: Record<string, string> = {
  rate_limited: "contact.errorRateLimited",
  invalid_email: "contact.errorInvalidEmail",
  missing_fields: "contact.errorMissingFields",
  too_long: "contact.errorTooLong",
};

export function ContactForm() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    setSent(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (!res.ok) {
        const key = data?.error ? ERROR_KEYS[data.error] : undefined;
        setError(t(key ?? "contact.errorGeneric") || t("contact.errorGeneric"));
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(t("contact.errorGeneric"));
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    "rounded-xl border border-line bg-background px-4 text-sm text-foreground placeholder:text-muted transition-colors hover:border-foreground/25 focus-visible:focus-ring";

  return (
    <form className="max-w-xl" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm text-muted" htmlFor="name">
            {t("contact.nameLabel")}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`h-11 ${fieldClass}`}
            placeholder={t("contact.namePlaceholder")}
            autoComplete="name"
            maxLength={80}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-muted" htmlFor="email">
            {t("contact.emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`h-11 ${fieldClass}`}
            placeholder={t("contact.emailPlaceholder")}
            autoComplete="email"
            maxLength={120}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-muted" htmlFor="message">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`min-h-[160px] resize-y py-2.5 ${fieldClass}`}
            placeholder={t("contact.messagePlaceholder")}
            maxLength={2000}
            required
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-11 items-center justify-center justify-self-start rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? t("contact.sending") : t("contact.submit")}
        </button>

        {/* Natija xabarlari — ekran o'quvchilar uchun ham e'lon qilinadi. */}
        <div aria-live="polite" className="empty:hidden">
          {sent ? (
            <div className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground">
              {t("contact.success")}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-red-600">{error}</div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
