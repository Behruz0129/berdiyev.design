# berdiyev.design

Berdiyev Bexruzbek — UI/UX dizayner va frontend dasturchining shaxsiy portfolio sayti.
Uch tilda (o'zbek / rus / ingliz), qorong'i va yorug' rejim bilan.

**Jonli sayt:** [berdiyev.design](https://berdiyev.design)

## Texnologiyalar

| Qatlam | Nima ishlatilgan |
|--------|------------------|
| Framework | Next.js 16 (App Router), React 19 |
| Til | TypeScript |
| Uslub | Tailwind CSS 4 + CSS o'zgaruvchilari (`src/app/globals.css`) |
| Animatsiya | Framer Motion |
| Ikonkalar | lucide-react |
| Tema | next-themes (`data-theme` atributi) |
| CV eksport | jsPDF + Noto Sans (Unicode) |
| Analitika | Vercel Analytics |

## Ishga tushirish

```bash
npm install
npm run dev
```

Sayt [http://localhost:3000](http://localhost:3000) da ochiladi.

Kontakt formasi ishlashi uchun repo ildizida `.env.local` fayli kerak:

```bash
TELEGRAM_BOT_TOKEN=...   # @BotFather bergan token
TELEGRAM_CHAT_ID=...     # xabar tushadigan chat/kanal ID
```

Bu ikkisi bo'lmasa sayt ishlaydi, faqat forma yuborishda xato qaytaradi.

## Loyiha tuzilishi

```
src/
├── app/
│   ├── layout.tsx           # umumiy karkas: metadata, tema, til
│   ├── (site)/              # navbar + footer bo'lgan barcha sahifalar
│   │   ├── layout.tsx
│   │   ├── page.tsx + HomeContent.tsx        # bosh sahifa
│   │   ├── about/           # men haqimda + CV yuklab olish
│   │   ├── projects/        # loyihalar ro'yxati va [slug] sahifasi
│   │   └── contact/         # aloqa formasi
│   ├── api/contact/route.ts # forma → Telegram
│   ├── opengraph-image.tsx  # ijtimoiy tarmoq preview rasmi (avtomatik)
│   ├── not-found.tsx        # 404
│   ├── sitemap.ts, robots.ts
│   └── icon.svg             # favicon
├── components/              # qayta ishlatiladigan UI
├── contexts/LocaleContext   # til holati (cookie'da saqlanadi)
├── data/
│   ├── projects.ts          # loyihalar ma'lumoti
│   └── site.ts              # domen, ijtimoiy tarmoqlar, brend rangi
├── lib/
│   ├── i18n.ts              # til yordamchilari
│   └── resume-pdf.ts        # CV PDF generatsiyasi
└── messages/                # uz.ts · ru.ts · en.ts tarjimalari
```

**Sahifa naqshi:** `page.tsx` — server komponent (SEO metadata shu yerda),
mazmun esa yonidagi `*Content.tsx` client komponentda (til almashtirish uchun
`useLocale()` kerak). Yangi sahifa qo'shganda ham shu naqshga rioya qiling.

## Kontent qo'shish

- **Yangi loyiha:** `src/data/projects.ts` ga obyekt qo'shing, rasmni
  `public/projects/` ga joylang, so'ng uchala `src/messages/*.ts` fayliga
  tarjimalarini yozing. Batafsil: [docs/ASSETS.md](docs/ASSETS.md).
- **Matnni o'zgartirish:** faqat `src/messages/` ichidagi fayllar tahrirlanadi —
  komponentlarda matn qotib qolmagan.
- **Havolalar (Telegram, GitHub…):** `src/data/site.ts`.

Tarjima kalitlari `en.ts` dan tip sifatida olinadi, shuning uchun `uz.ts` yoki
`ru.ts` da kalit tushib qolsa `npx tsc --noEmit` xato beradi.

## Tekshirish

```bash
npx tsc --noEmit   # tiplar
npm run lint       # eslint
npm run build      # production build
```

## Deploy

Vercel'ga ulangan: `main` branch'ga push qilinganda avtomatik deploy bo'ladi.
`TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` Vercel loyiha sozlamalarida
(Environment Variables) turishi kerak.

## Litsenziya

Kod va kontent shaxsiy portfolio uchun. `public/fonts/` ichidagi Noto Sans
shriftlari — SIL Open Font License 1.1.
