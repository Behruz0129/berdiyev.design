import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.name} — ${siteConfig.role}`;
const description =
  "Portfolio of Berdiyev Bexruzbek — UI/UX designer and frontend developer from Uzbekistan. Case studies: Modme CRM landing page and 600+ interactive applications for the Islamic Civilization Center.";

export const metadata: Metadata = {
  // metadataBase bo'lmasa OG rasm nisbiy path bilan qoladi va ijtimoiy
  // tarmoqlarda ko'rinmaydi — link tashlanganda preview chiqmasligining sababi.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  keywords: [
    "Berdiyev Bexruzbek",
    "UI/UX designer",
    "frontend developer",
    "Uzbekistan",
    "Next.js",
    "Figma",
    "portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.shortName,
    title,
    description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const saved = cookieStore.get("NEXT_LOCALE")?.value;
  const initialLocale: Locale =
    saved === "uz" || saved === "ru" || saved === "en" ? saved : "en";

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <LocaleProvider initialLocale={initialLocale}>
            <div className="min-h-dvh">
              <Navbar />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </div>
          </LocaleProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
