import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** Barcha sahifalar uchun yagona karkas: tepada menyu, pastda footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
