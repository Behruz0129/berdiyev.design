import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "UI/UX designer and frontend developer from Uzbekistan. Experience at Modme CRM and the Islamic Civilization Center interactive systems — 600+ interactive applications delivered.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
