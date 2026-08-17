"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroVisual } from "@/components/HeroVisual";
import { TechStack } from "@/components/TechStack";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { useLocale } from "@/contexts/LocaleContext";

/** Hero ostidagi ishonch ko'rsatkichlari — raqamlar "Men haqimda" sahifasidagi tajribadan. */
const STATS = [
  { value: "600+", labelKey: "home.statApps" },
  { value: "400+", labelKey: "home.statCenters" },
  { value: "3+", labelKey: "home.statYears" },
] as const;

export function HomeContent() {
  const { t } = useLocale();

  return (
    <main>
      <Section className="pt-10 md:pt-14 lg:pt-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-foreground/8 px-3 py-1 text-xs text-foreground/70">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--grad-c)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--grad-c)]" />
                  </span>
                  {t("home.heroBadge")}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {t("home.name")}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-3 text-lg text-foreground/70 sm:text-xl">
                  {t("home.title")}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                  {t("home.description")}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/projects"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:focus-ring"
                  >
                    {t("home.viewProjects")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="glass inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/12 focus-visible:focus-ring"
                  >
                    {t("home.contactMe")}
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-foreground/10 pt-6">
                  {STATS.map((stat) => (
                    <div key={stat.labelKey}>
                      <dt className="text-2xl font-semibold tracking-tight text-foreground">
                        {stat.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-5 text-foreground/60">
                        {t(stat.labelKey)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-[32px] p-4 md:p-5">
                <HeroVisual />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-sm text-foreground/60">{t("home.skills")}</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {t("home.techStack")}
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-6">
            <Reveal delay={0.05}>
              <TechStack />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm text-foreground/60">{t("home.selectedWork")}</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  {t("home.projects")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {t("home.viewAll")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {projects.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={0.05 + i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
