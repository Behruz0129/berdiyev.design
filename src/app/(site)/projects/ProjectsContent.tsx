"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Loyihalar ro'yxati: birinchisi keng, qolganlari ikki ustunda.
 *
 * Avval uchalasi ham bir xil balandlikdagi ustma-ust kartochka edi — ro'yxat
 * uzun chiqar, lekin qaysi ish muhimroq ekani bilinmasdi. Birinchisini
 * ajratib ko'rsatish tanlovni o'zi qilib beradi: sahifaga kirgan odam avval
 * eng yaxshi ishni ko'radi, qolganini esa bitta ekranda ko'zdan kechiradi.
 */
export function ProjectsContent() {
  const { t } = useLocale();
  const [featured, ...rest] = projects;

  return (
    <main>
      <PageHeader
        eyebrow={`${projects.length} ${t("projects.countLabel")}`}
        title={t("projects.pageTitle")}
        subtitle={t("projects.pageSubtitle")}
      />

      <Container className="pb-16">
        <div className="grid gap-4">
          {featured ? (
            <Reveal>
              <FeaturedCard project={featured} index={0} />
            </Reveal>
          ) : null}

          {rest.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((project, i) => (
                /* Ketma-ket: ikkinchi kartochka birinchisidan bir oz keyin */
                <Reveal key={project.slug} delay={i * 110}>
                  <SmallCard project={project} index={i + 1} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </main>
  );
}

/** Sarlavha, rol/yil va tavsif uchun umumiy matnlar. */
function useProjectText(project: Project) {
  const { t } = useLocale();
  return {
    title: t(`projects.${project.slug}.title`) || project.title,
    role: t(`projects.${project.slug}.role`) || project.role,
    description: t(`projects.${project.slug}.shortDescription`) || project.shortDescription,
  };
}

/** Tartib raqami — monospace, saytdagi boshqa "ma'lumot" bilan bir tilda. */
function Index({ value }: { value: number }) {
  return (
    <span className="font-mono text-[12px] tabular-nums text-muted">
      {String(value + 1).padStart(2, "0")}
    </span>
  );
}

function Meta({ project, index }: { project: Project; index: number }) {
  const { role } = useProjectText(project);
  return (
    <div className="flex items-center gap-3">
      <Index value={index} />
      <span className="h-px w-5 bg-line" aria-hidden />
      <span className="text-[13px] text-muted">
        {role} · {project.year}
      </span>
    </div>
  );
}

/**
 * Butun kartochka bitta havola. Ichida ikkinchi havola yo'q: avval
 * sarlavha ham, «Batafsil» ham alohida havola edi va bitta joyga olib
 * borardi — klaviatura bilan yurganda ikki marta to'xtash kerak bo'lardi.
 */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLocale();
  const { title, description } = useProjectText(project);

  return (
    <article className="card group overflow-hidden">
      <Link
        href={`/projects/${project.slug}`}
        className="grid focus-visible:focus-ring lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
          <Image
            src={project.heroImage}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 620px"
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <Meta project={project} index={index} />

          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground">
            {title}
          </h2>

          <p className="max-w-prose text-[15px] leading-7 text-foreground/80">{description}</p>

          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            {t("projects.viewDetails")}
            <ArrowUpRight
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

function SmallCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLocale();
  const { title, description } = useProjectText(project);

  return (
    <article className="card group h-full overflow-hidden">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col focus-visible:focus-ring"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.heroImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <Meta project={project} index={index} />

          <h2 className="text-[19px] font-medium leading-snug tracking-[-0.02em] text-foreground">
            {title}
          </h2>

          {/* Tavsif qisqartiriladi: ikkala kartochka bir balandlikda tursin */}
          <p className="line-clamp-3 text-[14.5px] leading-6 text-foreground/75">{description}</p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-accent">
            {t("projects.viewDetails")}
            <ArrowUpRight
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
