import type { ProjectFontKey } from "@/lib/project-fonts";

export type ProjectScreenshot = {
  title: string;
  image: string;
  description?: string;
};

/**
 * Loyihada ishlatilgan rang. `role` — i18n kaliti
 * (`projects.detail.dsRole<Role>`), shuning uchun nom uch tilda chiqadi;
 * hex esa o'zgarmaydi.
 */
export type DesignSystemColor = {
  role: "primary" | "deep" | "accent" | "soft" | "paper" | "ink";
  hex: string;
};

/**
 * Loyihaning dizayn tili: shriftlar, ranglar, burchak radiusi.
 *
 * Ma'lumot taxminiy emas — GIGU niki loyihaning o'z kodidan, Modme niki
 * ishlab turgan saytning uslub faylidan olingan.
 *
 * Islom sivilizatsiyasi markazida bu blok YO'Q va ataylab: u landing emas,
 * o'nlab turli dastur, har birining o'z ko'rinishi bilan — bitta palitra
 * bilan umumlashtirsak, yolg'on bo'lardi.
 */
export type DesignSystem = {
  display: { name: string; font: ProjectFontKey };
  body: { name: string; font: ProjectFontKey };
  colors: DesignSystemColor[];
  /** Masalan: "6 → 20 px" */
  radius: string;
  /** Loyihaning o'z tugma matni — tarjima qilinmaydi, u iqtibos. */
  sampleCta: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  shortDescription: string;
  /** Loyiha qanday sharoitda bajarilgani — masalan asosiy ishdan tashqari loyiha. */
  context?: string;
  heroImage: string;
  overview: {
    role: string;
    duration: string;
    tools: string[];
  };
  problem: string[];
  solution: string[];
  results: string[];
  /** Optional: screenshot gallery (path from public, e.g. /projects/modme-landing-home.jpg) */
  screenshots?: ProjectScreenshot[];
  /** Optional: short list of what the site/product offers (e.g. Pricing, Docs, Demo form). */
  siteFeatures?: string[];
  /** Optional: demo link (live site, demo page, or Telegram bot link). */
  demoUrl?: string;
  /** Optional: loyihaning dizayn tili. Landing bo'lmagan ishlarda yo'q. */
  designSystem?: DesignSystem;
};

