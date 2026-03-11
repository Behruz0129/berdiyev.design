"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

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

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send");
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Xabar yuborishda xatolik yuz berdi. Keyinroq urinib ko'ring.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="glass rounded-2xl p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm text-foreground/70" htmlFor="name">
            {t("contact.nameLabel")}
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl bg-foreground/6 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:focus-ring"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-foreground/70" htmlFor="email">
            {t("contact.emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl bg-foreground/6 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:focus-ring"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-foreground/70" htmlFor="message">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] resize-y rounded-xl bg-foreground/6 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:focus-ring"
            placeholder="Tell me about your project..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "Yuborilmoqda..." : t("contact.submit")}
        </button>

        {sent ? (
          <div className="text-sm text-foreground/60">
            Xabaringiz Telegram kanaliga yuborildi.
          </div>
        ) : null}

        {error ? (
          <div className="text-sm text-red-500">
            {error}
          </div>
        ) : null}
      </div>
    </form>
  );
}
