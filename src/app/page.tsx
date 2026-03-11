"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HeroVisual } from "@/components/HeroVisual";
import { TechStack } from "@/components/TechStack";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { useLocale } from "@/contexts/LocaleContext";

export default function Home() {
  const { t } = useLocale();

  return (
    <main>
      <Section className="pt-10 md:pt-14 lg:pt-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-foreground/8 px-3 py-1 text-xs text-foreground/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--grad-c)]" />
                  {t("home.heroBadge")}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
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
                    className="glass inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-foreground hover:bg-foreground/12 transition-colors focus-visible:focus-ring"
                  >
                    {t("home.viewProjects")}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-background bg-foreground hover:bg-foreground/85 transition-colors focus-visible:focus-ring"
                  >
                    {t("home.contactMe")}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="glass rounded-[32px] p-4 md:p-5">
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
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {t("home.viewAll")}
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
