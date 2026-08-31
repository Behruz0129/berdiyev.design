"use client";

import { Container } from "@/components/Container";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Faqat imzo: ism, lavozim va huquqlar qatori. Havolalar bu yerdan olib
 * tashlangan — ular yuqoridagi menyuda ham, aloqa kartochkasida ham bor
 * edi, uchinchi nusxa hech kimga kerak emas.
 */
export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-8 border-t border-line py-8">
      <Container size="wide">
        <div className="text-sm font-medium text-foreground">{t("footer.name")}</div>
        <div className="mt-1 text-sm text-muted">{t("footer.role")}</div>
        <div className="mt-4 text-sm text-muted">
          © {new Date().getFullYear()} {t("footer.rights")}
        </div>
      </Container>
    </footer>
  );
}
