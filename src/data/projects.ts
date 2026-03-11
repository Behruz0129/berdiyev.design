export type ProjectScreenshot = {
  title: string;
  image: string;
  description?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  shortDescription: string;
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
};

export const projects: Project[] = [
  {
    slug: "modme-landing",
    title: "Modme.uz Landing Page",
    year: "2024",
    role: "UI/UX Design + Frontend",
    shortDescription:
      "Landing page for Modme CRM & LMS: premium design, micro-animations, platform info (pricing, benefits, docs, gamification), resources, and Telegram-integrated demo form.",
    heroImage: "/projects/modme.png",
    overview: {
      role: "UI/UX Design + Frontend Development",
      duration: "3–4 weeks",
      tools: ["Figma", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP"],
    },
    problem: [
      "Educational centers needed a single, trustworthy entry point to learn about Modme CRM & LMS and request a demo.",
      "Product value (pricing, benefits, documentation, video tutorials, gamification) had to be clear at a glance.",
      "The site had to feel premium and on-brand, with smooth micro-animations and modern UI.",
      "Demo requests needed to flow directly into the platform (e.g. Telegram) for fast follow-up.",
    ],
    solution: [
      "Designed a high-end landing with brand identity colors and clear hierarchy for pricing, benefits, docs, video tutorials, gamification preview, and resource links.",
      "Built the site in Next.js with Framer Motion and GSAP for micro-animations and polished interactions.",
      "Integrated a demo request form that sends submissions to Telegram for instant platform-side handling.",
      "Structured content so visitors can get full platform info and request a demo in one place.",
    ],
    results: [
      "A single, conversion-focused landing where visitors get pricing, benefits, documentation, video tutorials, gamification preview, and resources.",
      "Demo requests from the form are delivered to Telegram and processed by the platform team.",
      "Premium look and feel with consistent micro-animations and modern stack (Next.js, Framer Motion, GSAP).",
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
    // TODO: shu yerga real demo linkingizni qo'ying (masalan https://modme.uz yoki demo form sahifasi)
    demoUrl: "https://modme.uz",
  },
  {
    slug: "islamic-civilization-center-interactives",
    title: "Islamic Civilization Center Interactives",
    year: "2025",
    role: "UI/UX Designer & Project Manager",
    shortDescription:
      "Interactive educational applications for museum exhibitions.",
    heroImage: "/projects/icc.png",
    overview: {
      role: "UI/UX Design + Project Management",
      duration: "8 months",
      tools: ["Figma", "Interactive systems", "Android", "Windows (.exe)"],
    },
    problem: [
      "Complex government technical specifications required precise interpretation.",
      "Interfaces had to work across many screen sizes and touch displays.",
      "The system needed consistent UX across hundreds of interactive apps.",
    ],
    solution: [
      "Converted technical requirements into a scalable UI system in Figma.",
      "Coordinated design handoff and ensured developers matched the intended UX.",
      "Managed production flow, adaptation for multiple screen types, and exports.",
    ],
    results: [
      "600+ interactive applications delivered across exhibition systems.",
      "8 months development lifecycle managed end-to-end.",
      "Installed for three themes: Pre-Islamic period, First Renaissance, Second Renaissance.",
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

