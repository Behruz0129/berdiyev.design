import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/data/site";

// Geometrik grotesk: katta sarlavhada xarakterli, mayda matnda tinch o'qiladi.
// Kirill ham kerak — sayt ruscha versiyada ham shu shriftda qolsin.
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-family",
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.name} — ${siteConfig.role}`;
const description =
  "Berdiyev Behruzbek — UI/UX designer and frontend developer in Tashkent. Landing pages, CRM interfaces and interactive systems. Case studies: GIGU Fashion Academy, the Modme CRM landing and 600+ interactive screens for the Islamic Civilization Center.";

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
    "Berdiyev Behruzbek",
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
      <body
        className={`${sans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
