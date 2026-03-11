"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/contexts/LocaleContext";

const socials = [
  { label: "Telegram", href: "https://t.me/CBehruz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/behruz-berdiyev-8a2800281/" },
  { label: "GitHub", href: "https://github.com/Behruz0129" },
  { label: "Instagram", href: "https://instagram.com/designtizyy" },
] as const;

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <main>
      <Section className="pt-10 md:pt-14">
        <Container>
          <Reveal>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("contact.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
              {t("contact.subtitle")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="glass rounded-2xl p-6">
                <div className="text-sm text-foreground/60">{t("contact.socials")}</div>
                <div className="mt-4 grid gap-3">
                  {socials.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hairline group rounded-2xl px-4 py-3 text-sm text-foreground/75 hover:text-foreground hover:bg-foreground/6 transition-colors focus-visible:focus-ring"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>{s.label}</span>
                        <span className="text-foreground/45 group-hover:text-foreground/70">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
