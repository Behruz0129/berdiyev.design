"use client";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

export default function ProjectsPage() {
  const { t } = useLocale();

  return (
    <main>
      <Section className="pt-10 md:pt-14">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {t("projects.pageTitle")}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/70">
                  {t("projects.pageSubtitle")}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={0.03 + i * 0.05}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
