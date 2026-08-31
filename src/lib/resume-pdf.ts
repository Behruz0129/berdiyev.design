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

/**
 * Saytning yorug' temasidagi tokenlar (`globals.css`). CV va sayt bir tilda
 * gapirishi kerak: aksent — o'sha apelsin, matn — o'sha qora, kartochka —
 * o'sha ochiq kulrang, burchaklar yumaloq.
 *
 * Sahifa foni ataylab OQ qoldirilgan. Saytda u kulrang, lekin CV bosmaga
 * chiqariladi va butun varaqni bo'yash siyohni behuda yeydi — bento
 * tuyg'usi kartochkalar orqali beriladi.
 */
const COLORS = {
  ink: [15, 16, 19],
  muted: [107, 114, 125],
  accent: [233, 74, 18],
  card: [244, 245, 247],
  line: [220, 222, 227],
  white: [255, 255, 255],
} as const;

const MARGIN = 46;
const SECTION_GAP = 20;

/** Kartochka ichidagi o'lchamlar. */
const CARD = { padX: 14, padY: 13, radius: 9 } as const;

/** Qator balandliklari — matn o'lchamiga bog'liq, shuning uchun bir joyda. */
const LINE = { title: 14, body: 13.5, bullet: 13 } as const;

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
  const contentWidth = pageWidth - MARGIN * 2;
  const innerWidth = contentWidth - CARD.padX * 2;
  let y = MARGIN;

  // ── Chizish yordamchilari ────────────────────────────────────────────────

  const font = (size: number, bold = false, color: readonly number[] = COLORS.ink) => {
    doc.setFont(FONT_FAMILY, bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  };

  const fill = (color: readonly number[]) => doc.setFillColor(color[0], color[1], color[2]);
  const stroke = (color: readonly number[]) => doc.setDrawColor(color[0], color[1], color[2]);
  const wrap = (text: string, width: number) => doc.splitTextToSize(text, width) as string[];

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - MARGIN - 26) {
      doc.addPage();
      y = MARGIN;
    }
  };

  /**
   * Bo'lim yorlig'i — saytdagi `eyebrow` bilan bir xil: kichkina, katta
   * harflarda, harflar orasi kengaytirilgan, apelsin rangda. Ostida butun
   * kenglikka ingichka chiziq.
   */
  const sectionLabel = (label: string) => {
    ensureSpace(56);
    y += SECTION_GAP;
    font(8.5, true, COLORS.accent);
    doc.setCharSpace(1.2);
    doc.text(label.toUpperCase(), MARGIN, y);
    doc.setCharSpace(0);
    y += 7;
    stroke(COLORS.line);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, y, pageWidth - MARGIN, y);
    y += 16;
  };

  /**
   * Bir blok — yaxlit kartochka: sarlavha, o'ng chetda davri, matnlar va
   * ro'yxat.
   *
   * Balandlik OLDIN hisoblanadi. jsPDF chizilgan narsaning ORQASIGA hech
   * narsa qo'ya olmaydi — avval fon, keyin matn kerak, ya'ni fonning
   * balandligi matn chizilishidan oldin ma'lum bo'lishi shart.
   *
   * Blok butun varaqqa sig'masa kartochkasiz, oddiy oqim bilan chiziladi:
   * bunday blokni ikkiga bo'lish CV uchun ortiqcha murakkablik bo'lardi.
   */
  const card = (opts: {
    title?: string;
    meta?: string;
    paragraphs?: string[];
    bullets?: string[];
  }) => {
    const { title, meta, paragraphs = [], bullets = [] } = opts;

    let metaWidth = 0;
    if (meta) {
      font(9);
      metaWidth = doc.getTextWidth(meta) + 16;
    }

    font(10.5, true);
    const titleLines = title ? wrap(title, innerWidth - metaWidth) : [];

    font(9.5);
    const paraLines = paragraphs.filter(Boolean).map((p) => wrap(p, innerWidth));
    const bulletLines = bullets.filter(Boolean).map((b) => wrap(b, innerWidth - 13));

    let height = CARD.padY * 2;
    if (titleLines.length) height += titleLines.length * LINE.title + 6;
    for (const p of paraLines) height += p.length * LINE.body + 6;
    for (const b of bulletLines) height += b.length * LINE.bullet + 4;
    if (bulletLines.length) height -= 4;

    const boxed = height <= pageHeight - MARGIN * 2 - 26;
    if (boxed) ensureSpace(height + 8);

    const top = y;
    if (boxed) {
      fill(COLORS.card);
      doc.roundedRect(MARGIN, top, contentWidth, height, CARD.radius, CARD.radius, "F");
    }

    const x = MARGIN + (boxed ? CARD.padX : 0);
    y = top + (boxed ? CARD.padY : 0) + 9;

    if (titleLines.length) {
      font(10.5, true);
      doc.text(titleLines, x, y);
      if (meta) {
        font(9, false, COLORS.muted);
        doc.text(meta, pageWidth - MARGIN - (boxed ? CARD.padX : 0), y, { align: "right" });
      }
      y += titleLines.length * LINE.title + 6;
    }

    for (const p of paraLines) {
      if (!boxed) ensureSpace(p.length * LINE.body);
      font(9.5, false, COLORS.muted);
      doc.text(p, x, y);
      y += p.length * LINE.body + 6;
    }

    for (const b of bulletLines) {
      if (!boxed) ensureSpace(b.length * LINE.bullet);
      font(9.5, false, COLORS.ink);
      // Belgi — kichkina apelsin kvadrat: saytdagi urg'u bilan bir xil ohang
      fill(COLORS.accent);
      doc.rect(x, y - 5.4, 3, 3, "F");
      doc.text(b, x + 13, y);
      y += b.length * LINE.bullet + 4;
    }

    y = (boxed ? top + height : y) + 8;
  };

  // ── Sarlavha ─────────────────────────────────────────────────────────────

  /*
    Ism yonidagi kichkina apelsin kvadrat — saytdagi logotipning o'rnini
    bosadi. Rasm yuklashdan ko'ra shakl chizish arzon va u hech qachon
    «yuklanmadim» bo'lib qolmaydi.
  */
  const mark = 26;
  fill(COLORS.accent);
  doc.roundedRect(MARGIN, y, mark, mark, 7, 7, "F");
  font(14, true, COLORS.white);
  doc.text("B", MARGIN + mark / 2, y + mark / 2 + 5, { align: "center" });

  const headLeft = MARGIN + mark + 14;
  font(21, true, COLORS.ink);
  doc.text(siteConfig.name, headLeft, y + 12);
  font(10, false, COLORS.muted);
  doc.text(siteConfig.role, headLeft, y + 27);
  y += mark + 20;

  const dot = "     ·     ";
  font(8.8, false, COLORS.ink);
  doc.text(
    [
      `Telegram ${siteConfig.telegramHandle}`,
      siteConfig.phoneDisplay,
      siteConfig.url.replace("https://", ""),
    ].join(dot),
    MARGIN,
    y,
  );
  y += 12;
  font(8.8, false, COLORS.muted);
  doc.text(
    ["GitHub Behruz0129", "Instagram @berdiyev.design", "Toshkent · UTC+5"].join(dot),
    MARGIN,
    y,
  );
  y += 16;

  // Qisqa apelsin bo'lak, davomi ingichka kulrang — saytdagi urg'u ohangi
  stroke(COLORS.accent);
  doc.setLineWidth(2);
  doc.line(MARGIN, y, MARGIN + 54, y);
  stroke(COLORS.line);
  doc.setLineWidth(0.7);
  doc.line(MARGIN + 54, y, pageWidth - MARGIN, y);
  y += 18;

  // ── Men haqimda ──────────────────────────────────────────────────────────
  card({ paragraphs: [t("about.bio1"), t("about.bio2")] });

  // ── Tajriba ──────────────────────────────────────────────────────────────
  sectionLabel(t("about.experience"));

  card({
    title: t("about.modmeTitle"),
    meta: t("about.modmePeriod"),
    paragraphs: [t("about.modmeSummary")],
    bullets: [1, 2, 3, 4, 5].map((i) => t(`about.modmeBullet${i}`)),
  });

  card({
    title: t("about.iccTitle"),
    meta: t("about.iccPeriod"),
    paragraphs: [t("about.iccDesc"), t("about.iccApps")],
    bullets: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`about.iccBullet${i}`)),
  });

  // ── Ta'lim ───────────────────────────────────────────────────────────────
  sectionLabel(t("about.education"));
  card({
    title: t("about.school2Desc"),
    meta: t("about.school2"),
    paragraphs: [t("about.school2Note")],
  });

  // ── Ko'nikmalar ──────────────────────────────────────────────────────────
  sectionLabel(t("about.skillsTitle"));
  card({
    bullets: [
      t("about.skillsDesign"),
      t("about.skillsCode"),
      t("about.skillsBackend"),
      t("about.skillsOther"),
      t("about.skillsLanguages"),
    ],
  });

  // ── Qiziqishlar ──────────────────────────────────────────────────────────
  sectionLabel(t("about.interestsTitle"));
  card({ bullets: [1, 2, 3].map((i) => t(`about.interest${i}`)) });

  // ── Kolontitul ───────────────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    stroke(COLORS.line);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, pageHeight - 40, pageWidth - MARGIN, pageHeight - 40);
    font(8, false, COLORS.muted);
    doc.text(siteConfig.url.replace("https://", ""), MARGIN, pageHeight - 26);
    doc.text(`${page} / ${pageCount}`, pageWidth - MARGIN, pageHeight - 26, { align: "right" });
  }

  doc.save(`berdiyev-behruzbek-cv-${locale}.pdf`);
}
