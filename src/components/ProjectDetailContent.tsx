"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { BulletList } from "@/components/BulletList";
import { useLocale } from "@/contexts/LocaleContext";
import type { Project } from "@/data/projects";

/**
 * Loyiha sahifasi. Ma'lumot ikki manbadan keladi: `data/projects.ts` (rasm,
 * yil, havola) va tarjima fayllari (matn). Matn tarjimada bo'lsa o'sha,
 * bo'lmasa data'dagi inglizcha varianti ko'rsatiladi.
 */
export function ProjectDetailContent({ project }: { project: Project }) {
  const { t } = useLocale();

  const field = (key: string, fallback: string) =>
    t(`projects.${project.slug}.${key}`) || fallback;

  /** `problem0`, `problem1`, ... kabi raqamlangan kalitlarni ketma-ket yig'adi. */
  const indexed = (prefix: string, fallback: string[] = []) => {
    const out: string[] = [];
    for (let i = 0; i < 20; i++) {
      const value = t(`projects.${project.slug}.${prefix}${i}`) || fallback[i] || "";
      if (!value) break;
      out.push(value);
    }
    return out;
  };

  const title = field("title", project.title);
  const tools = indexed("overviewTool", [...project.overview.tools]);
  const siteFeatures = indexed("siteFeature", [...(project.siteFeatures ?? [])]);
  const screenshots = project.screenshots ?? [];
  const duration = field("overviewDuration", project.overview.duration);
  const context = field("context", project.context ?? "");

  return (
    <main>
      <PageHeader
        eyebrow={`${field("role", project.role)} · ${project.year}`}
        title={title}
        subtitle={field("shortDescription", project.shortDescription)}
      >
        {context ? (
          <p className="mt-5 max-w-2xl border-l-2 border-line pl-4 text-[15px] leading-7 text-muted">
            {context}
          </p>
        ) : null}

        {project.demoUrl ? (
          <p className="mt-6">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:focus-ring"
            >
              {t("projects.detail.viewDemo")}
            </a>
          </p>
        ) : null}
      </PageHeader>

      <Container className="pb-16">
        <Image
          src={project.heroImage}
          alt={title}
          width={1200}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1100px"
          priority
          className="h-auto w-full rounded-2xl border border-line"
        />

        <Block title={t("projects.detail.overviewTitle")}>
          <dl className="max-w-3xl space-y-4">
            <Row label={t("projects.detail.role")} value={field("overviewRole", project.overview.role)} />
            <Row label={t("projects.detail.duration")} value={duration} />
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              <dt className="w-28 flex-shrink-0 pt-1 text-sm text-muted">
                {t("projects.detail.tools")}
              </dt>
              <dd className="flex min-w-0 flex-1 flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="pill">
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Block>

        {/*
          Muammo / yechim / natija — keng ekranda yonma-yon. Ular bir-birini
          o'qib chiqiladigan uch qism emas, balki bitta hikoyaning uch
          bosqichi; yonma-yon turgani buni ko'rsatib beradi.
        */}
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <Panel title={t("projects.detail.problemTitle")}>
            <BulletList items={indexed("problem", [...project.problem])} />
          </Panel>
          <Panel title={t("projects.detail.solutionTitle")}>
            <BulletList items={indexed("solution", [...project.solution])} />
          </Panel>
          <Panel title={t("projects.detail.resultsTitle")}>
            <BulletList items={indexed("results", [...project.results])} />
          </Panel>
        </div>

        {siteFeatures.length ? (
          <Block title={t("projects.detail.includesTitle")}>
            <ul className="flex flex-wrap gap-2">
              {siteFeatures.map((f) => (
                <li key={f} className="pill">
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {screenshots.length ? (
          <Block title={t("projects.detail.screenshotsTitle")}>
            <ul className="space-y-10">
              {screenshots.map((shot, i) => (
                <li key={shot.image}>
                  <Image
                    src={shot.image}
                    alt={shot.title}
                    width={1200}
                    height={750}
                    sizes="(max-width: 1024px) 100vw, 1100px"
                    className="h-auto w-full rounded-2xl border border-line"
                  />
                  <Prose>
                    <h3 className="mt-4 text-[15px] font-medium text-foreground">
                      {field(`screenshot${i}Title`, shot.title)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {field(`screenshot${i}Desc`, shot.description ?? "")}
                    </p>
                  </Prose>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}
      </Container>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card mt-4 p-5 sm:p-6">
      <p className="card-label">{title}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Matn ustuni — kartochka keng bo'lsa ham qator uzunligi o'qishli qoladi. */
function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-3xl">{children}</div>;
}

/** Muammo / yechim / natija — ketma-ket uch blok. */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-5">
      <p className="card-label">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-wrap gap-x-3">
      <dt className="w-28 flex-shrink-0 text-sm text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 text-[15px] text-foreground/85">{value}</dd>
    </div>
  );
}
