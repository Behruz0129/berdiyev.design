"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/contexts/LocaleContext";
import { socialLinks } from "@/data/site";

export function ContactContent() {
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
                  {socialLinks.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hairline group rounded-2xl px-4 py-3 text-sm text-foreground/75 transition-colors hover:bg-foreground/6 hover:text-foreground focus-visible:focus-ring"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>{s.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-foreground/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/70" />
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
