import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

/**
 * Sahifa matni brauzerda tanlangan tilga qarab almashadi, lekin metadata
 * server tomonda bir marta yoziladi va inglizcha qoladi — bu sahifani statik
 * generatsiya qilishga imkon beradi (cookie o'qilsa sahifa dinamik bo'lib qolardi).
 */
export const metadata: Metadata = {
  title: "About",
  description:
    "UI/UX designer and frontend developer from Uzbekistan. Experience at Modme LLC and the Islamic Civilization Center interactive systems — 600+ interactive applications delivered.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
