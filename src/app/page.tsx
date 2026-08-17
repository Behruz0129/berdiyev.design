import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Qidiruv tizimlari uchun tuzilgan ma'lumot (schema.org). Google bu orqali
 * ism, kasb va ijtimoiy tarmoq havolalarini bir-biriga bog'laydi — "Berdiyev
 * Bexruzbek" so'rovida to'g'ri profil ko'rsatilishi ehtimolini oshiradi.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  nationality: "Uzbekistan",
  sameAs: Object.values(siteConfig.socials),
  knowsAbout: [
    "UI/UX Design",
    "Frontend Development",
    "Design Systems",
    "Figma",
    "Next.js",
    "React",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HomeContent />
    </>
  );
}
