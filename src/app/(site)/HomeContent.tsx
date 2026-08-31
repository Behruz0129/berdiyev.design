"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { MusicCard } from "@/components/PersonalCards";
import { SetupCard } from "@/components/SetupCard";
import { TechMarquee } from "@/components/TechMarquee";
import { SocialIconLinks } from "@/components/SocialIcons";
import { ScrambleText } from "@/components/ScrambleText";
import { Phone, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { useLocale } from "@/contexts/LocaleContext";
import { downloadResumePdf } from "@/lib/resume-pdf";
import { projects } from "@/data/projects";
import { locationImage } from "@/data/personal";
import { contactLinks, siteConfig } from "@/data/site";

export function HomeContent() {
  const { t, locale } = useLocale();
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">("idle");

  /*
    Nuqta iboraning ichida turadi, tashqarisida emas: kenglik eng uzun
    ibora bo'yicha band qilingani uchun qisqa iborada tashqi nuqta matndan
    uzilib, havoda osilib qolardi.

    Ro'yxat `useMemo` ichida — har renderda yangi massiv yasalsa,
    almashtirish effekti qayta ishga tushib, hisob doim noldan boshlanardi.
  */
  const roles = useMemo(
    () => [t("home.role1"), t("home.role2"), t("home.role3")].map((role) => `${role}.`),
    [t],
  );

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
            Sarlavha bir gap, lekin ikki qatlamda: kulrang bog'lovchilar va
            qora asosiy so'zlar. Ko'z shu farq bo'ylab yuradi va gapni o'zi
            o'qib chiqadi.
          */}
          <h1 className="text-[clamp(2rem,6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            <span className="text-muted">{t("home.greeting")}</span>
            <Image
              src="/profile.jpg"
              alt=""
              width={160}
              height={160}
              priority
              className="mx-2.5 inline-block h-[1.42em] w-[1.42em] -translate-y-[0.1em] -rotate-[10deg] rounded-[0.26em] border border-card-line object-cover align-middle shadow-[0_2px_6px_rgba(16,18,24,0.12),0_16px_32px_-14px_rgba(16,18,24,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[0.18em] hover:rotate-[7deg] hover:scale-[1.15]"
            />
            <span className="text-foreground">{t("home.shortName")}</span>{" "}
            <span className="text-foreground">{t("home.rolePrefix")}</span>{" "}
            {/*
              Lavozim bitta emas, uchta — shuning uchun matn joyida
              almashib turadi. Kenglikni eng uzun ibora band qilib turadi,
              ya'ni qator sakramaydi.
            */}
            <ScrambleText className="text-accent" phrases={roles} />
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

            {/*
              CV va batafsil sahifa — ikkalasi ham tugma. CV to'ldirilgan,
              chunki HR eng avval shuni bosadi; «Men haqimda» esa ramkali,
              ikkinchi darajali yo'l bo'lib qoladi.
            */}
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <button
                type="button"
                onClick={handleDownload}
                disabled={pdfState === "loading"}
                className="btn px-4 py-2.5 text-[13.5px] hover:opacity-85 focus-visible:focus-ring disabled:opacity-60"
              >
                <DownloadSimple size={16} weight="bold" />
                {pdfState === "loading" ? t("about.resumeGenerating") : t("about.resumeDownload")}
              </button>
              <Link
                href="/about"
                className="card inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:focus-ring"
              >
                {t("about.title")}
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
            {pdfState === "error" ? (
              <p className="mt-2 text-[13px] text-red-600">{t("about.resumeError")}</p>
            ) : null}
          </Card>

          {/* Joylashuv — bosilsa xaritada ochiladi */}
          <Card label={t("contact.locationLabel")} bodyClassName="flex flex-col">
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("contact.location")}
              className="group relative min-h-[13.5rem] flex-1 overflow-hidden rounded-2xl border border-line bg-card-2 focus-visible:focus-ring"
            >
              {/*
                Fon rasmi qo'yilsa u chiziladi, aks holda chizilgan ko'cha
                to'ri qoladi — kartochka ikkala holatda ham to'la ko'rinadi.
              */}
              {locationImage ? (
                <>
                  {/*
                    Rasm biroz kattalashtirilgan: to'liq holida ko'cha
                    nomlari juda mayda chiqib, xarita shunchaki kulrang
                    dog'ga aylanardi.
                  */}
                  <Image
                    src={locationImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="scale-[1.45] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.6]"
                  />
                  {/*
                    Pastdan qoraygan parda — yozuv rasmning istalgan joyida
                    ham o'qiladigan bo'lib qolsin.
                  */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                    aria-hidden
                  />
                </>
              ) : (
                <MapArt />
              )}

              {/*
                Koordinatalar olib tashlandi — ular hech kimga kerak
                bo'lmagan aniqlik edi. Vaqt mintaqasi qoldi: chet eldagi
                mijoz uchun "qachon yozsam javob beradi" degani shu.
              */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <div
                  className={
                    locationImage
                      ? "text-lg font-medium tracking-[0.28em] text-white"
                      : "text-lg font-medium tracking-[0.28em] text-foreground"
                  }
                >
                  TOSHKENT
                </div>
                <div
                  className={
                    locationImage
                      ? "mt-1 text-[11px] tracking-[0.2em] text-white/70"
                      : "mt-1 text-[11px] tracking-[0.2em] text-muted"
                  }
                >
                  {siteConfig.timezone}
                </div>
              </div>
            </a>
          </Card>

          {/* Shaxsiy — pleylist va ish stoli jihozlari */}
          <MusicCard />
          <SetupCard />

          {/* Vositalar — logotiplar cheksiz lenta bo'lib o'tadi */}
          <Card label={t("home.techStack")} bodyClassName="flex flex-col">
            <div className="flex flex-1 items-center">
              <TechMarquee />
            </div>
          </Card>

        </div>

        {/* ── Loyihalar ─────────────────────────────────────────────────── */}
        <section className="mt-14">
          {/*
            Bo'lim sarlavhasi bir qatorda: chapda nom, o'ngda barcha
            loyihalarga o'tish. Bosh sahifada uchtasi ko'rinadi — qolgani
            alohida sahifada.
          */}
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold tracking-[-0.03em] text-foreground">
              {t("nav.projects")}
            </h2>
            <Link
              href="/projects"
              className="card inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:focus-ring"
            >
              {t("home.viewAll")}
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => {
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
          </div>
        </section>

        {/* ── Aloqa ─────────────────────────────────────────────────────── */}
        <div className="mt-14">
          <Card label={t("contact.detailsTitle")}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="max-w-xl text-[17px] leading-7 text-foreground">
                  {t("contact.pitch")}
                </p>
                {/*
                  Email, telefon va Telegram to'liq yozilgan — ular
                  ko'chirib olinadi. Profillar esa faqat ikonka: kerak
                  bo'lsa topiladi, lekin asosiy aloqani bosib ketmaydi.
                */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ul className="flex flex-wrap gap-2">
                    {contactLinks.map((c) => (
                      <li key={c.label}>
                        <a href={c.href} className="pill hover:bg-surface-2 focus-visible:focus-ring">
                          <span className="text-muted">{c.label}</span>
                          {c.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <SocialIconLinks />
                </div>
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
