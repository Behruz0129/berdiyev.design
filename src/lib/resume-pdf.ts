import { siteConfig } from "@/data/site";
import type { Locale } from "@/lib/i18n";

type Translate = (key: string) => string;

/**
 * jsPDF ichiga o'rnatilgan shriftlar (helvetica va h.k.) faqat Latin-1 ni biladi:
 * ruscha matn va o'zbekcha `oʻ / gʻ` belgilari PDF'da yo'qoladi. Shuning uchun
 * CV har doim Unicode TTF (Noto Sans) bilan chiziladi — shrift faqat tugma
 * bosilganda yuklanadi va keyin keshda qoladi.
 */
const FONT_FAMILY = "NotoSans";
const FONTS = [
  { style: "normal", file: "NotoSans-Regular.ttf" },
  { style: "bold", file: "NotoSans-Bold.ttf" },
] as const;

const fontCache = new Map<string, string>();

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  // Katta fayl uchun `String.fromCharCode(...bytes)` stack'ni to'ldirib yuboradi,
  // shuning uchun bo'laklab o'giramiz.
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function loadFontBase64(file: string) {
  const cached = fontCache.get(file);
  if (cached) return cached;

  const res = await fetch(`/fonts/${file}`);
  if (!res.ok) throw new Error(`Font yuklanmadi: ${file}`);
  const base64 = toBase64(await res.arrayBuffer());
  fontCache.set(file, base64);
  return base64;
}

const COLORS = {
  text: [17, 20, 28],
  muted: [110, 116, 130],
  accent: [124, 58, 237],
  hairline: [222, 226, 234],
} as const;

/** CV'ni PDF qilib yaratadi va brauzerda yuklab olishni boshlaydi. */
export async function downloadResumePdf(t: Translate, locale: Locale) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  for (const { style, file } of FONTS) {
    const base64 = await loadFontBase64(file);
    doc.addFileToVFS(file, base64);
    doc.addFont(file, FONT_FAMILY, style);
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const setText = (size: number, bold = false, color: readonly number[] = COLORS.text) => {
    doc.setFont(FONT_FAMILY, bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  };

  const ensureSpace = (needed: number) => {
    if (y + needed <= pageHeight - margin) return;
    doc.addPage();
    y = margin;
  };

  const sectionTitle = (label: string) => {
    ensureSpace(46);
    y += 10;
    setText(11, true, COLORS.accent);
    doc.text(label.toUpperCase(), margin, y);
    y += 8;
    doc.setDrawColor(COLORS.hairline[0], COLORS.hairline[1], COLORS.hairline[2]);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
  };

  const paragraph = (text: string, size = 10, color: readonly number[] = COLORS.text) => {
    if (!text) return;
    setText(size, false, color);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    ensureSpace(lines.length * (size + 4));
    doc.text(lines, margin, y);
    y += lines.length * (size + 4) + 6;
  };

  const bullet = (text: string) => {
    if (!text) return;
    setText(10);
    const indent = 14;
    const lines = doc.splitTextToSize(text, maxWidth - indent) as string[];
    ensureSpace(lines.length * 14 + 4);
    doc.setFillColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
    doc.circle(margin + 3, y - 3.2, 1.6, "F");
    doc.text(lines, margin + indent, y);
    y += lines.length * 14 + 4;
  };

  const jobHeader = (title: string, period: string) => {
    ensureSpace(34);
    setText(11, true);
    const periodWidth = doc.getTextWidth(period);
    const titleLines = doc.splitTextToSize(title, maxWidth - periodWidth - 16) as string[];
    doc.text(titleLines, margin, y);
    setText(9.5, false, COLORS.muted);
    doc.text(period, pageWidth - margin, y, { align: "right" });
    y += titleLines.length * 14 + 6;
  };

  // ── Sarlavha ──────────────────────────────────────────────────────────────
  setText(24, true);
  doc.text(siteConfig.name, margin, y + 6);
  y += 26;
  setText(11, false, COLORS.muted);
  doc.text(siteConfig.role, margin, y);
  y += 18;

  setText(9, false, COLORS.accent);
  doc.text(
    [
      `Telegram: ${siteConfig.telegramHandle}`,
      siteConfig.phoneDisplay,
      siteConfig.url.replace("https://", ""),
    ].join("   ·   "),
    margin,
    y,
  );
  y += 13;
  doc.text(
    ["GitHub: Behruz0129", "Instagram: @berdiyev.design", "Toshkent, UTC+5"].join("   ·   "),
    margin,
    y,
  );
  y += 14;

  doc.setDrawColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
  doc.setLineWidth(1.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  // ── Men haqimda ───────────────────────────────────────────────────────────
  paragraph(t("about.bio1"), 10, COLORS.muted);
  paragraph(t("about.bio2"), 10, COLORS.muted);

  // ── Tajriba ───────────────────────────────────────────────────────────────
  sectionTitle(t("about.experience"));

  jobHeader(t("about.modmeTitle"), t("about.modmePeriod"));
  for (let i = 1; i <= 5; i++) bullet(t(`about.modmeBullet${i}`));
  y += 6;

  jobHeader(t("about.iccTitle"), t("about.iccPeriod"));
  paragraph(t("about.iccDesc"), 10, COLORS.muted);
  paragraph(t("about.iccApps"), 10, COLORS.muted);
  for (let i = 1; i <= 8; i++) bullet(t(`about.iccBullet${i}`));

  // ── Ta'lim ────────────────────────────────────────────────────────────────
  sectionTitle(t("about.education"));
  jobHeader(t("about.school2Desc"), t("about.school2"));
  paragraph(t("about.school2Note"), 9.5, COLORS.muted);

  // ── Ko'nikmalar va qiziqishlar ────────────────────────────────────────────
  sectionTitle(t("about.skillsTitle"));
  bullet(t("about.skillsDesign"));
  bullet(t("about.skillsCode"));
  bullet(t("about.skillsBackend"));
  bullet(t("about.skillsOther"));
  bullet(t("about.skillsLanguages"));

  sectionTitle(t("about.interestsTitle"));
  for (let i = 1; i <= 3; i++) bullet(t(`about.interest${i}`));

  // ── Sahifa raqamlari ──────────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    setText(8.5, false, COLORS.muted);
    doc.text(`${page} / ${pageCount}`, pageWidth - margin, pageHeight - 24, { align: "right" });
    doc.text(siteConfig.url.replace("https://", ""), margin, pageHeight - 24);
  }

  doc.save(`berdiyev-bexruzbek-cv-${locale}.pdf`);
}
