"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { projects } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

export function ProjectsContent() {
  const { t } = useLocale();

  return (
    <main>
      <PageHeader
        eyebrow={`${projects.length} ${t("projects.countLabel")}`}
        title={t("projects.pageTitle")}
        subtitle={t("projects.pageSubtitle")}
      />

      <Container className="pb-16">
        <ul className="space-y-4">
          {projects.map((project) => {
            const title = t(`projects.${project.slug}.title`) || project.title;
            const role = t(`projects.${project.slug}.role`) || project.role;
            const description =
              t(`projects.${project.slug}.shortDescription`) || project.shortDescription;

            return (
              <li key={project.slug} className="card p-4 sm:p-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block focus-visible:focus-ring"
                >
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={project.heroImage}
                      alt={title}
                      width={1200}
                      height={750}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h2 className="mt-5 text-2xl font-medium tracking-tight text-foreground underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                    {title}
                  </h2>
                </Link>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="pill">{role}</span>
                  <span className="pill">{project.year}</span>
                </div>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-foreground/80">
                  {description}
                </p>

                <p className="mt-5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-accent underline underline-offset-4 focus-visible:focus-ring"
                  >
                    {t("projects.viewDetails")}
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </main>
  );
}
