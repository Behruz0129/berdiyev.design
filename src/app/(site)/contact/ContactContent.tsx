"use client";

import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/contexts/LocaleContext";
import { SocialIconLinks } from "@/components/SocialIcons";
import { contactLinks } from "@/data/site";

export function ContactContent() {
  const { t } = useLocale();

  return (
    <main>
      <PageHeader
        eyebrow={`${t("contact.responseLabel")} \u2014 ${t("contact.response")}`}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <Container className="pb-16">
        <section className="card p-6 sm:p-8">
          <h2 className="card-label">{t("contact.detailsTitle")}</h2>
          <dl className="mt-5 space-y-3">
            {contactLinks.map((c) => (
              <Row key={c.label} label={c.label}>
                <a
                  href={c.href}
                  className="text-accent underline underline-offset-4 break-all"
                >
                  {c.value}
                </a>
              </Row>
            ))}
            <Row label={t("contact.locationLabel")}>{t("contact.location")}</Row>
            <Row label={t("contact.availabilityLabel")}>{t("contact.availability")}</Row>
          </dl>
        </section>

        <section className="card mt-4 p-6 sm:p-8">
          <h2 className="card-label">{t("contact.formTitle")}</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>

        <section className="card mt-4 p-6 sm:p-8">
          <h2 className="card-label">{t("contact.socials")}</h2>
          <SocialIconLinks className="mt-5" />
        </section>
      </Container>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-3">
      <dt className="w-32 flex-shrink-0 text-sm text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 text-[15px] text-foreground/85">{children}</dd>
    </div>
  );
}
