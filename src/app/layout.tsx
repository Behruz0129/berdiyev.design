import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Manrope, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Locale } from "@/lib/i18n";
import { siteConfig } from "@/data/site";

// Geometrik grotesk: katta sarlavhada xarakterli, mayda matnda tinch o'qiladi.
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-family",
  subsets: ["latin", "latin-ext", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/*
 * Kirill uchun ikkinchi shrift.
 *
 * Plus Jakarta Sans da `cyrillic` to'plami YO'Q — Google Fonts unga faqat
 * `cyrillic-ext` beradi (U+0460–052F, eski va kam ishlatiladigan harflar).
 * Ruscha matn esa U+0400–045F da, ya'ni yuklangan diapazonlarning hech
 * biriga tushmaydi va tizim shriftiga qulab tushardi.
 *
 * Manrope o'sha oraliqni qoplaydi va xarakteri jihatidan yaqin. Fayl
 * `unicode-range` orqali ulangani uchun u FAQAT sahifada kirill harf
 * bo'lsa yuklanadi — o'zbek va ingliz versiyalari hech narsa yutqazmaydi.
 */
const cyrillic = Manrope({
  variable: "--font-cyrillic-family",
  subsets: ["cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Raqam, telefon, havola va sana kabi "ma'lumot" uchun. Kirill ham
// so'ralgan: yorliqlar tarjima qilinsa fallbackka tushib qolmasin.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
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
      <head>
        {/*
          Ochilish animatsiyalari FAQAT JS bor bo'lganda yoqiladi.

          Yashirin holat (`opacity: 0`) `html.has-js` ostida yozilgan,
          shuning uchun JS o'chirilgan brauzerda — va qidiruv robotining
          skriptsiz ko'rinishida — hamma narsa oddiygina ko'rinib turadi.
          Skript <head> da va sinxron: birinchi bo'yoqdan oldin ishlaydi,
          shuning uchun «ko'rindi → yashirindi → chiqdi» miltillashi bo'lmaydi.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("has-js")`,
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${cyrillic.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
