"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { BulletList } from "@/components/BulletList";
import type { Project } from "@/data/projects";

function Pills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <div
          key={t}
          className="rounded-full bg-foreground/8 px-3 py-1 text-sm text-foreground/70"
        >
          {t}
        </div>
      ))}
    </div>
  );
}

type Props = { project: Project };

export function ProjectDetailContent({ project }: Props) {
  const { t } = useLocale();
  const slug = project.slug;

  /**
   * Ro'yxat matnlari tarjima faylida `problem0`, `problem1`… kabi raqamlangan
   * kalitlar bilan saqlanadi. Tarjima topilmasa `projects.ts` dagi inglizcha
   * asl matn ishlatiladi — sahifa hech qachon bo'sh qatorlar bilan qolmaydi.
   */
  const translateList = (items: string[], keyPrefix: string) =>
    items.map((fallback, i) => t(`projects.${slug}.${keyPrefix}${i}`) || fallback);

  const field = (key: string, fallback: string) => t(`projects.${slug}.${key}`) || fallback;

  const overviewTools = translateList(project.overview.tools, "overviewTool");
  const problemLines = translateList(project.problem, "problem");
  const solutionLines = translateList(project.solution, "solution");
  const resultsLines = translateList(project.results, "results");
  const siteFeaturesList = translateList(project.siteFeatures ?? [], "siteFeature");

  const title = field("title", project.title);
  const role = field("role", project.role);
  const overviewRole = field("overviewRole", project.overview.role);
  const overviewDuration = field("overviewDuration", project.overview.duration);

  const screenshots = (project.screenshots ?? []).map((shot, i) => ({
    ...shot,
    title: field(`screenshot${i}Title`, shot.title),
    description: field(`screenshot${i}Desc`, shot.description ?? ""),
  }));

  return (
    <main>
      <Section className="pt-10 md:pt-14">
        <Container>
          <Reveal>
            <div className="glass overflow-hidden rounded-3xl">
              <div className="relative aspect-[21/9]">
                <Image
                  src={project.heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute left-4 bottom-4 right-4 flex flex-col gap-4 sm:left-6 sm:bottom-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <div className="text-xs text-white/75 sm:text-sm">{project.year}</div>
                    <h1 className="mt-1 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
                      {title}
                    </h1>
                    <div className="mt-1.5 text-xs text-white/80 sm:mt-2 sm:text-sm">{role}</div>
                  </div>

                  {project.demoUrl ? (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 self-start rounded-2xl bg-white/14 px-4 py-2.5 text-sm font-medium text-white backdrop-blur hover:bg-white/22 transition-colors focus-visible:focus-ring sm:self-end sm:px-5 sm:py-3"
                    >
                      {t("projects.detail.viewDemo")}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="glass rounded-2xl p-6">
                <div className="text-sm text-foreground/60">
                  {t("projects.detail.overviewTitle")}
                </div>
                <div className="mt-5 space-y-4 text-sm text-foreground/75">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-foreground/65">{t("projects.detail.role")}</div>
                    <div className="text-right">{overviewRole}</div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-foreground/65">{t("projects.detail.duration")}</div>
                    <div className="text-right">{overviewDuration}</div>
                  </div>
                  <div className="pt-1">
                    <div className="text-foreground/65">{t("projects.detail.tools")}</div>
                    <div className="mt-3">
                      <Pills items={overviewTools} />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7 space-y-5">
              <Reveal delay={0.05}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-sm text-foreground/60">
                    {t("projects.detail.problemTitle")}
                  </div>
                  <BulletList className="mt-4" items={problemLines} accent="a" />
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-sm text-foreground/60">
                    {t("projects.detail.solutionTitle")}
                  </div>
                  <BulletList className="mt-4" items={solutionLines} accent="b" />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-sm text-foreground/60">
                    {t("projects.detail.resultsTitle")}
                  </div>
                  <BulletList className="mt-4" items={resultsLines} accent="c" />
                </div>
              </Reveal>

              {siteFeaturesList.length > 0 && (
                <Reveal delay={0.12}>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-sm text-foreground/60">
                      {t("projects.detail.siteFeaturesTitle")}
                    </div>
                    <BulletList className="mt-4" items={siteFeaturesList} accent="b" />
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {screenshots.length > 0 && (
            <Reveal delay={0.05} className="mt-10">
              <div className="mb-4">
                <div className="text-sm text-foreground/60">
                  {t("projects.detail.screenshotsTitle")}
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {t("projects.detail.screenshotsHeading")}
                </h2>
                <p className="mt-2 text-sm text-foreground/70">
                  {t("projects.detail.screenshotsDesc")}
                </p>
              </div>
              <ScreenshotGallery screenshots={screenshots} />
            </Reveal>
          )}
        </Container>
      </Section>
    </main>
  );
}