export const projects: Project[] = [
  {
    slug: "gigu-academy",
    title: "GIGU Moda Akademiyasi",
    year: "2025",
    role: "UI/UX Design + Frontend",
    shortDescription:
      "Three-language landing site for a fashion academy: 11 campaign landing pages, applications going straight into Bitrix24 CRM, and a daily traffic report in Telegram.",
    heroImage: "/projects/gigu.jpg",
    overview: {
      role: "UI/UX Design + Frontend Development",
      duration: "",
      tools: [
        "Figma",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Framer Motion",
        "Bitrix24 CRM",
        "Upstash Redis",
        "Vercel",
      ],
    },
    problem: [
      "The academy runs ads on several channels at once, and there was no way to tell which channel an application actually came from.",
      "Applications were handled by hand instead of landing in the CRM the moment they were submitted.",
      "The audience reads in three languages (Uzbek, Russian, English) and comes almost entirely from phones.",
    ],
    solution: [
      "Designed and built a three-language site, plus 11 separate campaign landing pages so every ad source has its own URL and UTM tags.",
      "Wired the application form directly into Bitrix24 with course, branch and age fields, so a lead reaches the sales team unedited.",
      "Built an in-house analytics layer (visits, page views, clicks, applications by device, OS, country and referrer) that sends a report to Telegram every morning.",
    ],
    results: [
      "The site is live at giguacademy.uz and takes applications for 5 branches and 2 study programmes.",
      "Applications arrive in the CRM instantly — nothing is copied by hand any more.",
      "Compressing the media brought the public folder from 137 MB down to about 9 MB, which cut hosting traffic sharply.",
    ],
    screenshots: [
      {
        title: "How studying works",
        image: "/projects/gigu-study.jpg",
        description: "O'qish sharoiti — foto bloklar bilan.",
      },
      {
        title: "Programmes",
        image: "/projects/gigu-courses.jpg",
        description: "Ikki ta'lim dasturi taqqoslangan holda.",
      },
      {
        title: "Application form",
        image: "/projects/gigu-enroll.jpg",
        description: "Kurs, filial va yosh tanlanadigan ariza formasi.",
      },
      {
        title: "Student results",
        image: "/projects/gigu-results.jpg",
        description: "Bitiruvchilarning o'z brendlari.",
      },
    ],
    siteFeatures: [
      "Three languages (uz / ru / en)",
      "11 campaign landing pages with their own UTM tags",
      "Application form connected to Bitrix24 CRM",
      "Course, branch and age selection",
      "Graduate results section",
      "FAQ and 5 branch locations",
      "Daily traffic and application report in Telegram",
    ],
    demoUrl: "https://giguacademy.uz",
    /*
      Loyihaning o'z kodidan olingan (`globals.css`, `layout.tsx`):
      sarlavhalar seriflik Cormorant Garamond da — moda akademiyasiga
      jurnal ohangini beradi; matn esa Outfit, u geometrik va tinch,
      shuning uchun sarlavha bilan raqobatlashmaydi.
    */
    designSystem: {
      display: { name: "Cormorant Garamond", font: "cormorant" },
      body: { name: "Outfit", font: "outfit" },
      colors: [
        { role: "primary", hex: "#ff0d4f" },
        { role: "deep", hex: "#d90b42" },
        { role: "soft", hex: "#ffd4d4" },
        { role: "paper", hex: "#faf8f8" },
        { role: "ink", hex: "#120a0e" },
      ],
      radius: "6 → 20 px",
      sampleCta: "Birinchi bepul darsga yozilish",
    },
  },
  {
    slug: "modme-landing",
    title: "Modme.uz Landing Page",
    year: "2024",
    role: "UI/UX Design + Frontend",
    shortDescription:
      "Landing page for Modme CRM & LMS: premium design, micro-animations, platform info (pricing, benefits, docs, gamification), resources, and Telegram-integrated demo form.",
    context:
      "Modme CRMda IT Support Manager sifatida ishlayman; landing sahifa asosiy vazifamdan tashqari loyiha bo'lib, dizayni va frontendini to'liq o'zim bajardim.",
    heroImage: "/projects/modme.png",
    overview: {
      role: "UI/UX Design + Frontend Development",
      duration: "3–4 weeks",
      tools: ["Figma", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"],
    },
    problem: [
      "To decide on Modme, the head of an educational center had to collect information from several places — price, features and documentation were not in one spot.",
      "Demo requests slowed down on arrival: they landed in a mailbox and were copied over by hand.",
      "The site had to look trustworthy — this is where a client chooses the system their whole business will run on.",
    ],
    solution: [
      "Put the entire decision path on one page: why you need it, how it works, what it costs, request a demo. Each block answers one question.",
      "Connected the demo form straight to Telegram, so a request reaches the team the moment it is sent.",
      "Built it in Next.js myself; the animations (Framer Motion, GSAP) are there to direct attention, not to decorate.",
    ],
    results: [
      "A visitor can see the price, the features and the documentation without leaving the page, and request a demo from there.",
      "Demo requests are no longer copied by hand — they arrive in the team's Telegram.",
      "The site is live at modme.uz.",
    ],
    screenshots: [
      {
        title: "Home Page",
        image: "/projects/modme-landing-home.png",
        description: "Bosh sahifa: platforma qiymati, CTA va asosiy bo‘limlar.",
      },
      {
        title: "Pricing",
        image: "/projects/modme-landing-pricing.png",
        description: "Narxlar bo‘limi — tariflar va afzalliklar.",
      },
      {
        title: "Gamification",
        image: "/projects/modme-landing-gamification.png",
        description: "Gamification preview — ballar, rozetkalar va o‘quv motivatsiyasi.",
      },
      {
        title: "Demo request",
        image: "/projects/modme-landing-demo.png",
        description: "Demo so‘rash formasi — to‘ldirilgach Telegramga yuboriladi.",
      },
    ],
    siteFeatures: [
      "Narxlar (tariflar va afzalliklar)",
      "Platforma afzalliklari va qisqacha tavsif",
      "Dokumentatsiya va resurslar linklari",
      "Video darsliklar bo‘limi",
      "Gamification preview — ballar, rozetkalar, motivatsiya",
      "Demo so‘rash formasi — Telegram orqali platformaga yuboriladi",
    ],
    demoUrl: "https://modme.uz",
    /*
      Modme mahsulot sayti — shuning uchun bitta neytral shrift (Inter)
      va bitta kuchli rang. Sariq faqat urg'u uchun: u apelsin bilan
      yonma-yon turganda diqqatni tortadi, lekin uni bosib ketmaydi.
    */
    designSystem: {
      display: { name: "Inter", font: "inter" },
      body: { name: "Inter", font: "inter" },
      colors: [
        { role: "primary", hex: "#ff8000" },
        { role: "accent", hex: "#ffd03d" },
        { role: "soft", hex: "#fff8e8" },
        { role: "paper", hex: "#fafafa" },
        { role: "ink", hex: "#181c23" },
      ],
      radius: "10 → 24 px",
      sampleCta: "Demo so'rash",
    },
  },
  {
    slug: "islamic-civilization-center-interactives",
    title: "Islamic Civilization Center Interactives",
    year: "2025",
    role: "UI/UX Designer & Project Manager",
    shortDescription:
      "Interactive systems for the exhibition halls of the Center of Islamic Civilization in Tashkent.",
    context:
      "An 8-month project. I designed the UI system, handed it over to the developers and managed production from start to finish.",
    heroImage: "/projects/icc.png",
    overview: {
      role: "UI/UX Design + Project Management",
      duration: "8 months",
      tools: ["Figma", "Android (.apk)", "Windows (.exe)", "BrightSign"],
    },
    problem: [
      "The government technical specification was long and precise, and had to be turned into interfaces without losing a single requirement.",
      "The same content had to work on touch displays and on large screens of very different sizes.",
      "Hundreds of screens are made by different people — without one system each of them would look and behave differently.",
    ],
    solution: [
      "Turned the specification into a scalable UI system in Figma: grid, type scale, components and states.",
      "Handed the design over to the developers and reviewed the builds, so the shipped screen matched the intended behaviour.",
      "Managed production across three themes: adapting for each screen type and exporting the builds.",
    ],
    results: [
      "600+ interactive screens and apps delivered for the exhibition systems (.apk, .exe and BrightSign builds).",
      "8 months of production managed from start to finish.",
      "Installed in three halls: the Pre-Islamic period, the First Renaissance and the Second Renaissance.",
    ],
    screenshots: [
      {
        title: "Pre-Islamic period",
        image: "/projects/icc-pre-islamic.png",
        description: "Islomgacha davr — interaktiv ko‘rgazma.",
      },
      {
        title: "First Renaissance",
        image: "/projects/icc-first-renaissance.png",
        description: "Birinchi Uyg‘onish davri.",
      },
      {
        title: "First Renaissance",
        image: "/projects/icc-first-renaissance-2.png",
        description: "Birinchi Uyg‘onish — ko‘rgazma.",
      },
      {
        title: "Second Renaissance",
        image: "/projects/icc-second-renaissance.png",
        description: "Ikkinchi Uyg‘onish davri.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

