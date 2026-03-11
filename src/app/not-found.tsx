"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { useLocale } from "@/contexts/LocaleContext";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <main>
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="glass rounded-2xl p-8">
            <div className="text-sm text-foreground/60">404</div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {t("notFound.title")}
            </h1>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              {t("notFound.description")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors focus-visible:focus-ring"
              >
                {t("notFound.goHome")}
              </Link>
              <Link
                href="/projects"
                className="glass inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-medium text-foreground hover:bg-foreground/10 transition-colors focus-visible:focus-ring"
              >
                {t("notFound.viewProjects")}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
