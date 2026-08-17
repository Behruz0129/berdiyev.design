# Rasm va matnlarni qayerga joylash

## Qisqacha

| Nima | Qayerga |
|------|---------|
| Profil rasmi | `public/profile.jpg` |
| Loyiha rasmlari | `public/projects/` |
| Loyiha ma'lumoti (struktura) | `src/data/projects.ts` |
| Sayt matnlari (3 til) | `src/messages/uz.ts` · `ru.ts` · `en.ts` |
| Havolalar, domen, brend rangi | `src/data/site.ts` |

---

## Rasmlar

Barcha loyiha rasmlari **`public/projects/`** papkasiga qo'yiladi, saytda esa
`/projects/<fayl-nomi>` yo'li bilan chaqiriladi (`public` so'zi yozilmaydi).

### Tavsiya etilgan o'lchamlar

| Rasm turi | O'lcham (px) | Nisbat |
|-----------|--------------|--------|
| Profil rasmi | 400×400 yoki 512×512 | 1:1 |
| Loyiha thumbnail (karta + banner) | 1920×823 yoki 1200×514 | 21:9 |
| Skrinshotlar (galereya) | 1600×900 yoki 1920×1080 | 16:9 |

Format: PNG, JPG yoki WebP. Next.js ularni brauzerga AVIF/WebP qilib beradi,
shuning uchun manba faylni alohida siqish shart emas (lekin 1 MB dan oshmagani
ma'qul — repo shuncha og'irlashadi).

### Hozirgi fayllar

```
public/
├── profile.jpg                              # "Men haqimda" sahifasidagi rasm
└── projects/
    ├── modme.png                            # Modme thumbnail + banner
    ├── modme-landing-home.png               # Modme skrinshotlari
    ├── modme-landing-pricing.png
    ├── modme-landing-gamification.png
    ├── modme-landing-demo.png
    ├── icc.png                              # ICC thumbnail + banner
    ├── icc-pre-islamic.png                  # ICC skrinshotlari
    ├── icc-first-renaissance.png
    ├── icc-first-renaissance-2.png
    └── icc-second-renaissance.png
```

---

## Yangi loyiha qo'shish

**1-qadam.** Rasmlarni `public/projects/` ga joylang.

**2-qadam.** `src/data/projects.ts` massiviga obyekt qo'shing:

```ts
{
  slug: "yangi-loyiha",              // URL: /projects/yangi-loyiha
  title: "Loyiha nomi",              // tarjima topilmasa shu ishlatiladi
  year: "2026",
  role: "UI/UX Design",
  shortDescription: "Bir jumlalik tavsif.",
  heroImage: "/projects/yangi-loyiha.png",
  overview: { role: "...", duration: "...", tools: ["Figma", "Next.js"] },
  problem:  ["Muammo 1", "Muammo 2"],
  solution: ["Yechim 1", "Yechim 2"],
  results:  ["Natija 1", "Natija 2"],
  screenshots: [
    { title: "Bosh sahifa", image: "/projects/yangi-loyiha-home.png" },
  ],
  siteFeatures: ["Bo'lim 1", "Bo'lim 2"],   // ixtiyoriy
  demoUrl: "https://...",                    // ixtiyoriy
}
```

**3-qadam.** Uchala tarjima fayliga (`src/messages/uz.ts`, `ru.ts`, `en.ts`)
`projects` ichiga shu slug bilan blok qo'shing:

```ts
"yangi-loyiha": {
  title: "...",
  role: "...",
  shortDescription: "...",
  overviewRole: "...",
  overviewDuration: "...",
  overviewTool0: "Figma",        // tools massivining tartibiga mos
  problem0: "...",  problem1: "...",
  solution0: "...", solution1: "...",
  results0: "...",  results1: "...",
  siteFeature0: "...",
  screenshot0Title: "...", screenshot0Desc: "...",
},
```

Kalitlar **0 dan boshlab raqamlanadi** va `projects.ts` dagi massiv tartibiga
mos kelishi kerak. Tarjima topilmasa `projects.ts` dagi matn ko'rsatiladi —
sahifa hech qachon bo'sh qolmaydi.

> `en.ts` tarjima kalitlari uchun tip manbai hisoblanadi: unga kalit qo'shsangiz,
> `uz.ts` va `ru.ts` da ham bo'lishi shart, aks holda `npx tsc --noEmit` xato beradi.
> Bu ataylab — bir tilda matn tushib qolishining oldini oladi.

---

## Matnlarni tahrirlash

Saytdagi barcha matn `src/messages/` ichida. Komponentlarda matn qotib qolmagan,
shuning uchun tarjima faylini tahrirlash yetarli.

| Bo'lim | Kalit |
|--------|-------|
| Navigatsiya | `nav.*` |
| Bosh sahifa | `home.*` |
| Men haqimda va CV | `about.*` |
| Loyihalar | `projects.*` |
| Aloqa formasi | `contact.*` |
| Tema almashtirgich | `theme.*` |
| 404 sahifa | `notFound.*` |

**CV (PDF) matni** ham `about.*` kalitlaridan olinadi — alohida fayl yo'q.
PDF Noto Sans bilan chiziladi, shuning uchun kirill va `oʻ/gʻ` belgilari
to'g'ri chiqadi.
