"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { Phone, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { Sticker } from "@/components/Sticker";
import { useLocale } from "@/contexts/LocaleContext";
import { downloadResumePdf } from "@/lib/resume-pdf";
import { projects } from "@/data/projects";
import { contactLinks, siteConfig, socialLinks } from "@/data/site";

const STEPS = [1, 2, 3, 4];

const SKILLS = [
  "Figma",
  "TypeScript",
  "React",
  "Next.js",
  "TailwindCSS",
  "Node.js",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Bitrix24",
];

export function HomeContent() {
  const { t, locale } = useLocale();
  const [step, setStep] = useState(1);
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">("idle");

  async function handleDownload() {
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
      <Container size="wide" className="py-8 sm:py-10">
        {/* ── Sarlavha ──────────────────────────────────────────────────── */}
        <div className="relative max-w-3xl">
          {/*
            Sarlavha bir gap, lekin uch qatlamda: kulrang bog'lovchilar,
            qora asosiy so'zlar, apelsin oxirgi qator. Ko'z shu farq bo'ylab
            yuradi va gapni o'zi o'qib chiqadi.
          */}
          <h1 className="text-[clamp(2rem,6vw,3.4rem)] font-semibold leading-[1.14] tracking-[-0.035em]">
            <span className="text-muted">{t("home.greeting")}</span>
            <Image
              src="/profile.jpg"
              alt=""
              width={160}
              height={160}
              priority
              className="mx-2.5 inline-block h-[1.42em] w-[1.42em] -rotate-6 -translate-y-[0.1em] rounded-[0.26em] border border-line object-cover align-middle shadow-[0_2px_6px_rgba(16,18,24,0.12),0_16px_32px_-14px_rgba(16,18,24,0.45)]"
            />
            <span className="text-foreground">{t("home.shortName")}</span>{" "}
            <span className="text-foreground">{t("home.roleLine")}</span>{" "}
            {/*
              Nakleyka sarlavhaning oxirida, matn oqimida turadi — go'yo
              gapning ustiga yopishtirilgan. Shakl SVG bilan chizilgan,
              matn esa uning ustidagi haqiqiy HTML.
            */}
            <Sticker
              line1={t("home.stickerLine1")}
              line2={t("home.stickerLine2")}
              // Chapga suriladi: "dasturchiman." so'zining oxirini yarmigacha
              // bosib turadi, go'yo matn ustiga yopishtirilgan.
              className="relative z-10 -ml-[0.15em] w-[clamp(10.5rem,18vw,13rem)] -translate-y-[0.34em] rotate-[15deg] sm:-ml-[0.45em]"
            />
          </h1>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/contact"
              className="btn-accent self-start hover:brightness-105 focus-visible:focus-ring"
            >
              <Phone size={18} weight="fill" />
              {t("home.contactMe")}
            </Link>
            <p className="max-w-md text-[15px] leading-6 text-foreground/75">
              {t("home.heroNote")}
            </p>
          </div>
        </div>

        {/* ── Bento ─────────────────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/*
            Tajriba — qo'shnilari bilan bir xil o'lchamdagi katak. Ichiga
            hammasi sig'maydi, shuning uchun ro'yxat aylantiriladi:
            scrollbar yashirin, chetlari so'nib boradi — shundan
            "davomi bor" degani o'qiladi.
          */}
          <Card label={t("about.experience")} bodyClassName="flex flex-col">
            <ol className="scroll-fade relative h-[13.5rem] space-y-5 pr-1 pl-5">
              <span className="absolute left-[3px] top-2 bottom-2 w-px bg-line" aria-hidden />
              {[
                {
                  title: t("about.iccTitle"),
                  period: t("about.iccPeriod"),
                  note: t("about.iccSummary"),
                  dot: "bg-accent",
                },
                {
                  title: t("about.modmeTitle"),
                  period: t("about.modmePeriod"),
                  note: t("about.modmeSummary"),
                  dot: "bg-foreground",
                },
                {
                  title: t("about.school2Desc"),
                  period: t("about.school2"),
                  note: t("about.school2Note"),
                  dot: "bg-muted",
                },
              ].map((job) => (
                <li key={job.title} className="relative">
                  <span
                    className={`absolute -left-5 top-1.5 h-[7px] w-[7px] rounded-full ${job.dot}`}
                  />
                  <div className="text-[14px] font-medium leading-snug text-foreground">
                    {job.title}
                  </div>
                  <div className="mt-0.5 text-[12px] text-muted">{job.period}</div>
                  <p className="mt-1.5 text-[12.5px] leading-5 text-foreground/65">{job.note}</p>
                </li>
              ))}
            </ol>

            <p className="mt-auto pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-[13px] text-accent underline underline-offset-4 focus-visible:focus-ring"
              >
                {t("about.title")}
                <ArrowUpRight size={13} weight="bold" />
              </Link>
            </p>
          </Card>

          {/* Xizmatlar */}
          <Card label={t("services.title")}>
            <ul className="space-y-2.5">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-foreground/85">
                  <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {t(`services.item${i}Title`)}
                </li>
              ))}
            </ul>
          </Card>

          {/* Joylashuv — referensdagi xarita kartochkasi */}
          <Card label={t("contact.locationLabel")} bodyClassName="flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-card-2">
              <MapArt />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <div className="text-lg font-medium tracking-[0.28em] text-foreground">
                  TOSHKENT
                </div>
                <div className="mt-1 text-[11px] tracking-[0.2em] text-muted">
                  41.2995° N, 69.2401° E · UTC+5
                </div>
              </div>
            </div>
          </Card>

          {/* Jarayon — bosqichli tablar bilan, referensdagidek */}
          <Card label={t("process.title")} className="sm:col-span-2">
            <div className="min-h-[9.5rem]">
              <h3 className="text-[15px] font-medium text-foreground">
                {t(`process.step${step}Title`)}
              </h3>
              <p className="mt-2.5 text-[14px] leading-6 text-foreground/75">
                {t(`process.step${step}Desc`)}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 rounded-full border border-line bg-card-2 p-1">
              {STEPS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={step === i}
                  className={
                    step === i
                      ? "flex-1 rounded-full bg-foreground px-3 py-2 text-[13px] font-medium text-background focus-visible:focus-ring"
                      : "flex-1 rounded-full px-3 py-2 text-[13px] text-muted transition-colors hover:text-foreground focus-visible:focus-ring"
                  }
                >
                  {String(i).padStart(2, "0")}
                </button>
              ))}
            </div>
          </Card>

          {/* CV */}
          <Card label="CV" bodyClassName="flex flex-col">
            {/* Tillar ro'yxati Tajriba kartochkasida bor — bu yerda takrorlanmaydi. */}
            <p className="text-[13px] leading-5 text-muted">PDF · uz / ru / en</p>
            <button
              type="button"
              onClick={handleDownload}
              disabled={pdfState === "loading"}
              className="btn mt-auto w-full hover:opacity-85 focus-visible:focus-ring disabled:opacity-60"
            >
              <DownloadSimple size={17} weight="bold" />
              {pdfState === "loading" ? t("about.resumeGenerating") : t("about.resumeDownload")}
            </button>
            {pdfState === "error" ? (
              <p className="mt-2 text-[13px] text-red-600">{t("about.resumeError")}</p>
            ) : null}
          </Card>

          {/* Ko'nikmalar */}
          <Card label={t("home.techStack")} className="sm:col-span-2 lg:col-span-3">
            <ul className="flex flex-wrap gap-1.5">
              {SKILLS.map((s) => (
                <li key={s} className="pill">
                  {s}
                </li>
              ))}
            </ul>
          </Card>

          {/* Loyihalar — har biri alohida katak */}
          {projects.map((project) => {
            const title = t(`projects.${project.slug}.title`) || project.title;
            const role = t(`projects.${project.slug}.role`) || project.role;
            return (
              <Card key={project.slug} label={`${role} · ${project.year}`} bodyClassName="flex flex-col">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-1 flex-col focus-visible:focus-ring"
                >
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={project.heroImage}
                      alt={title}
                      width={800}
                      height={500}
                      sizes="(max-width: 1024px) 100vw, 380px"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium text-foreground">{title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-[13px] leading-5 text-muted">
                    {t(`projects.${project.slug}.shortDescription`) || project.shortDescription}
                  </p>
                </Link>
              </Card>
            );
          })}

          {/* Aloqa */}
          <Card label={t("contact.detailsTitle")} className="sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="max-w-xl text-[17px] leading-7 text-foreground">
                  {t("contact.availability")}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {contactLinks.map((c) => (
                    <li key={c.label}>
                      <a href={c.href} className="pill hover:bg-surface-2 focus-visible:focus-ring">
                        <span className="text-muted">{c.label}</span>
                        {c.value}
                      </a>
                    </li>
                  ))}
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill hover:bg-surface-2 focus-visible:focus-ring"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-accent flex-shrink-0 self-start hover:brightness-105 focus-visible:focus-ring sm:self-end"
              >
                <Phone size={18} weight="fill" />
                {t("home.contactMe")}
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}

