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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Berdiyev Bexruzbek — UI/UX Designer & Frontend Developer",
    template: "%s — Berdiyev Bexruzbek",
  },
  description:
    "Minimalistic personal portfolio for a UI/UX Designer and Frontend Developer.",
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
