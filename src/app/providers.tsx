"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  /*
    `disableTransitionOnChange` ataylab yo'q: u tema almashganda hamma
    o'tishni o'chirib qo'yardi. Uning o'rniga `ThemeToggle` <html> ga qisqa
    vaqtga `theme-changing` klassini qo'yadi — shunda o'tish faqat bosilgan
    paytda ishlaydi, sahifa yuklanganda emas.
  */
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
