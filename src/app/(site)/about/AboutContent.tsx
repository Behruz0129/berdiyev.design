"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { BulletList } from "@/components/BulletList";
import { useLocale } from "@/contexts/LocaleContext";
import { downloadResumePdf } from "@/lib/resume-pdf";
import { ContactPills } from "@/components/ContactPills";

/**
 * "Men haqimda" — tajriba, ta'lim, ko'nikmalar. Har bo'lim oddiy sarlavha +
 * matn/ro'yxat; hech narsa yashirilmagan.
 */
export function AboutContent() {
  const { t, locale } = useLocale();
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">("idle");

  async function handleDownload() {
    setPdfState("loading");
    try {
      await downloadResumePdf(t, locale);
      setPdfState("idle");
    } catch (error) {
      console.error("Resume PDF error", error);
      setPdfState("error");
    }
  }

  return (
    <main>
      <PageHeader eyebrow={t("home.title")} title={t("about.title")}>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src="/profile.jpg"
            alt={t("home.name")}
            width={176}
            height={176}
            className="h-44 w-44 flex-shrink-0 rounded-2xl border border-line object-cover"
          />
          <div className="min-w-0 max-w-2xl">
            <p className="text-[15px] leading-7 text-foreground/85">{t("about.bio1")}</p>
            <p className="mt-3 text-[15px] leading-7 text-foreground/85">{t("about.bio2")}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <ContactPills />
          <span className="pill text-muted">{t("contact.location")}</span>
        </div>

        <div className="mt-7">
          <button
            type="button"
            onClick={handleDownload}
            disabled={pdfState === "loading"}
            className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:focus-ring disabled:opacity-60"
          >
            {pdfState === "loading" ? t("about.resumeGenerating") : t("about.resumeDownload")}
          </button>
          {pdfState === "error" ? (
            <p className="mt-2 text-sm text-red-600">{t("about.resumeError")}</p>
          ) : null}
        </div>
      </PageHeader>

      <Container className="pb-16">
        <Block title={t("about.experience")}>
          {/*
            Ish joylari orasida ingichka chiziq va kengroq oraliq. Avval
            ular ketma-ket turardi va o'qiganda qayerda biri tugab,
            ikkinchisi boshlangani bilinmasdi — ayniqsa ikkalasida ham
            «Ish va mas'uliyatlar» ro'yxati borligi uchun.
          */}
          <div className="space-y-9">
            <article>
              <h3 className="text-[16px] font-medium text-foreground">{t("about.modmeTitle")}</h3>
              <div className="mt-1.5 font-mono text-[12px] tabular-nums text-muted">
                {t("about.modmePeriod")}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-foreground/85">
                {t("about.modmeSummary")}
              </p>
              <h4 className="mt-4 text-sm font-medium text-muted">
                {t("about.workResponsibilities")}
              </h4>
              <BulletList
                className="mt-2"
                items={[1, 2, 3, 4, 5].map((i) => t(`about.modmeBullet${i}`))}
              />
            </article>

            {/*
              Ikkinchi ish joyi ingichka chiziq bilan ajratiladi. Alohida
              kartochkaga solish mumkin edi, lekin bu bo'limning o'zi
              allaqachon kartochka — ichma-ich qo'yilganda ikkalasining
              burchak radiusi bir xil bo'lib, mutanosiblik buzilardi.
            */}
            <article className="border-t border-line pt-9">
              <h3 className="text-[16px] font-medium text-foreground">{t("about.iccTitle")}</h3>
              <div className="mt-1.5 font-mono text-[12px] tabular-nums text-muted">
                {t("about.iccPeriod")} · {t("about.iccDuration")}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-foreground/85">
                {t("about.iccSummary")}
              </p>
              <p className="mt-3 text-[15px] leading-7 text-foreground/85">{t("about.iccDesc")}</p>
              <p className="mt-3 text-[15px] leading-7 text-foreground/85">{t("about.iccApps")}</p>

              <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-7 text-foreground/85">
                <li>{t("about.iccTheme1")}</li>
                <li>{t("about.iccTheme2")}</li>
                <li>{t("about.iccTheme3")}</li>
              </ul>

              <h4 className="mt-4 text-sm font-medium text-muted">
                {t("about.workResponsibilities")}
              </h4>
              <BulletList
                className="mt-2"
                items={[1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`about.iccBullet${i}`))}
              />
            </article>
          </div>
        </Block>

        <Block title={t("about.skillsTitle")}>
          <BulletList
            items={[
              t("about.skillsDesign"),
              t("about.skillsCode"),
              t("about.skillsBackend"),
              t("about.skillsOther"),
              t("about.skillsLanguages"),
            ]}
          />
        </Block>

        <Block title={t("about.education")}>
          <div className="text-[15px] text-foreground">{t("about.school2Desc")}</div>
          <div className="mt-1 text-sm text-muted">
            {t("about.school2")} · {t("about.school2Note")}
          </div>
        </Block>

        <Block title={t("about.interestsTitle")}>
          <BulletList items={[1, 2, 3].map((i) => t(`about.interest${i}`))} />
        </Block>
      </Container>
    </main>
  );
}

/**
 * Kartochka sahifaning to'liq enini egallaydi — chap chekkasi navbar va
 * sarlavha bilan bir chiziqda tursin. Matn esa ichkarida `max-w-3xl` bilan
 * cheklanadi: to'liq enida bir qator 140 belgiga yetib, ko'z keyingi
 * qatorning boshini yo'qotardi.
 */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card mt-4 p-5 sm:p-6">
      <h2 className="card-label">{title}</h2>
      <div className="mt-5 max-w-3xl">{children}</div>
    </section>
  );
}
