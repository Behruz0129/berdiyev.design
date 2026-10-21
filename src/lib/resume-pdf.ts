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

/*
  Chekka 46 emas, 40. Ruscha matn o'zbekcha va inglizchadan uzunroq va
  46 pt da bir varaqqa sig'masdi. Kengroq ustun qatorlar sonini ham
  kamaytiradi, ya'ni yutuq ikki tomonlama.
*/
const MARGIN = 40;

/*
  Oraliqlar bir varaqqa sig'ish uchun qisilgan. CV qisqartirilgandan keyin
  mazmun bir betga deyarli sig'ardi — faqat «Ko'nikmalar» ikkinchi betga
  o'tib ketardi, ya'ni ikkinchi bet bitta kartochka uchun ochilardi.
  Bo'sh ikkinchi betdan ko'ra zich bitta bet yaxshiroq.
*/
const SECTION_GAP = 13;

/** Kartochka ichidagi o'lchamlar. */
const CARD = { padX: 14, padY: 10, radius: 9 } as const;

/** Kartochkalar orasidagi oraliq. */
const CARD_GAP = 5;

/** Qator balandliklari — matn o'lchamiga bog'liq, shuning uchun bir joyda. */
const LINE = { title: 13.5, body: 13, bullet: 12.4 } as const;

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
    /*
      Yorliq yolg'iz qolmasligi kerak. Agar varaq oxirida faqat yorliqqa
      joy qolsa, u bir betda, kartochkasi esa keyingisida chiqib ketardi —
      o'quvchi «Ko'nikmalar» deb o'qiydi va ostida hech narsa topmaydi.
      Shuning uchun yorliqning o'zidan tashqari kamida bitta kichik
      kartochkaga ham joy talab qilinadi.
    */
    ensureSpace(56 + 70);
    y += SECTION_GAP;
    font(8.5, true, COLORS.accent);
    doc.setCharSpace(1.2);
    doc.text(label.toUpperCase(), MARGIN, y);
    doc.setCharSpace(0);
    y += 7;
    stroke(COLORS.line);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, y, pageWidth - MARGIN, y);
    y += 13;
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

    y = (boxed ? top + height : y) + CARD_GAP;
  };

  /**
   * Ko'nikmalar — ikki ustunda.
   *
   * Bu bo'lim beshta uzun qatordan iborat va bitta ustunda chizilganda
   * varaqqa sig'may, butun boshli ikkinchi bet ochilardi — faqat shu
   * kartochka uchun. Ikki ustun balandlikni deyarli ikki barobar
   * qisqartiradi va ro'yxatni ko'z bilan solishtirish ham osonlashadi.
   *
   * Ustunlar balandligi tenglashtiriladi: qatorlar emas, QATOR SONI
   * bo'yicha bo'linadi — ba'zi band ikki qatorga chiqadi, shuning uchun
   * oddiy yarmidan bo'lish ustunlarni nomutanosib qoldirardi.
   */
  const skillsCard = (items: string[]) => {
    const list = items.filter(Boolean);
    const colGap = 16;
    const colWidth = (innerWidth - colGap) / 2;
    const textWidth = colWidth - 13;

    font(9.5);
    const wrapped = list.map((b) => wrap(b, textWidth));
    const heightOf = (col: string[][]) =>
      col.reduce((sum, lines) => sum + lines.length * LINE.bullet + 4, 0) - 4;

    /*
      Bo'linish nuqtasi barcha variantni sinab tanlanadi: eng baland ustun
      eng past bo'ladigani yutadi. Oddiy «yarmigacha to'ldir» usuli bu yerda
      ishlamaydi — bandlar turli uzunlikda va natija nomutanosib chiqib,
      kartochka keraksiz balandlashadi.
    */
    let split = 1;
    let best = Infinity;
    for (let i = 1; i < wrapped.length; i++) {
      const tallest = Math.max(heightOf(wrapped.slice(0, i)), heightOf(wrapped.slice(i)));
      if (tallest < best) {
        best = tallest;
        split = i;
      }
    }

    const cols = [wrapped.slice(0, split), wrapped.slice(split)];
    const bodyHeight = Math.max(heightOf(cols[0]), heightOf(cols[1]));
    const height = CARD.padY * 2 + bodyHeight;

    ensureSpace(height + CARD_GAP);
    const top = y;
    fill(COLORS.card);
    doc.roundedRect(MARGIN, top, contentWidth, height, CARD.radius, CARD.radius, "F");

    cols.forEach((col, i) => {
      const x = MARGIN + CARD.padX + i * (colWidth + colGap);
      let cy = top + CARD.padY + 9;
      for (const lines of col) {
        font(9.5, false, COLORS.ink);
        fill(COLORS.accent);
        doc.rect(x, cy - 5.4, 3, 3, "F");
        doc.text(lines, x + 13, cy);
        cy += lines.length * LINE.bullet + 4;
      }
    });

    y = top + height + CARD_GAP;
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
  y += mark + 17;

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
  y += 14;

  // Qisqa apelsin bo'lak, davomi ingichka kulrang — saytdagi urg'u ohangi
  stroke(COLORS.accent);
  doc.setLineWidth(2);
  doc.line(MARGIN, y, MARGIN + 54, y);
  stroke(COLORS.line);
  doc.setLineWidth(0.7);
  doc.line(MARGIN + 54, y, pageWidth - MARGIN, y);
  y += 15;

  /*
    CV «Men haqimda» sahifasining nusxasi EMAS.

    Sahifada o'quvchi qiziqib kelgan va batafsil o'qiydi; CV ni esa ishga
    oluvchi bir necha soniyada ko'zdan kechiradi. Shuning uchun bu yerda
    faqat UI/UX ga aloqador narsa qoladi: bitta qisqa profil, dizaynga oid
    bandlar va natija. Qolgani (to'liq backend ro'yxati, qiziqishlar, ish
    jarayonidagi mayda vazifalar) saytda qoladi — o'chirilmaydi, shunchaki
    CV ga chiqmaydi.

    Tanlangan bandlar raqam bilan ko'rsatilgan: matnni o'zgartirmasdan
    qaysi biri CV ga tushishini shu yerdan boshqarish mumkin.
  */

  // ── Profil ───────────────────────────────────────────────────────────────
  card({ paragraphs: [t("about.resumeProfile")] });

  // ── Tajriba ──────────────────────────────────────────────────────────────
  sectionLabel(t("about.experience"));

  /*
    Islom sivilizatsiyasi markazi BIRINCHI o'ringa chiqdi. Xronologik
    jihatdan Modme yangiroq, lekin bu UI/UX CV si: eng tepada aynan
    dizayn roli turishi kerak, qo'llab-quvvatlash roli emas.
  */
  card({
    title: t("about.iccTitle"),
    meta: `${t("about.iccPeriod")} · ${t("about.iccDuration")}`,
    paragraphs: [t("about.iccSummary")],
    // 2 Figmada dizayn · 5 ekranlarga moslash · 3 dasturchiga topshirish · 8 natija
    bullets: [2, 5, 3, 8].map((i) => t(`about.iccBullet${i}`)),
  });

  card({
    title: t("about.modmeTitle"),
    meta: t("about.modmePeriod"),
    paragraphs: [t("about.modmeSummary")],
    // 5 landing dizayni va frontendi · 4 CRM va ta'lim jarayonlarini bilish
    bullets: [5, 4].map((i) => t(`about.modmeBullet${i}`)),
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
  skillsCard([
    t("about.skillsDesign"),
    t("about.skillsCode"),
      /*
        Backend qisqa variantda. To'liq ro'yxat (NestJS, Prisma, Redis,
        Docker, Caddy, Hetzner...) UI/UX CV sida diqqatni dizayndan
        chalg'itadi — u «Men haqimda» sahifasida to'liq turibdi.
      */
    t("about.skillsBackendShort"),
    t("about.skillsOtherShort"),
    t("about.skillsLanguages"),
  ]);

  /*
    «Qiziqishlar» CV dan olib tashlandi — bir varaqqa sig'dirish uchun
    birinchi qisqartiriladigan bo'lim shu. Saytda qolaveradi.
  */

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
