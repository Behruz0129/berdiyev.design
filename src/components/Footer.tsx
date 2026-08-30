"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { useLocale } from "@/contexts/LocaleContext";
import { socialLinks } from "@/data/site";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-8 border-t border-line py-8">
      <Container size="wide">
        <div className="text-sm font-medium text-foreground">{t("footer.name")}</div>
        <div className="mt-1 text-sm text-muted">{t("footer.role")}</div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link className="pill hover:bg-surface-2" href="/about">
            {t("footer.about")}
          </Link>
          <Link className="pill hover:bg-surface-2" href="/projects">
            {t("footer.projects")}
          </Link>
          <Link className="pill hover:bg-surface-2" href="/contact">
            {t("footer.contact")}
          </Link>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill hover:bg-surface-2"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="mt-5 text-sm text-muted">© {new Date().getFullYear()}</div>
      </Container>
    </footer>
  );
}
