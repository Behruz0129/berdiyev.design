"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/contexts/LocaleContext";

/** Profil rasmi: public/profile.jpg yoki public/profile.png qo‘ying */
const PROFILE_IMAGE = "/profile.jpg";

export default function AboutPage() {
  const { t } = useLocale();
  const [imgError, setImgError] = useState(false);

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
                  <div className="flex h-full w-full items-center justify-center text-center text-sm text-foreground/40">
                    {t("about.title")}
                  </div>
                )}
              </div>
            </Reveal>

            <div className="min-w-0 flex-1">
              <Reveal delay={0.03}>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t("about.title")}
                </h1>
              </Reveal>

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
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-foreground/70">
                    <li>{t("about.softSkill1")}</li>
                    <li>{t("about.softSkill2")}</li>
                    <li>{t("about.softSkill3")}</li>
                    <li>{t("about.softSkill4")}</li>
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="text-sm text-foreground/60">
                    {t("about.interestsTitle")}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-foreground/70">
                    <li>{t("about.interest1")}</li>
                    <li>{t("about.interest2")}</li>
                    <li>{t("about.interest3")}</li>
                    <li>{t("about.interest4")}</li>
                    <li>{t("about.interest5")}</li>
                  </ul>
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
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                      <li>{t("about.modmeBullet1")}</li>
                      <li>{t("about.modmeBullet2")}</li>
                      <li>{t("about.modmeBullet3")}</li>
                      <li>{t("about.modmeBullet4")}</li>
                      <li>{t("about.modmeBullet5")}</li>
                    </ul>
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

                    <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                      <li>{t("about.iccBullet1")}</li>
                      <li>{t("about.iccBullet2")}</li>
                      <li>{t("about.iccBullet3")}</li>
                      <li>{t("about.iccBullet4")}</li>
                      <li>{t("about.iccBullet5")}</li>
                      <li>{t("about.iccBullet6")}</li>
                      <li>{t("about.iccBullet7")}</li>
                      <li>{t("about.iccBullet8")}</li>
                    </ul>
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