/**
 * Xarita o'rniga — abstrakt ko'cha to'ri. Haqiqiy xarita xizmati kalit va
 * tashqi so'rov talab qiladi; bu yerda faqat kayfiyat kerak, shuning uchun
 * to'r SVG bilan chiziladi va hech narsa yuklanmaydi.
 */
function MapArt() {
  const roads = [
    "M0 40 H400", "M0 96 H400", "M0 158 H400", "M0 214 H400", "M0 268 H400",
    "M52 0 V320", "M118 0 V320", "M196 0 V320", "M262 0 V320", "M334 0 V320",
    "M0 0 L400 320", "M400 0 L120 320",
  ];
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" className="text-foreground/12" fill="none" strokeWidth="1.6">
        {roads.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke="currentColor" className="text-foreground/8" fill="none" strokeWidth="1">
        {[20, 68, 132, 180, 240, 296].map((y) => (
          <path key={y} d={`M0 ${y} H400`} />
        ))}
        {[26, 84, 160, 228, 300, 372].map((x) => (
          <path key={x} d={`M${x} 0 V320`} />
        ))}
      </g>
      {/* Markaz nuqtasi */}
      <circle cx="196" cy="158" r="6" className="fill-accent" />
      <circle cx="196" cy="158" r="16" className="fill-accent" opacity="0.18" />
    </svg>
  );
}
