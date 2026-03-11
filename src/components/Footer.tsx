"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="py-10 md:py-12">
      <Container>
        <div className="glass rounded-2xl px-5 py-6 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">
                {t("footer.name")}
              </div>
              <div className="text-sm text-foreground/60">
                {t("footer.role")}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/70">
              <Link className="hover:text-foreground transition-colors" href="/about">
                {t("footer.about")}
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/projects"
              >
                {t("footer.projects")}
              </Link>
              <Link
                className="hover:text-foreground transition-colors"
                href="/contact"
              >
                {t("footer.contact")}
              </Link>
              <span className="text-foreground/35">•</span>
              <span className="text-foreground/55">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
