"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
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

  const overviewTools: string[] = [];
  for (let i = 0; i < project.overview.tools.length; i++) {
    const key = `projects.${slug}.overviewTool${i}` as const;
    const translated = t(key);
    overviewTools.push(translated || project.overview.tools[i]);
  }

  const problemLines = project.problem.map((_, i) => {
    const key = `projects.${slug}.problem${i}` as const;
    return t(key) || project.problem[i];
  });

  const solutionLines = project.solution.map((_, i) => {
    const key = `projects.${slug}.solution${i}` as const;
    return t(key) || project.solution[i];
  });

  const resultsLines = project.results.map((_, i) => {
    const key = `projects.${slug}.results${i}` as const;
    return t(key) || project.results[i];
  });

  const siteFeaturesList =
    project.siteFeatures?.map((_, i) => {
      const key = `projects.${slug}.siteFeature${i}` as const;
      return t(key) || project.siteFeatures![i];
    }) ?? [];

  const title = t(`projects.${slug}.title` as "projects.modme-landing.title") || project.title;
  const role = t(`projects.${slug}.role` as "projects.modme-landing.role") || project.role;
  const overviewRole =
    t(`projects.${slug}.overviewRole` as "projects.modme-landing.overviewRole") ||
    project.overview.role;
  const overviewDuration =
    t(`projects.${slug}.overviewDuration` as "projects.modme-landing.overviewDuration") ||
    project.overview.duration;

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
                    <div className="text-foreground/55">{t("projects.detail.role")}</div>
                    <div className="text-right">{overviewRole}</div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-foreground/55">{t("projects.detail.duration")}</div>
                    <div className="text-right">{overviewDuration}</div>
                  </div>
                  <div className="pt-1">
                    <div className="text-foreground/55">{t("projects.detail.tools")}</div>
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
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                    {problemLines.map((x, i) => (
                      <li key={i}>- {x}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-sm text-foreground/60">
                    {t("projects.detail.solutionTitle")}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                    {solutionLines.map((x, i) => (
                      <li key={i}>- {x}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6">
                  <div className="text-sm text-foreground/60">
                    {t("projects.detail.resultsTitle")}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                    {resultsLines.map((x, i) => (
                      <li key={i}>- {x}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {siteFeaturesList.length > 0 && (
                <Reveal delay={0.12}>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-sm text-foreground/60">
                      {t("projects.detail.siteFeaturesTitle")}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/70">
                      {siteFeaturesList.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
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
              <ScreenshotGallery screenshots={project.screenshots} />
            </Reveal>
          )}
        </Container>
      </Section>
    </main>
  );
}
