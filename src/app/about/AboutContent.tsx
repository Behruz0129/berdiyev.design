"use client";

import Image from "next/image";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BulletList } from "@/components/BulletList";
import { useLocale } from "@/contexts/LocaleContext";
import { downloadResumePdf } from "@/lib/resume-pdf";

/** Profil rasmi: public/profile.jpg yoki public/profile.png qo'ying */
const PROFILE_IMAGE = "/profile.jpg";

export function AboutContent() {
  const { t, locale } = useLocale();
  const [imgError, setImgError] = useState(false);
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">("idle");

  async function handleDownloadResumePdf() {
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
      <Section className="pt-10 md:pt-14">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start md:gap-10">
            <Reveal className="flex-shrink-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-2xl bg-foreground/10 ring-2 ring-foreground/10 sm:h-48 sm:w-48 md:h-56 md:w-56">
                {!imgError ? (
                  <Image
                    src={PROFILE_IMAGE}
                    alt={t("about.title")}
                    fill
                    className="object-cover"
                    sizes="224px"
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-sm text-foreground/60">
                    {t("about.title")}
                  </div>
                )}
              </div>
            </Reveal>

            <div className="min-w-0 flex-1">
              <Reveal delay={0.03}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {t("about.title")}
                  </h1>
                  <button
                    type="button"
                    onClick={handleDownloadResumePdf}
                    disabled={pdfState === "loading"}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {pdfState === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {pdfState === "loading"
                      ? t("about.resumeGenerating")
                      : t("about.resumeDownload")}
                  </button>
                </div>
              </Reveal>

              {pdfState === "error" ? (
                <Reveal>
                  <div className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {t("about.resumeError")}
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.05}>
                <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/70">
                  {t("about.bio1")}
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/70">
                  {t("about.bio2")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <div className="text-sm text-foreground/60">{t("about.education")}</div>
                <div className="mt-4 space-y-4">
                  <div className="hairline rounded-xl p-4">
                    <div className="text-sm font-medium text-foreground">
                      {t("about.school1")}
                    </div>
                    <div className="mt-1 text-sm text-foreground/70">
                      {t("about.school1Desc")}
                    </div>
                  </div>
                  <div className="hairline rounded-xl p-4">
                    <div className="text-sm font-medium text-foreground">
                      {t("about.school2")}
                    </div>
                    <div className="mt-1 text-sm text-foreground/70">
                      {t("about.school2Desc")}
                    </div>
                    <div className="mt-1 text-sm text-foreground/60">
                      {t("about.school2Note")}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-foreground/8 pt-5">
                  <div className="text-sm text-foreground/60">
                    {t("about.softSkillsTitle")}
                  </div>
                  <BulletList
                    className="mt-3"
                    accent="b"
                    items={[1, 2, 3, 4].map((i) => t(`about.softSkill${i}`))}
                  />
                </div>

                <div className="mt-5">
                  <div className="text-sm text-foreground/60">
                    {t("about.interestsTitle")}
                  </div>
                  <BulletList
                    className="mt-3"
                    accent="c"
                    items={[1, 2, 3, 4, 5].map((i) => t(`about.interest${i}`))}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="lg:col-span-2">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-foreground/60">{t("about.experience")}</div>
                    <div className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                      {t("about.workResponsibilities")}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="hairline rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-medium text-foreground">
                        {t("about.modmeTitle")}
                      </div>
                      <div className="text-sm text-foreground/60">
                        {t("about.modmePeriod")}
                      </div>
                    </div>
                    <BulletList
                      className="mt-4"
                      items={[1, 2, 3, 4, 5].map((i) => t(`about.modmeBullet${i}`))}
                    />
                  </div>

                  <div className="hairline rounded-2xl p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-medium text-foreground">
                        {t("about.iccTitle")}
                      </div>
                      <div className="text-sm text-foreground/60">{t("about.iccPeriod")}</div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-foreground/70">
                      {t("about.iccDesc")}
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {[t("about.iccTheme1"), t("about.iccTheme2"), t("about.iccTheme3")].map(
                        (theme) => (
                          <div
                            key={theme}
                            className="rounded-xl bg-foreground/6 px-3 py-2 text-sm text-foreground/70"
                          >
                            {theme}
                          </div>
                        ),
                      )}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-foreground/70">
                      {t("about.iccApps")}
                    </p>

                    <BulletList
                      className="mt-4"
                      items={[1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`about.iccBullet${i}`))}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
