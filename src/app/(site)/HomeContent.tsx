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
import { ContactPills } from "@/components/ContactPills";
import { ScrambleText } from "@/components/ScrambleText";
import { SectionHeader } from "@/components/SectionHeader";
import { ServicesSection } from "@/components/ServicesSection";
import { PricingSection } from "@/components/PricingSection";
import { Reveal } from "@/components/Reveal";
import { Phone, TelegramLogo, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { useLocale } from "@/contexts/LocaleContext";
import { downloadResumePdf } from "@/lib/resume-pdf";
import { projects } from "@/data/projects";
import { locationImage } from "@/data/personal";
import { siteConfig } from "@/data/site";

export function HomeContent() {
  const { t, locale } = useLocale();
  const [pdfState, setPdfState] = useState<"idle" | "loading" | "error">(
    "idle",
  );

  /*
    Nuqta iboraning ichida turadi, tashqarisida emas: kenglik eng uzun
    ibora bo'yicha band qilingani uchun qisqa iborada tashqi nuqta matndan
    uzilib, havoda osilib qolardi.

    Ro'yxat `useMemo` ichida — har renderda yangi massiv yasalsa,
    almashtirish effekti qayta ishga tushib, hisob doim noldan boshlanardi.
  */
  const roles = useMemo(
    () => [t("home.role1"), t("home.role2")].map((role) => `${role}.`),
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
      <Container className="pb-8 pt-14 sm:pb-10 sm:pt-20">
        {/* ── Sarlavha ──────────────────────────────────────────────────── */}
        {/*
          Sarlavha uchun keng ustun: «Men» va kasb bitta qatorga sig'ishi
          kerak, `max-w-3xl` (768px) da esa ular sig'may, kasb uchinchi
          qatorga tushib ketardi.
        */}
        <Reveal className="relative max-w-5xl">
          {/*
            Sarlavha bir gap, lekin ikki qatlamda: kulrang bog'lovchilar va
            qora asosiy so'zlar. Ko'z shu farq bo'ylab yuradi va gapni o'zi
            o'qib chiqadi.
          */}
          <h1 className="text-[clamp(1.9rem,6.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            <span className="text-muted">{t("home.greeting")}</span>
            <Image
              src="/profile.jpg"
              alt=""
              width={260}
              height={260}
              priority
              className="mx-3 inline-block h-[1.9em] w-[1.9em] -translate-y-[0.08em] -rotate-[10deg] rounded-[0.26em] border border-card-line object-cover align-middle shadow-[0_2px_6px_rgba(16,18,24,0.12),0_16px_32px_-14px_rgba(16,18,24,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[0.18em] hover:rotate-[7deg] hover:scale-[1.15]"
            />
            <span className="text-foreground">{t("home.shortName")}</span>{" "}
            {/*
              Lavozim bitta emas, ikkita — shuning uchun matn joyida
              almashib turadi. «Men» ham shu komponentning ichida: quti
              yaxlit bo'lgani uchun ikkalasi birga ko'chadi va qator soni
              o'zgarmaydi.
            */}
            <ScrambleText
              prefix={t("home.rolePrefix")}
              phrases={roles}
              className="text-accent"
            />
          </h1>
        </Reveal>

        {/*
          Matn chapda, tugma o'ngda. Bu qator ataylab sarlavha qutisidan
          TASHQARIDA: sarlavha `max-w-5xl` da (kasb nomi bir qatorga sig'ishi
          uchun), qator esa sahifaning to'liq enida — shunda tugmaning o'ng
          cheti pastdagi kartochkalar bilan bir chiziqda turadi. Ilgari u
          ichkarida bo'lgani uchun chekkaga yetmay qolardi.

          Tekislash `start`: tugma ham, matn ham yuqoridan boshlanadi.
        */}
        <Reveal
          delay={90}
          className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-12"
        >
          <p className="max-w-xl text-[16px] leading-7 text-foreground/75">{t("home.lead")}</p>
          <Link
            href="/contact"
            className="btn-accent flex-shrink-0 self-start hover:brightness-105 focus-visible:focus-ring"
          >
            <Phone size={18} weight="fill" />
            {t("home.contactMe")}
          </Link>
        </Reveal>

        {/*
          Ko'rsatkichlar sarlavhadan tashqarida va butun kenglikni oladi —
          ular sifat da'vosi emas, o'lchov. Raqam monospace va katta, izoh
          kichik: ko'z avval raqamni oladi, keyin nima ekanini o'qiydi.
        */}
        {/*
          Grid emas, `justify-between` li qator: uchta ko'rsatkich butun
          kenglikka yoyiladi — birinchisi chap chetda, oxirgisi o'ng chetda.
          Avval bu to'rt ustunli grid edi, ichida esa uchta element: qator
          kenglikning atigi ucdan uchini egallab, o'ng tomonda bo'sh joy
          qolib ketardi.

          Matn har uchalasida ham chapga tekislangan — raqam va izoh bir
          chiziqdan boshlansa, ko'z ularni ustun bo'lib o'qiydi.
        */}
        <Reveal
          as="ul"
          delay={180}
          className="mt-10 flex flex-col gap-7 border-t border-line pt-6 sm:flex-row sm:justify-between sm:gap-8"
        >
          {[1, 2, 3].map((i) => (
            <li key={i} className="sm:max-w-[15rem]">
              <div className="font-mono text-[clamp(1.5rem,3.4vw,2.1rem)] font-semibold leading-none tracking-[-0.03em] text-accent tabular-nums">
                {t(`home.stat${i}Value`)}
              </div>
              <p className="mt-2 text-[13px] leading-5 text-muted">{t(`home.stat${i}Label`)}</p>
            </li>
          ))}
        </Reveal>

        {/* ── Loyihalar ─────────────────────────────────────────────────── */}
        <Reveal as="section" className="mt-12">
          {/*
            Bo'lim sarlavhasi bir qatorda: chapda nom, o'ngda barcha
            loyihalarga o'tish. Bosh sahifada uchtasi ko'rinadi — qolgani
            alohida sahifada.
          */}
          <SectionHeader
            title={t("nav.projects")}
            action={
              <Link
                href="/projects"
                className="card inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium text-foreground transition-colors hover:bg-surface-2 focus-visible:focus-ring"
              >
                {t("home.viewAll")}
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            }
          />

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => {
              const title =
                t(`projects.${project.slug}.title`) || project.title;
              const role = t(`projects.${project.slug}.role`) || project.role;
              return (
                <Card
                  key={project.slug}
                  label={`${role} · ${project.year}`}
                  bodyClassName="flex flex-col"
                >
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
                    <h3 className="mt-4 text-[15px] font-medium text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-[13px] leading-5 text-muted">
                      {t(`projects.${project.slug}.shortDescription`) ||
                        project.shortDescription}
                    </p>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Reveal>

        {/* ── Xizmatlar ─────────────────────────────────── */}
        <Reveal className="mt-16">
          <ServicesSection />
        </Reveal>

        {/* ── Narxlar ──────────────────────────────────── */}
        <Reveal className="mt-16">
          <PricingSection />
        </Reveal>

        {/*
          ── Men haqimda ──
          Tajriba, joylashuv, vositalar va shaxsiy kartochkalar. Ular
          loyihalar va narxlardan KEYIN turadi: buyurtma bermoqchi odam
          avval ishni va narxni ko'rishi kerak, pleylistni emas.
        */}
        {/*
          ── Bento ──
          Ustunlar teng emas: chapda bitta uzun ustun (tajriba + vositalar),
          o'ngda ikki ustunli maydon (joylashuv/pleylist ustma-ust, ostida
          keng ish stoli). Oddiy uch ustunli gridda buni chizib bo'lmaydi —
          kartochkalar turli balandlikda va biri ikki ustunni egallaydi,
          shuning uchun ikkita ichma-ich ustun ishlatilgan.
        */}
        <Reveal className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Chap ustun: tajriba (cho'ziladi) + vositalar */}
          <div className="flex flex-col gap-3">
            <Card label={t("about.experience")} bodyClassName="flex flex-col">
              <ol className="scroll-fade relative min-h-[13.5rem] flex-1 space-y-5 pr-1 pl-5">
                <span
                  className="absolute left-[3px] top-2 bottom-2 w-px bg-line"
                  aria-hidden
                />
                {[
                  {
                    title: t("about.iccTitle"),
                    period: t("about.iccPeriod"),
                    duration: t("about.iccDuration"),
                    note: t("about.iccSummary"),
                    dot: "bg-accent",
                  },
                  {
                    title: t("about.modmeTitle"),
                    period: t("about.modmePeriod"),
                    note: t("about.modmeSummary"),
                    duration: "",
                    dot: "bg-foreground",
                  },
                  {
                    title: t("about.school2Desc"),
                    period: t("about.school2"),
                    note: t("about.school2Note"),
                    duration: "",
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
                    {/* Muddat faqat ma'lum bo'lsa qo'shiladi — `t()` bo'sh qaytarsa chiqmaydi */}
                    <div className="mt-0.5 text-[12px] text-muted">
                      {job.period}
                      {job.duration ? (
                        <span className="text-foreground/45">
                          {" "}
                          · {job.duration}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-foreground/65">
                      {job.note}
                    </p>
                  </li>
                ))}
              </ol>

              {/*
                CV va batafsil sahifa — ikkalasi ham tugma. Sayt frilans
                uchun, shuning uchun ular asosiy yo'l emas: kim tajribani
                tekshirmoqchi bo'lsa shu yerdan topadi, qolganlar loyihalar
                va narxlar bilan cheklanadi.
              */}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={pdfState === "loading"}
                  className="btn px-4 py-2.5 text-[13.5px] hover:opacity-85 focus-visible:focus-ring disabled:opacity-60"
                >
                  <DownloadSimple size={16} weight="bold" />
                  {pdfState === "loading"
                    ? t("about.resumeGenerating")
                    : t("about.resumeDownload")}
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
                <p className="mt-2 text-[13px] text-red-600">
                  {t("about.resumeError")}
                </p>
              ) : null}
            </Card>

            {/* Vositalar — logotiplar cheksiz lenta bo'lib o'tadi */}
            <Card label={t("home.techStack")} bodyClassName="flex flex-col">
              <div className="flex flex-1 items-center">
                <TechMarquee />
              </div>
            </Card>
          </div>

          {/* O'ng maydon: ikkita katak, ostida keng ish stoli */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            {/*
              `flex-1` — shunda joylashuv va pleylist qolgan bo'shliqni
              o'zlashtiradi va o'ng ustunning pasti chap ustun bilan bir
              chiziqda tugaydi. Usiz pastda ~30px osilib qolardi.
            */}
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Joylashuv — bosilsa xaritada ochiladi */}
              <Card
                label={t("contact.locationLabel")}
                bodyClassName="flex flex-col"
              >
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
                          ? "mt-1 font-mono text-[11px] tracking-[0.14em] text-white/70"
                          : "mt-1 font-mono text-[11px] tracking-[0.14em] text-muted"
                      }
                    >
                      {siteConfig.timezone}
                    </div>
                  </div>
                </a>
              </Card>
              <MusicCard />
            </div>

            <SetupCard />
          </div>
        </Reveal>

        {/* ── Aloqa ─────────────────────────────────────────────────────── */}
        <Reveal className="mt-14">
          <Card label={t("contact.detailsTitle")}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="max-w-xl text-[17px] leading-7 text-foreground">
                  {t("contact.pitch")}
                </p>
                {/*
                  Telegram va telefon to'liq yozilgan — ular ko'chirib
                  olinadi. Profillar esa faqat ikonka: kerak bo'lsa
                  topiladi, lekin asosiy aloqani bosib ketmaydi.
                */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ContactPills />
                  <SocialIconLinks />
                </div>
              </div>

              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="btn-accent flex-shrink-0 self-start hover:brightness-105 focus-visible:focus-ring sm:self-end"
              >
                <TelegramLogo size={18} weight="fill" />
                {t("home.contactMe")}
              </a>
            </div>
          </Card>
        </Reveal>
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
    "M0 40 H400",
    "M0 96 H400",
    "M0 158 H400",
    "M0 214 H400",
    "M0 268 H400",
    "M52 0 V320",
    "M118 0 V320",
    "M196 0 V320",
    "M262 0 V320",
    "M334 0 V320",
    "M0 0 L400 320",
    "M400 0 L120 320",
  ];
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        stroke="currentColor"
        className="text-foreground/12"
        fill="none"
        strokeWidth="1.6"
      >
        {roads.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g
        stroke="currentColor"
        className="text-foreground/8"
        fill="none"
        strokeWidth="1"
      >
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
